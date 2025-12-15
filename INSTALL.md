# 📦 CÀI ĐẶT EXTENSION - HƯỚNG DẪN CHI TIẾT

## 🎯 Mục lục
1. [Cài đặt Extension](#bước-1-cài-đặt-extension)
2. [Mở trang Flow](#bước-2-mở-trang-flow)
3. [Sử dụng Extension](#bước-3-sử-dụng-extension)
4. [Troubleshooting](#troubleshooting)

---

## Bước 1: Cài đặt Extension

### 1.1. Mở Chrome Extensions
```
Cách 1: Gõ vào thanh địa chỉ:
chrome://extensions/

Cách 2: Menu ⋮ → More Tools → Extensions
```

### 1.2. Bật Developer Mode
```
┌──────────────────────────────────────┐
│ Extensions                  🔧 ⚙️    │
├──────────────────────────────────────┤
│ Developer mode        [ON]  ◄─ BẬT   │
│                                       │
│ [Load unpacked] [Pack extension]     │
│ [Update]                              │
└──────────────────────────────────────┘
```

Click nút toggle "Developer mode" ở góc trên bên phải để BẬT.

### 1.3. Load Extension
```
1. Click nút [Load unpacked]

2. Chọn thư mục: veo3/
   (Thư mục chứa file manifest.json)

3. Click [Select Folder]
```

### 1.4. Kiểm tra Extension đã được cài
```
┌──────────────────────────────────────┐
│ ✅ Flow Video Automation      v1.0.0 │
├──────────────────────────────────────┤
│ ID: abcdefghijk...                    │
│ Tự động hóa tạo video hàng loạt...    │
│                                       │
│ [Details] [Remove] [Errors]           │
└──────────────────────────────────────┘
```

Nếu thấy card như trên → ✅ Cài đặt thành công!

### 1.5. Pin Extension (Tùy chọn)
```
1. Click icon Extensions (mảnh ghép) trên thanh công cụ
2. Tìm "Flow Video Automation"
3. Click icon 📌 để ghim lên thanh công cụ
```

---

## Bước 2: Mở trang Flow

### 2.1. Truy cập Flow
```
URL: https://labs.google/fx/vi/tools/flow

Hoặc:
1. Vào https://labs.google
2. Tìm "Flow"
3. Click vào Flow tool
```

### 2.2. Đăng nhập Google (nếu cần)
```
Nếu chưa đăng nhập:
1. Click "Sign in"
2. Chọn tài khoản Google
3. Cho phép quyền truy cập
```

### 2.3. Tạo dự án mới
```
Tìm nút: "Dự án mới" (tiếng Việt)
        hoặc "New Project" / "Create with Flow" (tiếng Anh)

Click vào nút đó → Vào giao diện chính của Flow
```

### 2.4. Giao diện Flow sẽ hiện ra
```
┌─────────────────────────────────────────┐
│  Flow                    🔲 Grid  ⚙️    │
├─────────────────────────────────────────┤
│                                          │
│  ┌────────────────────────────────────┐ │
│  │ Mô tả video của bạn ở đây...       │ │
│  └────────────────────────────────────┘ │
│                      [Mở rộng]  [Tạo →]│
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ (Videos sẽ hiển thị ở đây)       │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

---

## Bước 3: Sử dụng Extension

### 3.1. Mở Side Panel
```
Cách 1: Click icon Extension trên thanh công cụ

Cách 2: Right-click icon → Click "Open" hoặc tên Extension
```

### 3.2. Side Panel xuất hiện
```
┌──────────┬────────────────────────────┐
│          │ 🎬 Flow Video Automation   │
│          ├────────────────────────────┤
│   Flow   │ 📁 Tải file prompts (.txt) │
│   Page   │ ┌────────────────────────┐ │
│          │ │ Chưa có file...        │ │
│          │ └────────────────────────┘ │
│  (25%    │                            │
│   zoom)  │ ⚙️ Cài đặt                 │
│          │ Model: [Veo 3.1 - Fast ▼]  │
│          │ Tỷ lệ: [Ngang 16:9 ▼]      │
│          │ Số lượng: [4 ▼]            │
│          │ Pacing: [10]               │
│          │                            │
│          │ [▶️ Tạo video hàng loạt]   │
│          │ [⏸️ Tạm dừng] [⏹️ Dừng]    │
│          │                            │
│          │ ⏳ Chờ tải prompts...       │
│          │ [━━━━━━━━━━] 0%            │
│          │                            │
│          │ 📝 Danh sách Prompts       │
│          │ ┌──┬───────┬──┬─────────┐ │
│          │ │# │Prompt │% │Thao tác │ │
│          │ ├──┼───────┼──┼─────────┤ │
│          │ │  │       │  │         │ │
│          │ └──┴───────┴──┴─────────┘ │
└──────────┴────────────────────────────┘
```

Trang Flow sẽ tự động thu nhỏ để nhường chỗ cho Side Panel.

### 3.3. Upload file prompts
```
1. Click vào khung "📁 Tải file prompts (.txt)"

2. Chọn file .txt:
   - Dùng sample_prompts.txt có sẵn
   - Hoặc file .txt tự tạo

3. File sẽ được load:
   ✅ Đã tải 10 prompts từ sample_prompts.txt
```

### 3.4. Bảng Prompts sẽ hiện
```
┌──┬─────────────────────┬────┬──────────────┐
│# │ Prompt              │ %  │ Thao tác     │
├──┼─────────────────────┼────┼──────────────┤
│1 │ A cat riding a b... │ 0% │ 🔄 👁️ ✏️     │
│2 │ A dog playing pi... │ 0% │ 🔄 👁️ ✏️     │
│3 │ Mountain landsca... │ 0% │ 🔄 👁️ ✏️     │
│4 │ Futuristic city ... │ 0% │ 🔄 👁️ ✏️     │
│5 │ Ocean waves cras... │ 0% │ 🔄 👁️ ✏️     │
└──┴─────────────────────┴────┴──────────────┘
```

### 3.5. Setup Settings (Tùy chọn)
```
Mô hình:
  ○ Veo 3.1 - Fast ← MẶC ĐỊNH (nhanh nhất)
  ○ Veo 3.1 - Fast [Lower Priority]
  ○ Veo 3.1
  ○ Veo 3.1 [Lower Priority]

Tỷ lệ:
  ○ Ngang (16:9) ← MẶC ĐỊNH
  ○ Dọc (9:16)

Số lượng video:
  ○ 1 video
  ○ 2 video
  ○ 3 video
  ○ 4 video ← MẶC ĐỊNH

Pacing (%):
  [10] ← MẶC ĐỊNH (0-100)
  
  Tooltip: % hoàn thành prompt trước 
           để kích hoạt prompt sau
```

### 3.6. Click Start!
```
Click: [▶️ Tạo video hàng loạt]

Extension sẽ tự động:
1. 📐 Thu nhỏ trang Flow về 25%
2. 🔲 Bật chế độ Grid
3. ⚙️ Cài đặt thông số
4. 📝 Submit prompt 1
5. ⏳ Đợi prompt 1 đạt 10%
6. 📝 Submit prompt 2
7. ⏳ Đợi prompt 2 đạt 10%
8. ...
```

### 3.7. Theo dõi tiến độ
```
Status Bar:
⏳ Đang tạo prompt 3/10...
[━━━━━━━━░░] 30%

Bảng Prompts:
┌──┬─────────────────────┬────┬──────────────┐
│# │ Prompt              │ %  │ Thao tác     │
├──┼─────────────────────┼────┼──────────────┤
│1 │ A cat riding a b... │100%│ 🔄 👁️ ✏️     │ ← Xanh đậm
│2 │ A dog playing pi... │ 87%│ 🔄 👁️ ✏️     │ ← Xanh nhạt
│3 │ Mountain landsca... │ 45%│ 🔄 👁️ ✏️     │ ← Cam
│4 │ Futuristic city ... │ 12%│ 🔄 👁️ ✏️     │ ← Cam
│5 │ Ocean waves cras... │  0%│ 🔄 👁️ ✏️     │ ← Xám
└──┴─────────────────────┴────┴──────────────┘
```

Màu sắc:
- **Xám (0%)**: Chưa bắt đầu
- **Cam (1-49%)**: Đang render
- **Xanh nhạt (50-99%)**: Sắp xong
- **Xanh đậm (100%)**: Hoàn tất

### 3.8. Hoàn thành!
```
Status:
✅ Hoàn tất! Tất cả video đã được tạo.
[━━━━━━━━━━] 100%

Bảng:
┌──┬─────────────────────┬────┬──────────────┐
│1 │ A cat riding a b... │100%│ 🔄 👁️ ✏️     │
│2 │ A dog playing pi... │100%│ 🔄 👁️ ✏️     │
│3 │ Mountain landsca... │100%│ 🔄 👁️ ✏️     │
└──┴─────────────────────┴────┴──────────────┘
```

Tất cả prompt đều 100% → Xong!

---

## Các chức năng bổ sung

### Chỉnh sửa Prompt
```
1. Click vào text prompt (màu xanh, gạch chân)
   HOẶC click nút ✏️

2. Modal hiện ra:
   ┌──────────────────────────────┐
   │ ✏️ Chỉnh sửa Prompt          │
   ├──────────────────────────────┤
   │ ┌──────────────────────────┐ │
   │ │ A cat riding a bicycle   │ │
   │ │ on the moon with stars   │ │
   │ │ in the background        │ │
   │ └──────────────────────────┘ │
   │                              │
   │      [💾 Lưu]  [❌ Hủy]      │
   └──────────────────────────────┘

3. Chỉnh sửa text
4. Click [Lưu]
```

### Tạo lại Prompt
```
Click nút 🔄 trên hàng prompt đó

→ Reset % về 0
→ Submit lại prompt
```

### Xem Video (sau khi hoàn thành)
```
Click nút 👁️ (chỉ active khi 100%)

→ Modal hiện ra (hiện tại chỉ hiển thị UUID)
→ Vào trang Flow để xem video thật
```

### Tạm dừng
```
Click [⏸️ Tạm dừng]

→ Dừng submit prompts mới
→ Prompts đang render vẫn tiếp tục
→ Click [▶️ Tiếp tục] để chạy lại
```

### Dừng hoàn toàn
```
Click [⏹️ Dừng]

→ Dừng hẳn automation
→ Prompts đang render vẫn tiếp tục (không thể hủy)
→ Có thể bấm [Start] lại để làm lại
```

---

## Troubleshooting

### ❌ Lỗi: "Không tìm thấy tab Flow"

**Nguyên nhân**: Extension không tìm thấy trang Flow

**Giải pháp**:
1. Đảm bảo đã mở trang Flow: `https://labs.google/fx/*/tools/flow*`
2. Đã vào giao diện chính (sau khi click "Dự án mới")
3. Thử refresh lại trang Flow
4. Đóng và mở lại Side Panel

---

### ❌ Lỗi: "% không cập nhật"

**Nguyên nhân**: Polling không hoạt động hoặc UUID không khớp

**Giải pháp**:
1. Mở Console để xem log:
   - F12 → Console tab
   - Tìm `[Content]` hoặc `[Panel]` logs

2. Kiểm tra xem prompt có UUID ở đầu không:
   - Vào trang Flow
   - Tìm text prompt vừa submit
   - Phải có format: `xxxxxxxx-xxxx-... Text prompt`

3. Thử refresh trang Flow
4. Reload Extension:
   - `chrome://extensions/`
   - Tìm "Flow Video Automation"
   - Click icon reload 🔄

---

### ❌ Lỗi: "Không submit được prompt"

**Nguyên nhân**: DOM thay đổi hoặc chưa đăng nhập

**Giải pháp**:
1. Kiểm tra đã đăng nhập Google chưa
2. Thử submit 1 prompt thủ công trên Flow để test
3. Kiểm tra có popup/dialog đang mở không
4. Đảm bảo đã bật Tune (Extension tự bật)
5. Xem Console log để biết lỗi cụ thể

---

### ❌ Lỗi: Extension không load

**Nguyên nhân**: Sai thư mục hoặc file manifest lỗi

**Giải pháp**:
1. Đảm bảo chọn đúng thư mục `veo3/`
2. Kiểm tra thư mục có file `manifest.json` không
3. Mở `chrome://extensions/`
4. Tìm Extension
5. Click "Errors" để xem lỗi
6. Fix lỗi và click "Reload"

---

### ❌ Lỗi: Side Panel không mở

**Nguyên nhân**: Chrome version cũ

**Giải pháp**:
1. Kiểm tra Chrome version:
   - `chrome://version/`
   - Cần >= 114

2. Update Chrome:
   - Menu ⋮ → Help → About Google Chrome
   - Tự động update

3. Nếu vẫn không được:
   - Thử Edge hoặc Brave (Chromium-based)

---

### ❌ Lỗi: Trang Flow bị vỡ layout

**Nguyên nhân**: Zoom 25% quá nhỏ

**Giải pháp**:
1. Tắt automation
2. Reset zoom trang Flow về 100%:
   - Ctrl + 0 (Windows/Linux)
   - Cmd + 0 (Mac)

3. Nếu muốn zoom khác:
   - Sửa `background.js`:
   ```javascript
   await chrome.tabs.setZoom(flowTab.id, 0.5); // 50%
   ```

---

### ❌ Lỗi: Prompt bị trùng lặp

**Nguyên nhân**: Submit nhiều lần do lỗi

**Giải pháp**:
1. Dừng automation ([⏹️ Dừng])
2. Xóa prompts trùng trên Flow (nếu có)
3. Kiểm tra lại file prompts (không có dòng trùng)
4. Start lại

---

## Tips nâng cao

### Tối ưu tốc độ
```
Settings:
- Model: Veo 3.1 - Fast
- Pacing: 5-10%
- Số lượng: 1-2 video

→ Render nhanh nhất
```

### Tối ưu chất lượng
```
Settings:
- Model: Veo 3.1
- Pacing: 50-100%
- Số lượng: 4 video

→ Chất lượng tốt, nhiều lựa chọn
```

### Tiết kiệm quota
```
Settings:
- Model: Lower Priority
- Số lượng: 1 video
- Upload ít prompts/lần

→ Dùng quota ít hơn
```

### Debug mode
```
1. Mở Console:
   - Panel: Right-click Side Panel → Inspect
   - Content: F12 trên trang Flow
   - Background: chrome://extensions/ → Service Worker → Inspect

2. Xem logs:
   - [Panel]: Panel logic
   - [Content]: DOM interactions
   - [Background]: Messaging, zoom

3. Filter logs:
   - Gõ "[Panel]" để chỉ xem panel logs
```

---

## Câu hỏi thường gặp (FAQ)

**Q: Extension có miễn phí không?**  
A: ✅ Có, hoàn toàn miễn phí và open-source.

**Q: Extension có thu thập dữ liệu không?**  
A: ❌ Không, tất cả dữ liệu lưu local.

**Q: Có giới hạn số prompts không?**  
A: Flow có thể có giới hạn (chưa rõ số cụ thể). Nên test với 10-20 prompts trước.

**Q: Mất bao lâu để render 1 video?**  
A: 3-10 phút tùy độ phức tạp và server load.

**Q: Extension hoạt động trên Firefox không?**  
A: ❌ Không, chỉ Chrome/Edge/Brave (cần Side Panel API).

**Q: Tôi có thể đóng tab Flow khi đang render không?**  
A: ⚠️ Không nên. Nếu đóng, các video đang render sẽ mất.

**Q: Extension có tự động download video không?**  
A: ❌ Chưa có. Hiện tại phải download thủ công trên Flow.

**Q: Tôi có thể chạy nhiều tab Flow cùng lúc không?**  
A: ❌ Không, Extension chỉ hỗ trợ 1 tab Flow.

**Q: Extension có hỗ trợ ảnh sang video không?**  
A: ❌ Chưa. Hiện chỉ hỗ trợ text-to-video.

**Q: Làm sao để update Extension?**  
A: 
1. Download phiên bản mới
2. `chrome://extensions/`
3. Xóa version cũ
4. Load version mới

---

## Liên hệ & Hỗ trợ

**Issues**: Báo lỗi hoặc đề xuất tính năng  
**Documentation**: Đọc `README.md` và `TECHNICAL.md`  
**Updates**: Theo dõi changelog trong `README.md`

---

✅ **Chúc bạn sử dụng Extension thành công!** ✅
