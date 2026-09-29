# Phân loại ESP32: Hiểu họ chip để chọn đúng cho dự án

ESP32 ban đầu chỉ là một SoC Wi-Fi + Bluetooth ra mắt năm 2016. Đến 2026, “ESP32” đã thành cả một họ chip: khác kiến trúc CPU, khác radio, khác mức tiêu thụ và khác mục tiêu sản phẩm. Chọn sai dòng thường dẫn tới thiếu Bluetooth Classic, thiếu USB, thiếu Thread/Zigbee, hoặc dư công suất và giá.

Cách phân loại thực tế nhất là theo **series** của Espressif, rồi mới xét chip cụ thể và module (WROOM, MINI, WROVER…).

## 1. Bốn nhóm chính trong họ ESP32a

| Series | Ý nghĩa tên | Kiến trúc điển hình | Vai trò |
|---|---|---|---|
| **ESP32 gốc** | Thế hệ đầu | Xtensa LX6 | Đa năng, Bluetooth Classic, Ethernet MAC |
| **S (Secure / Super)** | Hiệu năng + USB / AI | Xtensa LX7 | USB OTG, camera, LCD, vector AI |
| **C (Cost / Connectivity)** | Giá tốt, RISC-V | RISC-V | Thay ESP8266, Wi-Fi 6, Matter |
| **H (IEEE 802.15.4)** | Mesh, không Wi-Fi | RISC-V | Zigbee / Thread / Matter endpoint |
| **P (Performance)** | MCU mạnh, HMI | RISC-V dual-core | Màn hình, camera, video — thường không có Wi-Fi tích hợp |

Espressif đang chuyển dần sang RISC-V. Xtensa còn ở ESP32 gốc, S2, S3; hầu hết chip mới (C3, C5, C6, H2, P4, S31) dùng RISC-V.

## 2. Từng dòng chip

### ESP32 gốc (Classic)

- Dual-core Xtensa LX6, tối đa 240 MHz, ~520 KB SRAM.
- Wi-Fi 4 (2.4 GHz) + **Bluetooth Classic 4.2** + BLE.
- Ethernet MAC (cần PHY ngoài), DAC 8-bit, touch, nhiều tutorial nhất.
- Vẫn là lựa chọn nếu cần A2DP/SPP, Ethernet có sẵn, hoặc port code cũ.

Hạn chế: không USB native, Wi-Fi chỉ 2.4 GHz 802.11n, không vector AI như S3.

### ESP32-S2

- Single-core Xtensa LX7 240 MHz, ~320 KB SRAM, nhiều GPIO (~43).
- Chỉ Wi-Fi 4. **Không Bluetooth**.
- USB OTG native, DAC, bảo mật tốt.
- Phù hợp USB gadget, thiết bị chỉ Wi-Fi. Nhiều module MINI-1 cũ đã NRND; MINI-2 / SOLO-2 còn dùng.

### ESP32-S3

- Dual-core Xtensa LX7 240 MHz, 512 KB SRAM, GPIO ~45.
- Wi-Fi 4 + BLE 5, USB OTG, camera DVP, LCD RGB, lệnh vector cho TinyML.
- “Flagship maker” 2021–2026: camera, giọng nói, GUI nhẹ, PSRAM octal.

Không có Bluetooth Classic, không Zigbee/Thread, Wi-Fi vẫn là Wi-Fi 4.

### ESP32-C2 (ESP8684)

- RISC-V single-core ~120 MHz, SRAM nhỏ, GPIO ít (~14).
- Wi-Fi 4 + BLE 5, giá thấp nhất.
- Thay ESP8266 cho node đơn giản, sản xuất số lượng lớn.

### ESP32-C3

- RISC-V 160 MHz, ~400 KB SRAM, GPIO ~16–22.
- Wi-Fi 4 + BLE 5, USB Serial/JTAG, tiêu thụ thấp, giá rẻ.
- Workhorse IoT pin, MQTT, cảm biến, thay 8266 “có BLE”.

### ESP32-C6

- RISC-V HP 160 MHz + lõi LP.
- **Wi-Fi 6 (2.4 GHz)** + BLE 5.3 + **IEEE 802.15.4** (Zigbee + Thread).
- Chip Matter phổ biến: vừa Wi-Fi vừa mesh.

### ESP32-C5 / C61

- C5: Wi-Fi 6 **dual-band 2.4 + 5 GHz**, BLE, 802.15.4 — khi băng 2.4 GHz quá đông.
- C61: Wi-Fi 6 2.4 GHz + BLE, **không** 802.15.4 — bản “gọn” hơn C6.

### ESP32-H2 (và H4)

- RISC-V ~96 MHz, **không Wi-Fi**.
- BLE + 802.15.4. Endpoint pin cúc áo, bóng đèn Zigbee/Thread, Matter over Thread.
- H4 hướng BLE mới hơn (LE Audio, direction finding) — ít phổ biến hơn H2.

### ESP32-P4

- Dual-core RISC-V tới ~400 MHz, SRAM lớn (~768 KB), PSRAM in-package 16/32 MB.
- MIPI DSI/CSI, JPEG, xử lý ảnh/video, USB 2.0 HS, Ethernet.
- **Không Wi-Fi/BT tích hợp** — thường ghép C6/H2 làm radio.
- HMI công nghiệp, gateway, multimedia.

### ESP32-S31 (mới công bố)

Không phải bản vá S3. Dual-core RISC-V ~320 MHz, Wi-Fi 6, BLE 5.4 **+ Classic**, 802.15.4, USB HS, Ethernet Gigabit, nhiều GPIO (~60), tăng tốc multimedia/AI. Dành cho gateway/đa giao thức; S3 vẫn hợp bài toán giá.

## 3. Bảng so sánh nhanh

| Chip | CPU | Xung | Wi-Fi | BT Classic | BLE | 802.15.4 | USB | Điểm mạnh |
|---|---|---|---|---|---|---|---|---|
| ESP32 | Xtensa dual | 240 | 4 | Có | 4.2 | Không | Không | Classic BT, Ethernet, cộng đồng |
| S2 | Xtensa single | 240 | 4 | Không | Không | Không | OTG | USB, GPIO nhiều |
| S3 | Xtensa dual | 240 | 4 | Không | 5.0 | Không | OTG | AI, camera, LCD |
| C2 | RISC-V | 120 | 4 | Không | 5 | Không | Không | Rẻ |
| C3 | RISC-V | 160 | 4 | Không | 5 | Không | Serial/JTAG | Pin + giá |
| C6 | RISC-V HP+LP | 160 | **6** | Không | 5.3 | Có | Serial/JTAG | Matter / smart home |
| C5 | RISC-V | 240 | **6 dual-band** | Không | Có | Có | Serial/JTAG | 5 GHz |
| H2 | RISC-V | 96 | Không | Không | 5.3 | Có | Serial/JTAG | Mesh không Wi-Fi |
| P4 | RISC-V dual | 400 | Không* | Không | Không | Không | HS | HMI / video |
| S31 | RISC-V dual | 320 | 6 | Có | 5.4 | Có | HS | Đa protocol + hiệu năng |

\*P4 cần chip radio rời nếu cần không dây.

## 4. Phân loại module (thứ hay thấy trên board)

Chip SoC khác module đã đóng RF + flash.

- **WROOM**: module chuẩn, anten PCB, flash 4–16 MB.
- **WROVER**: thêm PSRAM (thường 8 MB) — camera, buffer lớn; board dài hơn.
- **MINI**: nhỏ, flash/PSRAM in-package, ít chân hơn.
- **PICO / SiP**: dao động + flash (đôi khi PSRAM) trong một gói.
- Hậu tố **U**: connector U.FL thay anten PCB.
- Số sau tên (WROOM-1 / WROOM-2): khác dung lượng flash/PSRAM.

Ví dụ: ESP32-S3-WROOM-1 vs WROOM-2 khác PSRAM/flash; ESP32-C6-MINI-1 gọn hơn WROOM-1.

Naming chip gốc kiểu `ESP32-D0WD-V3`:

- **D/U/S**: Dual / (lịch sử U) / Single core
- **0**: không flash trong chip
- **WD**: Wi-Fi + Bluetooth dual mode
- **R2 / H**: PSRAM hoặc dải nhiệt độ
- **V3**: revision silicon

## 5. Chọn theo nhu cầu

- Mới học / Arduino / ESP-NOW / loa BT Classic → **ESP32 gốc**.
- Camera, TinyML, màn hình, USB → **S3**.
- Cảm biến pin, giá rẻ, Wi-Fi + BLE → **C3**.
- Nhà thông minh Matter, Thread, Zigbee + vẫn cần Wi-Fi → **C6**.
- Node mesh chỉ Zigbee/Thread, không Wi-Fi → **H2**.
- Môi trường 2.4 GHz nhiễu, cần 5 GHz → **C5**.
- Màn hình MIPI, encode video, gateway có radio rời → **P4**.
- Cần Classic BT trên chip mới + Wi-Fi 6 + 802.15.4 → chờ/đánh giá **S31**.

Cùng một SoC, board dev có thể khác nhau rất nhiều về chân GPIO “thật dùng được”, ổn áp, LED thừa làm tăng dòng sleep. Datasheet chip không thay được schematic board.

## 6. Ghi chú thực tế khi làm việc

- ESP-IDF và Arduino-ESP32 hỗ trợ gần như cả họ; version IDF tối thiểu khác nhau (C6/H2/P4 cần IDF mới hơn S3).
- Code GPIO/ADC/I2S không copy nguyên giữa series: số kênh, có/không DAC, USB stack khác nhau.
- “ESP32” trên Shopee thường là WROOM-32 gốc hoặc clone; đọc rõ S3/C3/C6 trên silkscreen và chip marking.

Họ ESP32 không còn một chip đa năng duy nhất. Phân loại đúng series trước, rồi mới chọn flash/PSRAM và form module — đó là cách tránh mua nhầm và thiết kế lại phần RF/nguồn sau này.
