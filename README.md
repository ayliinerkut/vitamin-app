<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


# 🌿 VitaSearch — Vitamin Recommendation App

Semptomlara, besinlere veya vitamin adına göre kişiselleştirilmiş vitamin önerileri sunan modern bir web uygulaması.

## 🚀 Live Demo

👉 **[vitasearch.onrender.com](https://vitamin-app-1.onrender.com)**

> ⚠️ Ücretsiz Render planı kullanıldığından backend 15 dakika işlem görmezse uyku moduna girer. İlk istek **30-50 saniye** sürebilir.

---

## 📸 Özellikler

- 🔍 Semptom, besin veya vitamin adıyla arama
- 💊 Vitamin faydaları, eksiklik belirtileri ve zengin besinler
- ⚡ Hızlı keyword tabanlı eşleştirme
- 📱 Responsive tasarım
- 🌐 Frontend + Backend tam entegrasyon

---

## 🛠️ Teknolojiler

| Katman | Teknoloji |
|--------|-----------|
| Frontend | HTML, CSS, JavaScript |
| Backend | NestJS (Node.js + TypeScript) |
| Deploy | Render (Static Site + Web Service) |

---

## 📡 API Kullanımı

**Base URL:** `https://vitamin-app.onrender.com`

### Vitamin Önerisi Al
```
GET /recommend?q={sorgu}
```

**Örnek İstekler:**
```
GET /recommend?q=vitamin+c
GET /recommend?q=eye+fatigue
GET /recommend?q=bone
GET /recommend?q=immune
```

**Örnek Yanıt:**
```json
{
  "input": "vitamin c",
  "vitamins": [
    {
      "name": "Vitamin C",
      "benefits": "A powerful antioxidant that boosts the immune system...",
      "foods": ["orange", "strawberry", "lemon", "kiwi"],
      "deficiency": "Scurvy, poor wound healing, weakened immunity..."
    }
  ]
}
```

---

## 📁 Proje Yapısı
```
vitamin-app/
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
└── backend/
    ├── src/
    │   ├── recommend/
    │   │   ├── recommend.controller.ts
    │   │   ├── recommend.service.ts
    │   │   └── vitamin.interface.ts
    │   ├── app.module.ts
    │   └── main.ts
    └── package.json
```

---

## 🏃 Lokalde Çalıştırma

### Backend
```bash
cd backend
npm install
npm run start
```

Backend `http://localhost:3001` adresinde çalışır.

### Frontend
```bash
cd frontend
# Herhangi bir statik sunucu ile aç
# Örneğin VS Code Live Server ile index.html'i aç
```

---

## 👩‍💻 Geliştirici

**Aylin Erkut**  
[GitHub](https://github.com/ayliinerkut)
