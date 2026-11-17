// Spec 261117 R5-R7: render one mp3 per step and language from the `narration` lines in src/content/{en,vi}.ts,
// and write src/content/narration.json with each line's hash and length and the listening time per language (the
// title slide's "about N min", R15; bundled, so it lives in src/). Only changed lines are rendered.
//
//   npm run narrate                      # provider from NARRATE_PROVIDER, default "say" (macOS voices, interim)
//   npm run narrate -- --provider openai # OPENAI_API_KEY from the environment only (R6), never a file
//   npm run narrate -- --provider elevenlabs --force  # chosen voices; key from ELEVENLABS_API_KEY or ~/.config/roxctl
//   npm run narrate -- --check           # exit 1 when any line is missing or stale; renders nothing
//   npm run narrate -- --force           # render every line again
//
// Needs Node 24+ (imports the .ts content directly) and ffmpeg/ffprobe on PATH.
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { homedir, tmpdir } from 'node:os'
import { join } from 'node:path'
import { en } from '../src/content/en.ts'
import { vi } from '../src/content/vi.ts'
import { estimateWords, stripCues } from '../src/content/cues.ts'

const root = new URL('..', import.meta.url).pathname
const outDir = join(root, 'public/media/narration')
const manifestPath = join(root, 'src/content/narration.json')
const GAP_S = 0.6 // GAP_MS in src/deck/narrator.ts

const args = process.argv.slice(2)
const flag = (name) => args.includes(`--${name}`)
const opt = (name) => {
  const i = args.indexOf(`--${name}`)
  return i >= 0 ? args[i + 1] : undefined
}

const PROVIDERS = {
  // macOS system voices: good enough to time and test the deck, not the final voice.
  say: {
    voices: { en: 'Samantha', vi: 'Linh' },
    render(text, voice, wav) {
      execFileSync('say', ['-v', voice, '-o', wav, '--data-format=LEI16@24000', text])
    },
  },
  // ElevenLabs, the voices the owner chose on 2026-11-17: Kai (en) and Trung Caha (vi). Same key and tempo approach as
  // video/kit/bin/make-vo.sh: eleven_v4 ignores the API's speed setting, so the line is sped up with atempo, pitch kept.
  elevenlabs: {
    voices: { en: 'hfqsl1OMbiWsgPpht3el', vi: 'ueSxRO0nLF1bj93J2hVt' },
    async render(text, voice, file) {
      const keyFile = join(homedir(), '.config/roxctl/elevenlabs-api-key')
      const key = process.env.ELEVENLABS_API_KEY ?? (existsSync(keyFile) ? readFileSync(keyFile, 'utf8').trim() : '')
      if (!key) throw new Error(`no ElevenLabs key: set ELEVENLABS_API_KEY or write ${keyFile}`)
      const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}/with-timestamps?output_format=mp3_44100_128`, {
        method: 'POST',
        headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, model_id: process.env.NARRATE_MODEL ?? 'eleven_v4' }),
      })
      if (!res.ok) throw new Error(`elevenlabs speech: HTTP ${res.status} ${(await res.text()).slice(0, 200)}`)
      const { audio_base64: audio, alignment } = await res.json()
      const mp3 = `${file}.mp3`
      writeFileSync(mp3, Buffer.from(audio, 'base64'))
      const tempo = Number(process.env.NARRATE_TEMPO ?? '1.1')
      execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', mp3, '-af', `atempo=${tempo}`, file])
      // Word start times for the narration cues: the first character of each word, scaled by the tempo.
      const chars = alignment?.characters ?? []
      const starts = alignment?.character_start_times_seconds ?? []
      const words = []
      chars.forEach((ch, i) => {
        if (/\S/.test(ch) && (i === 0 || /\s/.test(chars[i - 1]))) words.push(Math.round((starts[i] / tempo) * 100) / 100)
      })
      return { words }
    },
  },
  openai: {
    voices: { en: 'alloy', vi: 'alloy' },
    async render(text, voice, file) {
      const key = process.env.OPENAI_API_KEY
      if (!key) throw new Error('OPENAI_API_KEY is not set in the environment')
      const res = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: process.env.NARRATE_MODEL ?? 'gpt-4o-mini-tts', voice, input: text, response_format: 'wav' }),
      })
      if (!res.ok) throw new Error(`openai speech: HTTP ${res.status} ${(await res.text()).slice(0, 200)}`)
      writeFileSync(file, Buffer.from(await res.arrayBuffer()))
    },
  },
}

const old = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : { lines: {} }
// Keep the provider and voices the manifest was made with unless told otherwise.
const providerName = opt('provider') ?? process.env.NARRATE_PROVIDER ?? old.provider ?? 'say'
const provider = PROVIDERS[providerName]
if (!provider) throw new Error(`unknown provider "${providerName}" (${Object.keys(PROVIDERS).join(', ')})`)
const voiceFor = (lang) =>
  process.env[`NARRATE_VOICE_${lang.toUpperCase()}`] ?? ((old.provider === providerName && old.voices?.[lang]) || provider.voices[lang])

/** Slide order is the key order of the content (tests/narration.test.ts checks it against SLIDES). */
function lines(copy) {
  const out = []
  Object.keys(copy)
    .filter((k) => k !== 'deck')
    .forEach((key, i) =>
      // Cue markers drive the slide, never the voice (src/content/cues.ts).
      copy[key].narration.forEach((text, step) => out.push({ name: `${String(i + 1).padStart(2, '0')}-${step + 1}`, text: stripCues(text) })),
    )
  return out
}

// tests/narration.test.ts computes the same hash.
const hashLine = (provider, voice, text) => createHash('sha256').update(`${provider}\n${voice}\n${text}`).digest('hex')

const seconds = (file) =>
  Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file], { encoding: 'utf8' }).trim())

const manifest = { provider: providerName, voices: {}, minutes: {}, lines: {} }
const stale = []
const tmp = mkdtempSync(join(tmpdir(), 'narrate-'))

try {
  for (const [lang, copy] of Object.entries({ en, vi })) {
    const voice = voiceFor(lang)
    manifest.voices[lang] = voice
    mkdirSync(join(outDir, lang), { recursive: true })
    const wanted = new Set()
    let total = 0
    for (const { name, text } of lines(copy)) {
      const id = `${lang}/${name}`
      const file = join(outDir, lang, `${name}.mp3`)
      const sha256 = hashLine(providerName, voice, text)
      wanted.add(`${name}.mp3`)
      const prev = old.lines[id]
      const needsWords = providerName === 'elevenlabs' && !prev?.words
      if (!flag('force') && !needsWords && prev?.sha256 === sha256 && existsSync(file)) {
        manifest.lines[id] = prev
        total += prev.seconds
        continue
      }
      stale.push(id)
      if (flag('check')) continue
      const raw = join(tmp, 'line.wav')
      const rendered = await provider.render(text, voice, raw)
      // Mono, about 64 kbps (R5): small enough to preload one line ahead on a phone.
      execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', raw, '-ac', '1', '-ar', '24000', '-b:a', '64k', file])
      const s = Math.round(seconds(file) * 100) / 100
      // Word times (narration cues): from the provider when it gives them, else spread over the line by characters.
      const plainWords = text.trim().split(/\s+/).length
      let words = rendered?.words
      if (!words || words.length !== plainWords) {
        if (words) console.warn(`narrate: ${id} has ${words.length} timed words for ${plainWords} written; estimating`)
        words = estimateWords(text, s)
      }
      manifest.lines[id] = { sha256, seconds: s, words }
      total += s
      console.log(`rendered ${id} (${s}s)`)
    }
    // Listening time: every line, the gaps between steps, and the demo video that plays in between (R13).
    const video = seconds(join(root, 'public', copy.demo.video.src))
    manifest.minutes[lang] = Math.max(1, Math.round((total + video + GAP_S * wanted.size) / 60))
    if (!flag('check'))
      for (const f of readdirSync(join(outDir, lang)))
        if (f.endsWith('.mp3') && !wanted.has(f)) rmSync(join(outDir, lang, f))
  }
} finally {
  rmSync(tmp, { recursive: true, force: true })
}

if (flag('check')) {
  if (stale.length) {
    console.error(`narrate: ${stale.length} line(s) missing or stale: ${stale.join(', ')}`)
    process.exit(1)
  }
  console.log('narrate: every line matches the manifest')
} else {
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
  console.log(`narrate: ${stale.length} rendered; listening time en ~${manifest.minutes.en} min, vi ~${manifest.minutes.vi} min`)
}
