# Happy 8/3 — Hiền ơi 🌸

Web tương tác dễ thương tặng Hiền nhân dịp 8/3 · Ngày Quốc tế Phụ nữ 💕

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
│   ├── LandingScene    # Màn hình chào + countdown sinh nhật
│   ├── GiftScene       # Hộp quà + flip cards
│   ├── GardenScene     # Trồng hoa tương tác
│   └── LetterScene     # Phong bì + thư tình
└── ...
```

## Tính năng
- 🌸 Mưa hoa rơi liên tục (PetalRain)
- 🎁 Hộp quà có hiệu ứng lắc và mở
- 🃏 Flip cards với lời chúc
- 🌷 Trồng hoa tương tác (click vào vườn)
- 💌 Phong bì mở ra lá thư
- 💕 Nút tim gửi yêu thương
- 🎂 Đếm ngược đến sinh nhật 4/7
