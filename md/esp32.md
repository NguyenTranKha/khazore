---
title: ESP32
date: 2026-09-29
category: Ghi chép
excerpt: ESP32 ban đầu chỉ là một SoC Wi-Fi kèm Bluetooth ra mắt năm 2016
cover: clay
image: img/esp32.jpg
alt: ESP32
readingMinutes: 5
draft: false
---

ESP32 ban đầu chỉ là một SoC Wi-Fi kèm Bluetooth ra mắt năm 2016. Đến 2026 cái tên đó đã thành cả một họ chip: khác kiến trúc CPU, khác radio, khác mức tiêu thụ, khác mục tiêu sản phẩm. Chọn sai dòng dễ thiếu Bluetooth Classic, thiếu USB, thiếu Thread hay Zigbee, hoặc ngược lại dư công suất và giá.

Cách phân loại thực tế nhất là theo series của Espressif, rồi mới xét chip cụ thể và module như WROOM, MINI, WROVER. Họ chip chia thành vài nhánh. ESP32 gốc là thế hệ đầu, nhân Xtensa LX6, đa năng, còn Bluetooth Classic và Ethernet MAC. Series S nghiêng hiệu năng, USB và AI, nhân Xtensa LX7. Series C lấy giá và kết nối làm trọng tâm, chuyển sang RISC-V, thay ESP8266 rồi tiến tới Wi-Fi 6 và Matter. Series H bỏ Wi-Fi, giữ BLE cùng IEEE 802.15.4 cho endpoint Zigbee, Thread, Matter. Series P là MCU mạnh cho HMI, màn hình và video, thường không tích hợp Wi-Fi. Espressif đang chuyển dần sang RISC-V. Xtensa còn ở ESP32 gốc, S2 và S3; hầu hết chip mới như C3, C5, C6, H2, P4, S31 dùng RISC-V.

- ESP32 gốc dùng dual-core Xtensa LX6 tối đa 240 MHz, khoảng 520 KB SRAM, Wi-Fi 4 băng 2.4 GHz, Bluetooth Classic 4.2 và BLE. Có Ethernet MAC (cần PHY ngoài), DAC 8-bit, cảm biến touch, và nhiều tài liệu nhất. Vẫn hợp nếu cần A2DP, SPP, Ethernet sẵn, hoặc port code cũ. Hạn chế là không có USB native, Wi-Fi chỉ 802.11n 2.4 GHz, không có lệnh vector như S3.

- ESP32-S2 là single-core Xtensa LX7 240 MHz, khoảng 320 KB SRAM, GPIO nhiều khoảng 43 chân. Chỉ có Wi-Fi 4, không Bluetooth. Có USB OTG native, DAC và bảo mật tốt, hợp gadget USB hoặc thiết bị chỉ cần Wi-Fi. Nhiều module MINI-1 cũ đã NRND; MINI-2 và SOLO-2 vẫn còn dùng.

- ESP32-S3 là dual-core Xtensa LX7 240 MHz, 512 KB SRAM, khoảng 45 GPIO. Có Wi-Fi 4, BLE 5, USB OTG, camera DVP, LCD RGB và lệnh vector cho TinyML. Từ 2021 đến 2026 nó là lựa chọn phổ biến cho camera, giọng nói, GUI nhẹ và PSRAM octal. Không có Bluetooth Classic, không Zigbee hay Thread, Wi-Fi vẫn là Wi-Fi 4.

- ESP32-C2, còn gọi ESP8684, là RISC-V một nhân khoảng 120 MHz, SRAM nhỏ, GPIO ít khoảng 14 chân, Wi-Fi 4 và BLE 5, giá thấp nhất. Hợp node đơn giản và sản xuất số lượng lớn, thay ESP8266. ESP32-C3 mạnh hơn một bậc: RISC-V 160 MHz, khoảng 400 KB SRAM, 16 đến 22 GPIO, Wi-Fi 4, BLE 5, USB Serial/JTAG, tiêu thụ thấp. Đây là workhorse cho cảm biến pin, MQTT và các bài IoT vừa phải.

- ESP32-C6 có nhân RISC-V hiệu năng 160 MHz kèm lõi siêu thấp công suất, Wi-Fi 6 2.4 GHz, BLE 5.3 và IEEE 802.15.4 cho Zigbee cùng Thread. Đây là chip Matter phổ biến vì vừa giữ Wi-Fi vừa vào được mesh. ESP32-C5 thêm Wi-Fi 6 dual-band 2.4 và 5 GHz, BLE và 802.15.4, hợp khi băng 2.4 GHz quá đông. ESP32-C61 cũng Wi-Fi 6 2.4 GHz và BLE nhưng bỏ 802.15.4, bản gọn hơn C6.

- ESP32-H2 chạy RISC-V khoảng 96 MHz, không Wi-Fi, chỉ BLE và 802.15.4. Hợp endpoint pin cúc áo, bóng đèn Zigbee hay Thread, Matter over Thread. H4 hướng BLE mới hơn với LE Audio và direction finding, ít gặp hơn H2.

- ESP32-P4 là dual-core RISC-V tới khoảng 400 MHz, SRAM lớn khoảng 768 KB, PSRAM trong gói 16 hoặc 32 MB. Có MIPI DSI/CSI, JPEG, xử lý ảnh video, USB 2.0 High-Speed và Ethernet. Không tích hợp Wi-Fi hay Bluetooth nên thường ghép C6 hoặc H2 làm radio. Hợp HMI công nghiệp, gateway, multimedia.

- ESP32-S31 không phải bản vá của S3. Nó là dual-core RISC-V khoảng 320 MHz, Wi-Fi 6, BLE 5.4 kèm Bluetooth Classic, 802.15.4, USB High-Speed, Ethernet Gigabit, GPIO khoảng 60 chân, thêm tăng tốc multimedia và AI. Hợp gateway đa giao thức. Bài toán giá vẫn nên ở lại S3.

Chip SoC khác module đã đóng RF và flash. WROOM là module chuẩn, anten PCB, flash 4 đến 16 MB. WROVER thêm PSRAM thường 8 MB, board dài hơn, hợp camera và buffer lớn. MINI nhỏ, flash hoặc PSRAM trong gói, ít chân hơn. PICO hay SiP nhét dao động và flash, đôi khi cả PSRAM, vào một gói. Hậu tố U đổi anten PCB sang connector U.FL. Số sau tên như WROOM-1 và WROOM-2 chỉ khác dung lượng flash hoặc PSRAM. Ví dụ ESP32-S3-WROOM-1 khác WROOM-2 ở PSRAM và flash; ESP32-C6-MINI-1 gọn hơn WROOM-1.

Tên chip gốc kiểu ESP32-D0WD-V3 đọc được: D, U hoặc S là dual hay single core; số 0 nghĩa là không có flash trong chip; WD là Wi-Fi kèm Bluetooth dual mode; R2 hoặc H chỉ PSRAM hoặc dải nhiệt độ; V3 là revision silicon.

Mới học, Arduino, ESP-NOW hoặc loa Bluetooth Classic thì lấy ESP32 gốc. Camera, TinyML, màn hình, USB thì S3. Cảm biến pin, giá rẻ, chỉ cần Wi-Fi và BLE thì C3. Nhà thông minh Matter, Thread, Zigbee mà vẫn cần Wi-Fi thì C6. Node mesh chỉ Zigbee hoặc Thread, không Wi-Fi thì H2. Môi trường 2.4 GHz nhiễu, cần 5 GHz thì C5. Màn hình MIPI, encode video, gateway có radio rời thì P4. Cần Classic Bluetooth trên silicon mới kèm Wi-Fi 6 và 802.15.4 thì xem S31.

Cùng một SoC, board dev vẫn khác nhau nhiều về số GPIO thật dùng được, ổn áp, LED thừa làm tăng dòng sleep. Datasheet chip không thay schematic board. ESP-IDF và Arduino-ESP32 hỗ trợ gần như cả họ, nhưng phiên bản IDF tối thiểu khác nhau: C6, H2, P4 cần bản mới hơn S3. Code GPIO, ADC, I2S không copy nguyên giữa series vì số kênh, DAC và USB stack khác nhau. Chữ “ESP32” trên Shopee thường là WROOM-32 gốc hoặc clone; nên đọc silkscreen và marking chip xem là S3, C3 hay C6.

Họ ESP32 không còn một chip đa năng duy nhất. Phân loại đúng series trước, rồi mới chọn flash, PSRAM và form module, tránh mua nhầm rồi phải thiết kế lại RF và nguồn.
