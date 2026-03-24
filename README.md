# 🏠 Hostel Management

**MERN-ish chaos, now with Vite** — Express + MongoDB in the back, React + Redux up front. No Next.js; we’re not that fancy. Yet.

---

## 🚀 Run this thing (3 steps, you’ve got this)

1. **Feed the machine**  
   ```bash
   npm install && npm install --prefix frontend
   ```

2. **Summon Mongo** 🍃  
   Have MongoDB running somewhere. If it’s not up, the API will ghost you harder than a bad roommate.

3. **Whisper secrets** (repo root, `.env`)  
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/your_db_name
   JWT_SECRET=make_it_long_and_random_no_password123_pls
   ```

4. **Hit go** 🎬  
   ```bash
   npm run dev
   ```
   - UI: [http://localhost:3000](http://localhost:3000)  
   - API: [http://localhost:5000](http://localhost:5000) (dev says “API is running” — it’s shy, not broken)

**Production build** (when you’re showing off):  
`npm run build --prefix frontend` then `NODE_ENV=production npm start`

---

## ✨ What it does (feature buffet)

| | |
|---|---|
| 🔐 | Register / login (navbar stays minimal until you’re in — we’re not nosy) |
| 👤 | Student CRUD + details |
| 📍 | Update student whereabouts |
| ✅ | Daily attendance |
| 📊 | Analysis views |
| 📥 | CSV export for attendance |
| 🗑️ | Nuke old attendance by “last N days” |
| 👑 | Admin: user list + toggle admin status |

---

## 🤝 Contributing

PRs welcome. Big ideas? Open an issue first so we can panic together constructively.

Tests: `npm test --prefix frontend` (Vitest; add tests if you’re feeling brave).
