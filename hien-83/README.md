# Chúc mừng Ngày Phụ Nữ Việt Nam 20/10 — Hiền ơi 🌸

Web tương tác dễ thương tặng Hiền nhân dịp 20/10 · Ngày Phụ Nữ Việt Nam 💕

## Cài đặt & Chạy

### Yêu cầu
- Node.js 18+ (tải tại https://nodejs.org)

### Các bước

```bash
# 1. Vào thư mục project
cd hien-83

# 2. Cài dependencies
npm install

# 3. Chạy development server
npm run dev
```

Mở trình duyệt tại **http://localhost:3000** 🎉

### Build tĩnh (để deploy)

```bash
npm run build
# Kết quả trong thư mục /out
```

## Cấu trúc

```
hien-83/
├── app/
│   ├── layout.tsx      # Layout chính + font
│   ├── page.tsx        # Điều hướng giữa các scene
│   └── globals.css     # CSS toàn cục + animations
├── components/
│   ├── PetalRain.tsx   # Mưa hoa rơi liên tục
│   ├── LandingScene    # Màn hình chào mừng 20/10
│   ├── GiftScene       # Hộp quà + flip cards
│   ├── GardenScene     # Trồng hoa tương tác với preview con trỏ
│   └── LetterScene     # Phong bì + thư tình
└── ...
```

## Tính năng
- 🌸 Mưa hoa rơi liên tục (PetalRain)
- 🎁 Hộp quà có hiệu ứng lắc và mở
- 🃏 Flip cards với lời chúc ngọt ngào
- 🌷 Trồng hoa tương tác với con trỏ preview bông hoa sắp trồng
- 💌 Phong bì mở ra lá thư yêu thương
- 💕 Nút tim gửi yêu thương
- 💐 Chúc mừng Ngày Phụ Nữ Việt Nam 20/10
