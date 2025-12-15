# 🎬 Flow Video Automation Extension

Extension Chrome tự động hóa việc tạo video hàng loạt trên Google Labs Flow.

## ✨ Tính năng

### 🎯 Chức năng chính
- ✅ Tải file `.txt` chứa prompts (mỗi dòng 1 prompt)
- ✅ Tự động cài đặt thông số (Model, Tỷ lệ, Số lượng video)
- ✅ Tạo video hàng loạt với điều tiết Pacing
- ✅ Theo dõi tiến độ từng prompt theo thời gian thực
- ✅ Quản lý 5 slot render đồng thời của Flow
- ✅ Giao diện Side Panel chuyên nghiệp

### ⚙️ Cài đặt tùy chỉnh
- **Model**: Veo 3.1 Fast, Veo 3.1 (+ Lower Priority variants)
- **Tỷ lệ**: Ngang (16:9), Dọc (9:16)
- **Số lượng**: 1-4 video mỗi prompt
- **Pacing**: Điều tiết % hoàn thành trước khi submit prompt tiếp theo

### 🚀 Quy trình tự động
1. Thu nhỏ trang Flow về 25% (để dễ theo dõi)
2. Tự động bật chế độ Grid
3. Cài đặt thông số theo lựa chọn
4. Submit prompts lần lượt với UUID tracking
5. Tính % Process trung bình mỗi 3 giây
6. Quản lý slot render (tối đa 5 prompts cùng lúc)

## 📦 Cài đặt

### Bước 1: Load Extension
1. Mở Chrome, vào `chrome://extensions/`
2. Bật **Developer mode** (góc trên bên phải)
3. Click **Load unpacked**
4. Chọn thư mục chứa Extension này (`veo3/`)

### Bước 2: Kiểm tra
- Extension sẽ xuất hiện icon trên thanh công cụ
- Click icon để mở Side Panel

## 🎮 Hướng dẫn sử dụng

### 1. Chuẩn bị file prompts
Tạo file `.txt` với format:
```
A cat riding a bicycle on the moon
A dog playing piano in a concert hall
Mountain landscape at sunset with aurora
Futuristic city with flying cars
```

### 2. Mở trang Flow
- Truy cập: https://labs.google/fx/vi/tools/flow
- Đăng nhập nếu cần
- Click **"Dự án mới"** hoặc **"Create with Flow"**

### 3. Mở Extension
- Click icon Extension trên thanh công cụ
- Side Panel sẽ mở bên phải màn hình

### 4. Upload prompts
- Click vào khung **"Tải file prompts (.txt)"**
- Chọn file `.txt` đã chuẩn bị
- Bảng prompts sẽ hiển thị tất cả

### 5. Cài đặt thông số
- **Mô hình**: Chọn Veo 3.1 - Fast (mặc định)
- **Tỷ lệ**: Ngang 16:9 hoặc Dọc 9:16
- **Số lượng video**: 1-4 (mặc định: 4)
- **Pacing**: 10% (nghĩa là khi prompt trước đạt 10% mới submit prompt tiếp)

### 6. Bắt đầu tự động
- Click **"▶️ Tạo video hàng loạt"**
- Extension sẽ tự động:
  - Thu nhỏ trang Flow
  - Bật Grid mode
  - Cài đặt thông số
  - Submit từng prompt
  - Hiển thị % tiến độ

### 7. Theo dõi tiến độ
- **Bảng Prompts**: Hiển thị % của từng prompt
- **Progress Bar**: Tổng % hoàn thành
- **Status**: Trạng thái hiện tại

### 8. Điều khiển
- **⏸️ Tạm dừng**: Ngừng submit prompts mới (prompts đang render vẫn tiếp tục)
- **⏹️ Dừng**: Dừng hoàn toàn
- **🔄 Tạo lại**: Render lại 1 prompt cụ thể
- **✏️ Sửa**: Chỉnh sửa text prompt

## 📊 Bảng Prompts

| Cột | Mô tả |
|-----|-------|
| **STT** | Số thứ tự |
| **Prompt** | Text prompt (click để xem/sửa đầy đủ) |
| **% Tiến độ** | Tiến độ trung bình (0-100%) |
| **Thao tác** | 🔄 Tạo lại, 👁️ Xem video, ✏️ Sửa |

### Màu sắc tiến độ:
- 🔵 **Xám**: 0% - Chờ
- 🟠 **Cam**: 1-49% - Đang render
- 🟢 **Xanh lá nhạt**: 50-99% - Sắp xong
- ✅ **Xanh lá đậm**: 100% - Hoàn tất

## 🔧 Kỹ thuật

### Cấu trúc files:
```
veo3/
├── manifest.json       # Cấu hình Extension
├── background.js       # Service worker (zoom control)
├── content.js          # Tương tác DOM với Flow
├── panel.html          # Giao diện Side Panel
├── panel.css           # Styling
├── panel.js            # Logic chính
└── README.md           # File này
```

### XPath/Selectors sử dụng:
- **Nút Tune**: `button.sc-92c9e477-0`
- **Textarea Prompt**: `#PINHOLE_TEXT_AREA_ELEMENT_ID`
- **Nút Generate**: `button.sc-408537d4-2`
- **Container**: `.sc-c884da2c-6`
- **Model/Count/Ratio**: `div[role="option"]`

### UUID Tracking:
- Mỗi prompt được gắn UUID ở đầu: `{uuid} {prompt_text}`
- Extension quét DOM tìm UUID để tính % tiến độ
- Polling mỗi 3 giây để update real-time

### Quản lý Slots:
- Flow hỗ trợ tối đa **5 prompts render đồng thời**
- Extension đếm số slot đang dùng
- Chỉ submit prompt mới khi có slot trống

### Pacing Logic:
```
Prompt 1: Submit ngay -> 0%
Wait until Prompt 1 >= 10%
Prompt 2: Submit -> 0%
Wait until Prompt 2 >= 10%
Prompt 3: Submit -> 0%
...
```

## ⚠️ Lưu ý

### Yêu cầu:
- ✅ Chrome phiên bản >= 114 (hỗ trợ Side Panel API)
- ✅ Đã đăng nhập Google trên trang Flow
- ✅ Trang Flow phải được mở trước khi bắt đầu

### Giới hạn:
- ⚠️ Flow có thể giới hạn số lượng prompts/ngày
- ⚠️ Không nên submit quá 20-30 prompts cùng lúc
- ⚠️ Mỗi video có thể mất 3-10 phút để render

### Troubleshooting:

**Q: Extension không tìm thấy tab Flow?**
- Đảm bảo đã mở trang `https://labs.google/fx/*/tools/flow*`
- Refresh lại trang Flow
- Reload Extension

**Q: % tiến độ không cập nhật?**
- Kiểm tra Console log: `Ctrl+Shift+I` -> Console
- Đảm bảo prompts có UUID ở đầu
- Thử refresh trang Flow

**Q: Không submit được prompt?**
- Kiểm tra đã bật Tune chưa
- Đảm bảo không có popup/dialog đang mở
- Thử submit thủ công 1 lần để test

## 🎨 Giao diện

### Màu sắc chủ đạo:
- **Primary**: Gradient xanh lá #003300 → #006600 → Trắng
- **Success**: #00cc66
- **Warning**: #ff9933
- **Danger**: #ff4444

### Animations:
- Fade in/out cho sections
- Smooth transitions cho buttons
- Progress bar animation
- Modal slide in

## 📝 Changelog

### Version 1.0.0 (2024-12-14)
- ✨ Initial release
- ✅ Upload prompts từ file .txt
- ✅ Tự động cài đặt Flow settings
- ✅ Batch video generation với pacing
- ✅ Real-time progress tracking
- ✅ Side Panel UI chuyên nghiệp
- ✅ UUID-based tracking system

## 📄 License

MIT License - Free to use and modify

## 👨‍💻 Developer

Tạo bởi: **Flow Automation Team**
Ngày: 14/12/2024
Version: 1.0.0

---

**🚀 Chúc bạn tạo video thành công!**
# render-video-hang-loat-boi-Hung-AI
