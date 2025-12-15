# 🚀 HƯỚNG DẪN CÀI ĐẶT NHANH

## Bước 1️⃣: Cài Extension vào Chrome

1. Mở Chrome, gõ vào thanh địa chỉ:
   ```
   chrome://extensions/
   ```

2. Bật **Developer mode** (góc trên bên phải)

3. Click nút **"Load unpacked"** (Tải tiện ích đã giải nén)

4. Chọn thư mục này (`veo3/`)

5. ✅ Extension đã cài đặt! Icon sẽ xuất hiện trên thanh công cụ

---

## Bước 2️⃣: Mở trang Flow

1. Truy cập: https://labs.google/fx/vi/tools/flow

2. Đăng nhập Google (nếu chưa)

3. Click **"Dự án mới"** hoặc **"Create with Flow"**

---

## Bước 3️⃣: Mở Extension Panel

1. Click vào **icon Extension** trên thanh công cụ Chrome

2. **Side Panel** sẽ mở ra bên phải màn hình

3. Trang Flow sẽ tự động thu nhỏ để vừa với phần còn lại

---

## Bước 4️⃣: Tải Prompts

### Cách 1: Dùng file mẫu có sẵn
1. Click vào khung **"📁 Tải file prompts (.txt)"**
2. Chọn file `sample_prompts.txt` (trong thư mục này)
3. ✅ 10 prompts mẫu sẽ được load

### Cách 2: Tạo file prompts riêng
1. Tạo file `.txt` mới
2. Mỗi dòng = 1 prompt
3. Ví dụ:
   ```
   A cat riding a bicycle on the moon
   A dog playing piano
   Mountain landscape at sunset
   ```
4. Upload vào Extension

---

## Bước 5️⃣: Cài đặt thông số (Tùy chọn)

| Thông số | Mặc định | Tùy chọn |
|----------|----------|----------|
| **Mô hình** | Veo 3.1 - Fast | Veo 3.1, Lower Priority variants |
| **Tỷ lệ** | Ngang (16:9) | Dọc (9:16) |
| **Số lượng** | 4 video | 1, 2, 3, 4 |
| **Pacing** | 10% | 0-100% |

**Giải thích Pacing:**
- 10% = Khi prompt trước đạt 10%, submit prompt tiếp
- 50% = Đợi prompt trước đạt 50%
- 100% = Đợi prompt trước hoàn thành 100%

---

## Bước 6️⃣: Bắt đầu tạo video!

1. Click nút **"▶️ Tạo video hàng loạt"**

2. Extension sẽ tự động:
   - ✅ Thu nhỏ trang về 25%
   - ✅ Bật chế độ Grid
   - ✅ Cài đặt Model, Tỷ lệ, Số lượng
   - ✅ Submit từng prompt theo thứ tự
   - ✅ Theo dõi % tiến độ mỗi 3 giây

3. Theo dõi tiến độ trên bảng:
   - **STT**: Số thứ tự
   - **Prompt**: Text (click để xem/sửa)
   - **% Tiến độ**: 0% → 100%
   - **Thao tác**: 🔄 Tạo lại, 👁️ Xem, ✏️ Sửa

---

## 🎛️ Điều khiển

| Nút | Chức năng |
|-----|-----------|
| **▶️ Tạo video hàng loạt** | Bắt đầu tự động |
| **⏸️ Tạm dừng** | Ngừng submit mới (prompts đang chạy vẫn tiếp tục) |
| **⏹️ Dừng** | Dừng hoàn toàn |

---

## 📊 Hiểu % Tiến độ

Extension tính % trung bình của tất cả video trong 1 prompt:

**Ví dụ:** Prompt tạo 4 video
- Video 1: 50%
- Video 2: 60%  
- Video 3: 55%
- Video 4: 45%

➡️ **% Process = (50+60+55+45)/4 = 52.5%**

Khi tất cả video đã render xong:
- Các số % biến mất
- Xuất hiện thumbnail/play button
- Extension tính = 100%

---

## ⚠️ Lưu ý quan trọng

### ✅ Nên làm:
- Upload file có ≤ 20 prompts lần đầu (để test)
- Đợi 1-2 prompt hoàn thành trước khi đóng tab
- Theo dõi % thường xuyên
- Đặt Pacing = 10-20% để tối ưu tốc độ

### ❌ Không nên:
- Upload quá 50 prompts cùng lúc (Flow có giới hạn)
- Đóng tab Flow khi đang render
- Refresh trang trong khi Extension đang chạy
- Submit prompt quá dài (> 500 ký tự)

---

## 🐛 Gặp lỗi?

### "Không tìm thấy tab Flow"
➡️ Mở trang Flow trước khi bật Extension

### "% không cập nhật"
➡️ Mở Console (`F12` → Console) xem log
➡️ Thử refresh trang Flow

### "Không submit được prompt"
➡️ Kiểm tra đã đăng nhập chưa
➡️ Thử submit 1 prompt thủ công để test
➡️ Reload Extension: `chrome://extensions/` → Reload

---

## 🎯 Tips & Tricks

### Tối ưu tốc độ:
- Đặt **Pacing = 10%** (submit nhanh liên tục)
- Chọn **Model = Veo 3.1 - Fast** (nhanh hơn)
- **Số lượng = 1-2** video/prompt (render nhanh)

### Chất lượng cao:
- Đặt **Pacing = 50-100%** (đảm bảo slot render)
- Chọn **Model = Veo 3.1** (chất lượng tốt)
- **Số lượng = 4** video/prompt (nhiều lựa chọn)

### Tiết kiệm quota:
- **Số lượng = 1** video/prompt
- Upload ít prompts mỗi lần (5-10)
- Dùng **Lower Priority** model khi không gấp

---

## 📞 Hỗ trợ

Nếu gặp vấn đề:
1. Đọc phần **Troubleshooting** trong `README.md`
2. Kiểm tra Console log
3. Thử reload Extension
4. Thử với file `sample_prompts.txt` để test

---

**🎉 Chúc bạn tạo video thành công!**

Made with ❤️ by Flow Automation Team
