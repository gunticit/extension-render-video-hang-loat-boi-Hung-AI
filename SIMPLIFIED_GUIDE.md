# 🚀 HƯỚNG DẪN SỬ DỤNG - SIMPLIFIED VERSION

## ⚠️ QUAN TRỌNG - ĐỌC TRƯỚC KHI DÙNG

Extension đã được **đơn giản hóa** để tránh lỗi selector.

**Extension KHÔNG tự động:**
- ❌ Thu nhỏ trang (zoom)
- ❌ Bật Grid mode
- ❌ Mở Tune/Settings
- ❌ Chọn Model
- ❌ Chọn Aspect Ratio
- ❌ Chọn Video Count

**Extension CHỈ:**
- ✅ Submit prompts có UUID
- ✅ Tracking % progress
- ✅ Pacing control

---

## 📋 HƯỚNG DẪN TỪNG BƯỚC

### **Bước 1: Mở trang Flow**
```
https://labs.google/fx/tools/flow
```

### **Bước 2: Click "Dự án mới" / "New Project"**

Click vào để vào workspace chính.

### **Bước 3: ⚠️ CÀI ĐẶT THỦ CÔNG trên Flow**

**TRƯỚC KHI** chạy Extension, bạn PHẢI cài đặt:

#### **3a. Click nút ⚙️ (Tune/Cài đặt)**
Ở góc trên của Flow

#### **3b. Chọn thông số:**

**Model:**
- Veo 3.1 - Fast (nhanh)
- Veo 3.1 (chất lượng)
- Hoặc bất kỳ model nào bạn muốn

**Tỷ lệ khung hình:**
- Khổ ngang (16:9)
- Khổ dọc (9:16)

**Số lượng video mỗi prompt:**
- 1, 2, 3, hoặc 4

#### **3c. Đóng Tune settings**

### **Bước 4: Mở Extension**

Click icon Extension → Side Panel mở

### **Bước 5: Upload file prompts**

Click "📁 Tải file prompts (.txt)"

Chọn:
- `sample_prompts.txt` (10 prompts - test)
- `cinematic_8k_prompts.txt` (20 prompts - pro)

### **Bước 6: Click "▶️ Tạo video hàng loạt"**

Sẽ có popup confirm:
```
⚠️ QUAN TRỌNG:

Extension sẽ BỎ QUA các bước setup tự động.
Bạn PHẢI tự cài đặt trước:

1. Model (Veo 3.1, Veo 3.1 Fast, etc.)
2. Tỷ lệ (16:9 hoặc 9:16)
3. Số lượng video (1-4)

Extension chỉ submit prompts và tracking progress.

Bạn đã cài đặt xong chưa?
```

### **Bước 7: Click OK**

Nếu đã cài đặt ở Bước 3.

### **Bước 8: Extension bắt đầu**

Extension sẽ:
1. Submit prompt 1 (với UUID)
2. Đợi đạt X% (Pacing)
3. Submit prompt 2
4. Lặp lại...

### **Bước 9: Theo dõi tiến độ**

Xem % trong bảng prompts của Extension.

---

## ⚙️ SETTINGS TRONG EXTENSION

Các settings vẫn hiển thị nhưng **KHÔNG được sử dụng** trong automation.

Chúng chỉ để tham khảo.

**Pacing vẫn hoạt động:**
- Mặc định: 10%
- Có thể đổi: 0-100%

---

## 🎯 TẠI SAO ĐƠN GIẢN HÓA?

Flow UI thay đổi thường xuyên → Selectors bị lỗi.

Thay vì maintain selectors, version này:
- ✅ Ổn định hơn
- ✅ Ít lỗi hơn
- ✅ Dễ debug hơn

Nhược điểm:
- ❌ Phải setup thủ công
- ❌ Không tự động 100%

---

## 🔧 TROUBLESHOOTING

### **Lỗi: "Không tìm thấy ô nhập prompt"**

→ Bạn chưa vào workspace của Flow
→ Click "Dự án mới" trước

### **Lỗi: "Could not establish connection"**

→ Chưa refresh tab Flow sau khi reload Extension
→ Ấn F5 trên tab Flow

### **Prompts không submit**

Kiểm tra:
1. Đã vào đúng workspace Flow chưa?
2. Có thấy ô nhập prompt to to không?
3. Console có lỗi đỏ không? (F12)

### **% không cập nhật**

→ Bình thường, vì:
1. Video chưa bắt đầu render (0%)
2. UUID chưa xuất hiện trên Flow
3. Đợi thêm 10-20 giây

---

## 📊 WORKFLOW

```
User setup Flow
    ↓
User loads Extension
    ↓
User uploads prompts
    ↓
User clicks Start
    ↓
Extension submits Prompt 1 (UUID)
    ↓
Extension polls % every 3s
    ↓
When Prompt 1 >= 10% (or pacing %)
    ↓
Extension submits Prompt 2 (UUID)
    ↓
Repeat...
    ↓
All prompts done → Stop
```

---

## ✅ CHECKLIST ĐẦY ĐỦ

**Trước khi Start:**
- [ ] Đã mở trang Flow
- [ ] Đã click "Dự án mới"
- [ ] Đã vào workspace (thấy ô prompt lớn)
- [ ] Đã click ⚙️ Tune
- [ ] Đã chọn Model
- [ ] Đã chọn Tỷ lệ (16:9 hoặc 9:16)
- [ ] Đã chọn Số lượng (1-4)
- [ ] Đã đóng Tune
- [ ] Đã reload Extension (nếu vừa sửa code)
- [ ] Đã refresh tab Flow (F5)
- [ ] Đã mở Side Panel
- [ ] Đã upload file prompts
- [ ] Đã đọc popup confirm
- [ ] Click Start

**Sau khi Start:**
- [ ] Thấy prompt 1 xuất hiện trên Flow (có UUID ở đầu)
- [ ] Thấy nút "Tạo" tự động click
- [ ] Thấy video bắt đầu render (có %)
- [ ] Thấy % trong Extension table update
- [ ] Thấy prompt 2 submit sau khi prompt 1 đạt Pacing %

---

## 🆘 SUPPORT

Nếu vẫn lỗi:
1. Mở Console (F12) trên tab Flow
2. Copy toàn bộ error màu đỏ
3. Gửi cho dev

Hoặc:
1. Chụp screenshot giao diện Flow
2. Gửi cho dev

---

**Version**: 1.1 (Simplified)  
**Date**: 2025-12-15  
**Note**: Simplified version - manual setup required
