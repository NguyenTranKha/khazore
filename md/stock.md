---
title: Cẩm nang chứng khoán
date: 2026-09-13
category: Chứng khoán
excerpt: EPS, P/E, P/B và số Graham — các công thức định giá viết lại cho dễ đọc.
cover: draft
image: https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f
alt: Màn hình biểu đồ chứng khoán
readingMinutes: 12
featured: false
draft: true
---

#### CHƯƠNG 1: CÁC CHỈ SỐ TÀI CHÍNH CƠ BẢN & ĐỊNH GIÁ DOANH NGHIỆP

##### 1. Chỉ Số Lợi Nhuận Trên Mỗi Cổ Phiếu (EPS - Earnings Per Share)
EPS đo lường phần lợi nhuận ròng phân bổ cho mỗi cổ phiếu phổ thông đang lưu hành trên thị trường:

$$\text{EPS} = \frac{\text{Lợi nhuận ròng} - \text{Cổ tức ưu đãi}}{\text{Số lượng cổ phiếu phổ thông đang lưu hành}}$$

---

##### 2. Hệ Số Giá Trên Thu Nhập (P/E - Price to Earnings Ratio)
Chỉ số P/E cho biết nhà đầu tư sẵn sàng trả bao nhiêu tiền cho 1 đồng lợi nhuận của doanh nghiệp:

$$\text{P/E} = \frac{P}{\text{EPS}}$$

Trong đó:
- $P$: Thị giá cổ phiếu (*Stock Price*).
- $\text{EPS}$: Lợi nhuận trên mỗi cổ phiếu.

---

##### 3. Tỷ Suất Lợi Tức Thu Nhập (Earnings Yield - $E/P$)
Earnings Yield là nghịch đảo của chỉ số P/E, phản ánh tỷ suất lợi nhuận ngầm định mà nhà đầu tư nhận được trên mức giá đã mua:

$$\text{Earnings Yield} = \frac{1}{\text{P/E}} = \frac{\text{EPS}}{P}$$

*Ví dụ:* Nếu $\text{P/E} = 15$, tỷ suất lợi tức thu nhập tương ứng là:

$$\text{Earnings Yield} = \frac{1}{15} \approx 6.67\%$$

---

##### 4. Giá Trị Sổ Sách Trên Mỗi Cổ Phiếu (BVPS - Book Value Per Share)
BVPS phản ánh giá trị tài sản thuần của doanh nghiệp tính trên mỗi cổ phiếu nếu công ty giải thể và thanh toán hết các khoản nợ:

$$\text{BVPS} = \frac{\text{Vốn chủ sở hữu} - \text{Tài sản vô hình}}{\text{Số lượng cổ phiếu đang lưu hành}}$$

---

##### 5. Hệ Số Giá Trên Giá Trị Sổ Sách (P/B - Price to Book Ratio)
Chỉ số P/B so sánh thị giá hiện tại trên sàn với giá trị tài sản thuần ghi nhận trên sổ sách kế toán:

$$\text{P/B} = \frac{P}{\text{BVPS}}$$

---

#### CHƯƠNG 2: MÔ HÌNH ĐỊNH GIÁ BENJAMIN GRAHAM & HẰNG SỐ 22.5

##### 1. Nguồn Gốc Toán Học Của Hằng Số 22.5
Benjamin Graham thiết lập hai tiêu chuẩn phòng thủ trần cho một nhà đầu tư giá trị:
1. Giới hạn định giá thu nhập: $\text{P/E} \le 15$ (tương ứng lợi tức $\ge 6.67\%$).
2. Giới hạn định giá tài sản: $\text{P/B} \le 1.5$ (bảo vệ vốn bằng tài sản thực).

Tích số hai tiêu chuẩn quản trị rủi ro tạo thành hằng số định giá mục tiêu:

$$\text{Hạn mức P/E} \times \text{Hạn mức P/B} = 15 \times 1.5 = 22.5$$

---

##### 2. Công Thức Tính Giá Trị Nội Tại (Số Graham - Graham Number)
Từ tích số phòng thủ $22.5$, công thức tính giá trị nội tại tối đa ($V$) được xác định như sau:

$$V = \sqrt{22.5 \times \text{EPS} \times \text{BVPS}}$$

Nếu thị giá $P < V$, cổ phiếu đạt tiêu chuẩn biên an toàn của Graham.

---

##### 3. Nguyên Lý Bù Trừ Thu Nhập Và Tài Sản (The Compensating Principle)
Hằng số $22.5$ cho phép sự linh hoạt giữa $P/E$ và $P/B$:

$$\text{P/E} \times \text{P/B} \le 22.5$$

$$\Rightarrow \text{P/E}_{\text{cho phép}} \le \frac{22.5}{\text{P/B}_{\text{hiện tại}}} \quad \text{hoặc} \quad \text{P/B}_{\text{cho phép}} \le \frac{22.5}{\text{P/E}_{\text{hiện tại}}}$$

---

#### CHƯƠNG 3: NGUYÊN LÝ ĐIỀU CHỈNH GIÁ KỸ THUẬT KHI CHIA CỔ TỨC

Khi doanh nghiệp chia cổ tức bằng cổ phiếu hoặc thưởng cổ phiếu, tổng vốn hóa thị trường trước và sau ngày giao dịch không hưởng quyền (GDKHQ) được bảo toàn:

$$\text{Vốn hóa}_{\text{trước chia}} = \text{Vốn hóa}_{\text{sau chia}}$$

$$P_{\text{trước}} \times Q_{\text{trước}} = P_{\text{sau}} \times Q_{\text{sau}}$$

Công thức xác định giá điều chỉnh ($P'$):

$$P' = P \times \frac{Q}{Q + \Delta Q}$$

Trong đó:
- $P$: Giá trước ngày GDKHQ.
- $Q$: Số lượng cổ phiếu lưu hành cũ.
- $\Delta Q$: Số lượng cổ phiếu phát hành thêm.

---

#### CHƯƠNG 4: PHÂN TÍCH KỸ THUẬT & TOÁN HỌC ĐƯỜNG TRUNG BÌNH ĐỘNG

##### 1. Đường Trung Bình Động Đơn Giản (SMA - Simple Moving Average)
Đường SMA làm mượt dữ liệu giá bằng cách tính trung bình cộng giá đóng cửa trong $n$ phiên giao dịch:

$$\text{SMA}_n = \frac{\sum_{i=1}^{n} P_i}{n} = \frac{P_1 + P_2 + \dots + P_n}{n}$$

- **MA50:** Trung bình 50 phiên (Hỗ trợ / kháng cự động trung hạn).
- **MA200:** Trung bình 200 phiên (Xác định xu hướng vĩ mô dài hạn Uptrend / Downtrend).

---

##### 2. Tín Hiệu Giao Cắt Vàng (Golden Cross) & Giao Cắt Tử Thần (Death Cross)
- **Golden Cross (Xu hướng tăng dài hạn):**
  $$\text{MA}_{50} \text{ cắt lên trên } \text{MA}_{200}$$
  $$\text{Điều kiện đi kèm:} \quad P > \text{MA}_{50} > \text{MA}_{200}$$

- **Death Cross (Xu hướng giảm dài hạn):**
  $$\text{MA}_{50} \text{ cắt xuống dưới } \text{MA}_{200}$$

---

##### 3. Tỷ Lệ Rủi Ro / Lợi Nhuận (Risk / Reward Ratio - R:R)
Công thức tối ưu hóa điểm vào lệnh trước khi giải ngân:

$$\text{Tỷ lệ R:R} = \frac{\text{Mục tiêu chốt lời (Take Profit)} - \text{Giá mua (Entry)}}{\text{Giá mua (Entry)} - \text{Ngưỡng cắt lỗ (Stop Loss)}} \ge 2.0$$

---

#### CHƯƠNG 5: CÁC MÔ HÌNH ĐỊNH GIÁ NÂNG CAO

##### 1. Mô Hình Chiết Khấu Cổ Tức Gordon (Dividend Discount Model - DDM)
$$V = \frac{D_1}{r - g} = \frac{D_0 \times (1 + g)}{r - g}$$

---

##### 2. Mô Hình Chiết Khấu Dòng Tiền Tự Do Doanh Nghiệp (FCFF - Free Cash Flow to Firm)
$$V_{\text{Enterprise}} = \sum_{t=1}^{N} \frac{\text{FCFF}_t}{(1 + \text{WACC})^t} + \frac{\text{Terminal Value}_N}{(1 + \text{WACC})^N}$$

---