import type { Content } from './types'

// Vietnamese deck copy. Same shape as en.ts; translated from it.
export const vi: Content = {
  deck: {
    title: 'Bộ thuyết trình RotexAI · Phần mềm vừa vặn với từng cửa hàng',
    of: '/',
    locale: 'vi-VN',
    slideLabel: 'Trang {n} / {total}',
    switchTo: 'Chuyển sang tiếng Anh',
  },

  title: {
    wordmark: { a: 'Rotex', b: 'AI' },
    kicker: 'Tóm tắt cho nhà đầu tư · Vòng pre-seed · 2026',
    headline: 'Phần mềm *vừa vặn* với từng cửa hàng.',
    body: 'Hãy mô tả cửa hàng bằng lời thường. RotexAI xây ứng dụng của cửa hàng và thay đổi nó khi cửa hàng thay đổi.',
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
    source:
      'Leyh (2014), FedCSIS, Bảng 2 và Hình 1 · Jegorova & Grabis (2025), CSIMQ · Haddara & Elragal (2013), IJISPM, Bảng 2',
  },

  market: {
    kicker: 'Thị trường',
    headline: 'Đa số DNNVV đã trả tiền cho phần mềm. Ít nơi vận hành cả doanh nghiệp trên đó.',
    dots: { total: 817, columns: 43, rows: 19, paying: 718, erp: 122 },
    steps: [
      { figure: 817000, tone: 'ink', caption: 'DNNVV tại Việt Nam, 2024. 93,6% là doanh nghiệp siêu nhỏ hoặc nhỏ.' },
      { figure: 718000, tone: 'blue', caption: 'đã trả tiền cho phần mềm kế toán (88% doanh nghiệp được khảo sát).' },
      {
        figure: 122000,
        tone: 'warn',
        caption: 'dùng ERP cho phần việc còn lại của doanh nghiệp (15%). 596.000 doanh nghiệp kia là cơ hội đầu tiên của chúng tôi.',
      },
    ],
    aside: 'Bên cạnh đó: 5,2 triệu hộ kinh doanh, không thể hiện trong hình.',
    gridLabel: 'Lưới 817 chấm, mỗi chấm là 1.000 DNNVV: {figure} được tô sáng.',
    source:
      'Một chấm = 1.000 DNNVV · Cục Thống kê, Sách trắng 2025 & Tóm tắt thống kê 2025 · Sách trắng Thương mại điện tử 2022 (Bộ Công Thương; 88% và 15% doanh nghiệp được khảo sát) · 718 nghìn và 122 nghìn là ước tính của chúng tôi',
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
    source: 'Nguồn ghi trên từng thẻ',
  },

  competition: {
    kicker: 'Cạnh tranh',
    headline: 'Vừa từng cửa hàng, *không cần lập trình*.',
    axes: {
      up: 'Khớp quy trình của cửa hàng',
      down: 'Quy trình cố định, chung chung',
      left: 'Cần lập trình viên',
      right: 'Không cần lập trình viên',
    },
    others: [
      {
        quadrant: 'bl',
        name: 'ERP đóng gói',
        note: 'Quy trình cố định, do chuyên gia tư vấn cấu hình',
        names: '[tên đối thủ]',
      },
      {
        quadrant: 'tl',
        name: 'Nền tảng low-code',
        note: 'Khớp, khi lập trình viên đã xây dựng',
        names: '[tên đối thủ]',
      },
      {
        quadrant: 'br',
        name: 'Công cụ tạo app bằng AI',
        note: 'Màn hình từ một câu lệnh, không theo quy trình của cửa hàng',
        names: '[tên đối thủ]',
      },
    ],
    us: {
      quadrant: 'tr',
      name: 'RotexAI',
      note: 'Xây từ chính mô tả của cửa hàng; chủ cửa hàng duyệt từng thay đổi',
    },
    source: 'Vị trí của chúng tôi theo từng nhóm · tên đối thủ được giữ kín cho đến khi được duyệt',
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
    source: 'contact@rotexai.com · investor.rotexai.com',
  },
}
