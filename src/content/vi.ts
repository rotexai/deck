import type { Content } from './types'

// Vietnamese deck copy. Same shape as en.ts; translated from it.
export const vi: Content = {
  deck: {
    title: 'Bộ thuyết trình RotexAI · Phần mềm vừa vặn với từng cửa hàng',
    of: '/',
    locale: 'vi-VN',
    slideLabel: 'Trang {n} / {total}',
    switchTo: 'Chuyển sang tiếng Anh',
    narrator: {
      listen: 'Nghe · khoảng {min} phút',
      play: 'Phát bài thuyết trình bằng giọng AI',
      resume: 'Tiếp tục bài thuyết trình bằng giọng AI',
      pause: 'Tạm dừng phần thuyết minh',
      replay: 'Phát lại bài thuyết trình bằng giọng AI từ đầu',
      script: 'Kịch bản',
      showScript: 'Hiện kịch bản',
      hideScript: 'Ẩn kịch bản',
      aiVoice: 'Được thuyết minh bằng giọng AI',
      close: 'Đóng kịch bản',
    },
  },

  title: {
    wordmark: { a: 'Rotex', b: 'AI' },
    kicker: 'Tóm tắt cho nhà đầu tư · Vòng pre-seed · 2026',
    headline: 'Phần mềm *vừa vặn* với từng cửa hàng.',
    body: 'Hãy mô tả cửa hàng bằng lời thường. RotexAI xây ứng dụng của cửa hàng và thay đổi nó khi cửa hàng thay đổi.',
    scan: {
      label: 'Quét để truy cập',
      links: [
        { href: 'https://www.rotexai.com', title: 'Sản phẩm', cta: 'Dùng thử sản phẩm', text: 'rotexai.com' },
        { href: 'https://investor.rotexai.com', title: 'Nhà đầu tư', cta: 'Dành cho nhà đầu tư', text: 'investor.rotexai.com' },
      ],
    },
    // Narration (spec 261117): one line per step, read by the AI voice and shown in the script sidebar.
    narration: [
      'Đây là RotexAI: phần mềm vừa vặn với từng cửa hàng. Chủ cửa hàng mô tả cách cửa hàng vận hành, bằng lời thường. RotexAI xây dựng ứng dụng, và thay đổi ứng dụng khi cửa hàng thay đổi. Bạn đang nghe giọng AI. Nút Kịch bản ở đầu trang hiển thị toàn bộ lời thuyết minh.',
    ],
    source: 'investor.rotexai.com',
  },

  shop: {
    kicker: 'Cửa hàng',
    headline: 'Cửa hàng nhỏ chạy bằng điện thoại, chat và trí nhớ.',
    quote:
      '“Chúng tôi có hai cửa hàng bánh. Mỗi tối, nhân viên kiểm kho trên điện thoại. Khi bột hoặc bơ sắp hết, họ xin nhập thêm, và quản lý duyệt.”',
    clockLabel: 'Tối nay',
    clock: ['18:00', '18:40', '19:20', '20:10', '20:50', '21:30'],
    receipt: {
      head: ['QUY TRÌNH BUỔI TỐI', '2 CỬA HÀNG'],
      lines: [
        ['Cửa hàng 1 · kiểm kho', 'điện thoại'],
        ['Cửa hàng 2 · kiểm kho', 'điện thoại'],
        ['Bột sắp hết → xin nhập', 'chat'],
        ['Bơ sắp hết → xin nhập', 'chat'],
        ['Quản lý duyệt', 'trí nhớ'],
      ],
      total: ['BƯỚC ĐÃ NỐI', '0'],
      note: 'Mỗi tối làm bằng tay. Không có gì chuyển sang ngày mai.',
    },
    // Narration (spec 261117): one line per step, read by the AI voice and shown in the script sidebar.
    narration: [
      'Các cửa hàng nhỏ vận hành bằng điện thoại, nhắn tin và trí nhớ. Hãy lấy một tiệm bánh có hai cửa hàng làm ví dụ. Mỗi tối, nhân viên ở cửa hàng thứ nhất kiểm kê hàng tồn trên điện thoại.',
      'Cửa hàng thứ hai làm y như vậy, trên một chiếc điện thoại khác.',
      'Khi bột mì sắp hết, có người nhắn tin yêu cầu nhập hàng.',
      'Bơ sắp hết: thêm một tin nhắn nữa.',
      'Rồi quản lý phê duyệt, dựa trên trí nhớ.',
      'Năm bước, và không bước nào liên kết với nhau. Việc này được làm thủ công mỗi đêm, và không có gì được giữ lại cho ngày hôm sau.',
    ],
    source: 'Kịch bản từ bản hướng dẫn sản phẩm RotexAI (minh họa)',
  },

  problem: {
    kicker: 'Vấn đề',
    headline: 'ERP đóng gói *không vừa* doanh nghiệp nhỏ.',
    chartLabel:
      'Theo 9 doanh nghiệp nhỏ và vừa (DNNVV): yếu tố quan trọng nhất trong dự án ERP (điểm, tối đa 36)',
    max: 36,
    bars: [
      { label: 'Đào tạo người dùng', value: 33 },
      { label: 'Kiểm thử hệ thống ERP', value: 32 },
      { label: 'Phù hợp với tổ chức', value: 31, fit: true },
      { label: 'Mục tiêu rõ ràng', value: 30 },
      { label: 'Cấu hình ERP', value: 28 },
      { label: 'Ban lãnh đạo cấp cao', value: 27 },
      { label: 'Lãnh đạo nhóm', value: 26 },
    ],
    chip: { from: 'Hạng 9 trong 320 bài báo', to: 'Hạng 3 với DNNVV' },
    cards: [
      {
        title: 'Không khớp là nguyên nhân chính khiến ERP thất bại',
        body: 'Quy trình có sẵn trong hệ thống không khớp với cách doanh nghiệp làm việc.',
      },
      {
        title: 'Làm cho khớp tốn kém nhất',
        body: 'Chi phí nhà cung cấp, kể cả tùy biến, xếp cao nhất trong 10 yếu tố chi phí.',
      },
    ],
    // Narration (spec 261117): one line per step, read by the AI voice and shown in the script sidebar.
    narration: [
      'ERP đóng gói không giải quyết được việc này, vì nó không vừa vặn với doanh nghiệp nhỏ. Trong một nghiên cứu, chín doanh nghiệp nhỏ và vừa đã đánh giá điều gì quan trọng nhất trong dự án ERP của họ.',
      'Mức độ phù hợp với tổ chức xếp thứ chín trong 320 bài nghiên cứu, nhưng xếp thứ ba đối với chính các doanh nghiệp nhỏ và vừa.',
      'Sự không phù hợp là một nguyên nhân chính khiến ERP thất bại: các quy trình tích hợp sẵn trong hệ thống không khớp với cách doanh nghiệp vận hành. Và chi phí nhà cung cấp, kể cả phần tùy biến, xếp cao nhất trong mười yếu tố chi phí.',
    ],
    source:
      'Leyh (2014), FedCSIS, Bảng 2 và Hình 1 · Jegorova & Grabis (2025), CSIMQ · Haddara & Elragal (2013), IJISPM, Bảng 2',
  },

  market: {
    kicker: 'Thị trường',
    headline: 'Đa số DNNVV đã dùng phần mềm. Ít nơi vận hành cả doanh nghiệp trên đó.',
    dots: { total: 817, columns: 43, rows: 19, paying: 718, erp: 122 },
    steps: [
      { figure: 817000, tone: 'ink', caption: 'DNNVV tại Việt Nam, 2024. 93,6% là doanh nghiệp siêu nhỏ hoặc nhỏ.' },
      { figure: 718000, tone: 'blue', caption: 'đã dùng phần mềm kế toán (88% doanh nghiệp được khảo sát).' },
      {
        figure: 122000,
        tone: 'warn',
        caption: 'dùng ERP cho phần việc còn lại của doanh nghiệp (15%). 596.000 doanh nghiệp kia là cơ hội đầu tiên của chúng tôi.',
      },
    ],
    aside: 'Bên cạnh đó: 5,17 triệu cơ sở kinh doanh cá thể, không thể hiện trong hình.',
    gridLabel: 'Lưới 817 chấm, mỗi chấm là 1.000 DNNVV: {figure} được tô sáng.',
    // Narration (spec 261117): one line per step, read by the AI voice and shown in the script sidebar.
    narration: [
      'Việt Nam có khoảng 817.000 doanh nghiệp nhỏ và vừa vào năm 2024. Trong số đó, 93,6 phần trăm là doanh nghiệp siêu nhỏ hoặc nhỏ.',
      'Theo ước tính của chúng tôi, 718.000 doanh nghiệp đã dùng phần mềm kế toán. Con số này tương ứng 88 phần trăm các doanh nghiệp được khảo sát.',
      'Nhưng chỉ khoảng 122.000 doanh nghiệp dùng ERP cho phần còn lại của hoạt động kinh doanh. Còn lại 596.000 doanh nghiệp, đó là điểm khởi đầu của chúng tôi. Bên cạnh đó là 5,17 triệu cơ sở kinh doanh cá thể, không được tính trong các con số này.',
    ],
    source:
      'Một chấm = 1.000 DNNVV · Cục Thống kê, Sách trắng 2025 & Tóm tắt thống kê 2025 · Sách trắng Thương mại điện tử 2022 (Bộ Công Thương; khảo sát 2021: 88% và 15% doanh nghiệp được khảo sát) · 718 nghìn và 122 nghìn là ước tính của chúng tôi',
  },

  solution: {
    kicker: 'Giải pháp',
    headline: 'Mô tả cửa hàng. *Có ngay ứng dụng.*',
    says: {
      label: '1 · Chủ cửa hàng nói',
      text: 'Hai cửa hàng bánh. Nhân viên kiểm kho mỗi tối. Khi bột hoặc bơ sắp hết, họ xin nhập thêm và quản lý duyệt.',
    },
    builds: {
      label: '2 · RotexAI xây dựng quy trình',
      nodes: ['Kiểm kho buổi tối', 'Dưới ngưỡng?', 'Yêu cầu nhập hàng', 'Quản lý duyệt'],
    },
    approves: {
      label: '3 · Chủ cửa hàng duyệt từng thay đổi',
      version: 'v3 · Thêm bơ vào danh sách nhập hàng',
      diff: [
        { kind: 'add', text: '+ mặt hàng: bơ' },
        { kind: 'add', text: '+ ngưỡng: do quản lý đặt' },
        { kind: 'same', text: '  bột, đường: không đổi' },
      ],
      button: 'Duyệt v3',
    },
    // Narration (spec 261117): one line per step, read by the AI voice and shown in the script sidebar.
    narration: [
      'Vậy thì: hãy mô tả cửa hàng, và nhận ngay ứng dụng dành cho cửa hàng đó. Trong cảnh minh họa đơn giản này, lấy từ cổng thông tin đang hoạt động, chủ cửa hàng nói bằng lời thường: hai cửa hàng bánh, kiểm kê hàng mỗi tối, yêu cầu nhập hàng khi bột mì hoặc bơ sắp hết, và quản lý phê duyệt.',
      'RotexAI biến điều đó thành một quy trình: kiểm kê hàng buổi tối, kiểm tra theo ngưỡng tồn kho, yêu cầu nhập hàng, và việc quản lý phê duyệt.',
      'Mỗi thay đổi là một phiên bản mới mà chủ cửa hàng phê duyệt. Ở đây, phiên bản thứ ba thêm bơ vào danh sách nhập hàng.',
    ],
    source: 'Cảnh sản phẩm, đơn giản hóa từ cổng RotexAI đang chạy',
  },

  demo: {
    kicker: 'Trình diễn',
    headline: 'Từ lời thường đến *ứng dụng chạy được*.',
    label: 'Mô phỏng: cổng RotexAI được dựng lại từ mã nguồn, không phải bản ghi màn hình',
    video: {
      src: '/media/walkthrough.mp4',
      poster: '/media/walkthrough.jpg',
      captions: '/media/walkthrough.en.vtt',
      captionsLabel: 'Tiếng Anh',
    },
    chaptersTitle: 'Trong bản hướng dẫn',
    chapters: [
      { at: '0:08', text: 'Bắt đầu một dự án' },
      { at: '0:20', text: 'Mô tả cách doanh nghiệp của bạn vận hành' },
      { at: '0:38', text: 'Xem lại kế hoạch' },
      { at: '0:55', text: 'Xây dựng' },
      { at: '1:15', text: 'Dùng cùng nhóm của bạn' },
      { at: '1:33', text: 'Quyết định ai được làm gì' },
      { at: '1:48', text: 'Thay đổi bất cứ lúc nào' },
      { at: '2:04', text: 'Hoặc bắt đầu từ kho mẫu' },
    ],
    // Narration (spec 261117): one line per step, read by the AI voice and shown in the script sidebar.
    narration: [
      'Dưới đây là phần trình diễn, từ lời thường đến một ứng dụng hoạt động thực tế. Đây là một bản mô phỏng: cổng thông tin được dựng lại từ mã nguồn, chứ không phải một đoạn ghi màn hình.',
    ],
    source: 'Bản hướng dẫn sản phẩm RotexAI, cổng mô phỏng (cũng có tại investor.rotexai.com)',
  },

  how: {
    kicker: 'Cách hoạt động',
    headline: 'Mỗi hành động là *quy trình* kiểm tra được.',
    describe: { title: 'Chủ cửa hàng mô tả', body: 'Lời thường về cách cửa hàng vận hành.' },
    workflows: {
      title: 'Quy trình',
      body: 'Mỗi hành động là một bước quy trình: ai làm, kiểm tra gì, ghi lại gì. Mỗi thay đổi là một phiên bản mới để chủ cửa hàng duyệt.',
    },
    app: {
      title: 'Một dự án, một ứng dụng',
      body: 'Mỗi cửa hàng một ứng dụng, với nhiều màn hình. Mọi thao tác đọc và ghi đều đi qua quy trình, không bao giờ truy cập thẳng vào cơ sở dữ liệu.',
    },
    mcp: {
      title: 'Trợ lý lập trình AI qua MCP',
      body: 'Trợ lý AI xây và đăng ứng dụng qua cùng quy trình, có chủ cửa hàng xác nhận.',
    },
    // Narration (spec 261117): one line per step, read by the AI voice and shown in the script sidebar.
    narration: [
      'Ở bên trong, mỗi hành động là một quy trình mà bạn có thể kiểm tra: ai thực hiện, kiểm tra điều gì và ghi lại điều gì. Mỗi cửa hàng có một ứng dụng với nhiều màn hình. Mọi thao tác đọc và ghi đều đi qua quy trình, không bao giờ truy cập trực tiếp vào cơ sở dữ liệu. Các tác nhân lập trình AI có thể xây dựng và xuất bản ứng dụng qua MCP, cũng thông qua các quy trình đó, khi chủ cửa hàng xác nhận.',
    ],
    source: 'Kiến trúc nền tảng RotexAI đang chạy',
  },

  whyNow: {
    kicker: 'Vì sao là bây giờ',
    headline: 'Ba điều đã thay đổi trong *2026*.',
    cards: [
      {
        chip: 'Công nghệ',
        tone: 'violet',
        title: 'AI xây phần mềm theo từng cửa hàng',
        body: 'ERP đóng gói thất bại ở doanh nghiệp nhỏ chủ yếu vì không vừa. Phần mềm xây từ mô tả của chính cửa hàng sẽ xóa bỏ sự không khớp đó.',
        source: 'Jegorova & Grabis (2025) · Leyh (2014)',
      },
      {
        chip: '16/3/2026',
        tone: 'cyan',
        title: 'Nhà nước hỗ trợ chi phí áp dụng',
        body: 'Ít nhất 300.000 DNNVV áp dụng giải pháp số vào năm 2030, có phiếu hỗ trợ và “dùng trước, trả sau”.',
        source: 'Quyết định 433/QĐ-TTg',
      },
      {
        chip: '1/1/2026',
        tone: 'orange',
        title: 'Thuế đẩy hộ kinh doanh sang sổ sách điện tử',
        body: 'Thuế khoán đã bỏ. Hộ có doanh thu trên 1 tỷ đồng phải xuất hóa đơn điện tử.',
        source: 'Nghị quyết 198/2025/QH15 · Nghị định 141/2026',
      },
    ],
    // Narration (spec 261117): one line per step, read by the AI voice and shown in the script sidebar.
    narration: [
      'Vì sao lại là bây giờ? Ba điều đã thay đổi trong năm 2026. Thứ nhất là công nghệ: AI giờ đây có thể xây dựng phần mềm xoay quanh từng cửa hàng, và điều đó loại bỏ sự không phù hợp khiến ERP đóng gói thất bại.',
      'Thứ hai, ngày 16 tháng 3 năm 2026, Nhà nước đặt mục tiêu có ít nhất 300.000 doanh nghiệp nhỏ và vừa ứng dụng giải pháp số vào năm 2030, kèm theo voucher và cơ chế “dùng trước, trả sau”.',
      'Thứ ba, từ ngày 1 tháng 1 năm 2026, chế độ thuế khoán đã chấm dứt đối với hộ kinh doanh. Những hộ có doanh thu trên một tỷ đồng phải xuất hóa đơn điện tử. Điều này buộc họ chuyển sang sổ sách số.',
    ],
    source: 'Nguồn ghi trên từng thẻ',
  },

  competition: {
    kicker: 'Cạnh tranh',
    headline: 'Không đối thủ nào vừa với Việt Nam *và* để chủ cửa hàng tự thay đổi.',
    axes: {
      up: 'Vừa với kinh doanh Việt Nam',
      down: 'Ít vừa với Việt Nam',
      left: 'Thay đổi cần đối tác',
      right: 'Chủ cửa hàng tự thay đổi',
    },
    others: [
      {
        quadrant: 'tl',
        name: 'ERP đóng gói và ứng dụng bán hàng',
        note: 'Khớp với thuế và hóa đơn điện tử Việt Nam; mỗi thay đổi là một dự án với đối tác, hoặc không thể thay đổi',
        names: 'MISA AMIS · Base.vn · Odoo · KiotViet · Sapo',
      },
      {
        quadrant: 'br',
        name: 'Công cụ tạo app bằng AI và low-code',
        note: 'Chủ cửa hàng tự thay đổi được, nhưng chúng không biết gì về kinh doanh Việt Nam',
        names: 'Lovable · Replit · Airtable · Lark Base',
      },
    ],
    us: {
      quadrant: 'tr',
      name: 'RotexAI',
      note: 'Vừa với cửa hàng, và chủ cửa hàng thay đổi bằng cách mô tả điều cần đổi',
    },
    // Narration (spec 261117): one line per step, read by the AI voice and shown in the script sidebar.
    narration: [
      'Chúng tôi đã xem xét 38 đối thủ cạnh tranh. ERP đóng gói và ứng dụng bán hàng, như MISA AMIS, Odoo và KiotViet, khớp với thuế và hóa đơn điện tử Việt Nam, nhưng mỗi thay đổi đều là một dự án với đối tác. Các công cụ tạo app bằng AI và low-code, như Lovable và Airtable, cho phép chủ cửa hàng thay đổi ứng dụng, nhưng chúng không biết gì về kinh doanh Việt Nam. Và phổ biến nhất, cửa hàng vẫn chạy bằng Excel, Zalo và giấy tờ.',
      'Trong 26 sản phẩm chúng tôi có thể thử, không sản phẩm nào vừa với Việt Nam và cho phép chủ cửa hàng tự thay đổi. Vị trí đó thuộc về chúng tôi: RotexAI vừa với cửa hàng, và chủ cửa hàng thay đổi bằng cách mô tả điều cần đổi.',
    ],
    // No source line on this slide (owner 2026-11-17); the research is wiki Pillar 7.
    source: '',
  },

  business: {
    kicker: 'Mô hình kinh doanh',
    headline: 'Mỗi cửa hàng trả cho *ứng dụng riêng*.',
    cards: [
      { title: 'Giá mỗi cửa hàng', value: '[Giá mỗi cửa hàng]', body: '[Gói bao gồm những gì]' },
      {
        title: 'Thanh toán',
        value: '[Chu kỳ thanh toán]',
        body: 'Gói được thanh toán trên cổng; gói bắt đầu khi hóa đơn đầu tiên được trả.',
      },
      {
        title: 'Kho mẫu',
        value: '[Tỷ lệ chia doanh thu từ mẫu]',
        body: 'Chủ cửa hàng có thể bắt đầu từ một dự án đã đăng rồi điều chỉnh.',
      },
    ],
    // Narration (spec 261117): one line per step, read by the AI voice and shown in the script sidebar.
    narration: [
      'Mô hình này đơn giản: mỗi cửa hàng trả tiền cho ứng dụng của riêng mình. Các gói dịch vụ được thu phí trên cổng thông tin, và một gói chỉ bắt đầu sau khi hóa đơn đầu tiên được thanh toán. Chủ cửa hàng cũng có thể bắt đầu từ một dự án đã xuất bản trên chợ dự án, rồi điều chỉnh cho hợp với cửa hàng của mình.',
    ],
    source: 'Giá và điều khoản là chỗ trống cho đến khi được xác định',
  },

  traction: {
    kicker: 'Kết quả đạt được',
    headline: 'Đang vận hành thật *hôm nay*.',
    milestones: [
      { date: '[ngày]', title: 'Cổng ứng dụng', body: 'Mô tả, xem lại kế hoạch, xây và chạy ứng dụng' },
      { date: '19/10/2026', title: 'Quyền truy cập nhóm', body: 'Quyền đọc, ghi, chạy và xóa theo từng đối tượng' },
      { date: '26/10/2026', title: 'Kho mẫu', body: 'Bắt đầu từ một dự án đã đăng' },
      { date: '14/11/2026', title: 'Đăng qua MCP', body: 'Trợ lý lập trình AI đăng một ứng dụng; chủ cửa hàng xác nhận' },
    ],
    metrics: [
      { label: 'Cửa hàng đang dùng', value: '[số liệu]' },
      { label: 'Ứng dụng đã xây', value: '[số liệu]' },
      { label: 'Doanh thu hàng tháng', value: '[số liệu]' },
    ],
    // Narration (spec 261117): one line per step, read by the AI voice and shown in the script sidebar.
    narration: [
      'RotexAI đã được đưa vào vận hành thực tế ngay hôm nay. Trên cổng thông tin, chủ cửa hàng mô tả cửa hàng, kiểm tra gói dịch vụ, rồi xây dựng và chạy ứng dụng. Quyền truy cập theo nhóm, với quyền đọc, ghi, chạy và xóa trên từng đối tượng, ra mắt ngày 19 tháng 10 năm 2026. Chợ dự án ra mắt sau đó, vào ngày 26 tháng 10. Và từ ngày 14 tháng 11, một tác nhân lập trình AI có thể xuất bản ứng dụng qua MCP, với sự xác nhận của chủ cửa hàng.',
    ],
    source: 'Nhật ký phát hành RotexAI · số liệu sử dụng sẽ được cập nhật sau',
  },

  team: {
    kicker: 'Đội ngũ',
    headline: 'Người sáng lập bắt đầu từ *cửa hàng gia đình và bạn bè*.',
    portrait: { src: '/media/founder.jpg', alt: 'Chân dung qvanle, người sáng lập RotexAI' },
    name: 'qvanle',
    role: 'Người sáng lập',
    origin:
      'RotexAI bắt đầu như một cách gỡ bỏ công việc thủ công trong việc kinh doanh của gia đình và bạn bè: trước hết hiểu công việc của họ, rồi để phần mềm làm.',
    background:
      'Kỹ sư. Tự xây RotexAI từ đầu đến cuối và dùng mọi công cụ vào công việc thật trước khi có khách hàng nào dùng.',
    link: { href: 'https://qvanle.rotexai.com', text: 'qvanle.rotexai.com' },
    // Narration (spec 261117): one line per step, read by the AI voice and shown in the script sidebar.
    narration: [
      'RotexAI do chính người sáng lập xây dựng. Ban đầu, RotexAI là một cách để gỡ bỏ công việc thủ công khỏi việc kinh doanh của gia đình và bạn bè: trước hết hiểu công việc của họ, rồi để phần mềm đảm nhận. Người sáng lập là một kỹ sư, tự xây dựng RotexAI từ đầu đến cuối, và dùng mọi công cụ vào công việc thực tế trước khi khách hàng nào dùng đến.',
    ],
    source: 'qvanle.rotexai.com',
  },

  ask: {
    kicker: 'Gọi vốn · Vòng pre-seed',
    headline: '*150 triệu*, sáu tháng để chứng minh.',
    barLabel:
      'Sử dụng vốn: lương nhà sáng lập 60 triệu, khách hàng đầu tiên 30 triệu, hạ tầng 30 triệu, dự phòng 30 triệu đồng',
    totalLabel: 'Tổng',
    unit: ' triệu đồng',
    amountUnit: ' tr',
    funds: [
      { amount: 60, label: 'Lương nhà sáng lập, 10 triệu mỗi tháng' },
      { amount: 30, label: 'Khách hàng đầu tiên' },
      { amount: 30, label: 'Hạ tầng, 5 triệu mỗi tháng' },
      { amount: 30, label: 'Dự phòng' },
    ],
    milestones: [
      { when: 'ĐẾN THÁNG 2', what: '[Cột mốc đầu tiên]' },
      { when: 'ĐẾN THÁNG 4', what: '[Cột mốc thứ hai]' },
      { when: 'ĐẾN THÁNG 6', what: '[N cửa hàng trả phí]' },
    ],
    // Narration (spec 261117): one line per step, read by the AI voice and shown in the script sidebar.
    narration: [
      'Chúng tôi đang gọi vốn 150 triệu đồng. Đó là sáu tháng để chứng minh điều này. Trong đó, 60 triệu đồng là quỹ duy trì cho người sáng lập, với mức 10 triệu đồng mỗi tháng.',
      '30 triệu đồng dành cho những khách hàng đầu tiên.',
      '30 triệu đồng chi cho hạ tầng, với mức 5 triệu đồng mỗi tháng.',
      'Và 30 triệu đồng được giữ lại làm dự phòng. Để trao đổi thêm, quý vị có thể gửi email đến contact@rotexai.com, hoặc truy cập investor.rotexai.com. Xin cảm ơn quý vị đã lắng nghe.',
    ],
    source: 'contact@rotexai.com · investor.rotexai.com',
  },
}
