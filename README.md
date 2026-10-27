<div align="center">

# 🐛 Gamified Bug Tracker

**Bug tracking that turns fixing bugs into a game — XP, levels, badges & leaderboards**

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)

**[🎮 Demo Flow](#-how-to-use-demo-flow)** · **[🎮 Features](#-features)** · **[🛠️ Run Locally](#-running-locally)**

</div>

---

## 📸 Screenshots

<div align="center">

### 🎯 Main Dashboard
<img src="https://i.imgur.com/W4nBE1A.png" width="800" alt="Bug Tracker Dashboard">

### 🏆 XP Progression & Levels
<img src="https://i.imgur.com/SJ1pSPi.png" width="800" alt="XP and Level System">

### 📊 Competitive Leaderboard
<img src="https://i.imgur.com/vFcpoMF.png" width="800" alt="User Leaderboard">

### ✅ Closing a Bug & Earning XP
<img src="https://i.imgur.com/ofwBIeS.png" width="800" alt="Closing a Bug Flow">

</div>

---

## 🎯 What It Does

A full-stack bug tracking platform for agile teams — **with game mechanics baked in.** Report bugs, assign them to teammates, work through statuses (Open → In Progress → Closed). Every time you close a bug, the system awards XP based on bug severity. Level up, climb the leaderboard, and make bug fixing feel like a team sport instead of a chore.

### Why I Built It

Every dev team uses a bug tracker. Most are boring. This one answers:

> "How do we make fixing the 500th 'button is 2px misaligned' bug feel rewarding?"

Answer: **progression loops that actually reward effort.** Critical bugs = more XP. Fast closing = team recognition on the leaderboard. Turn your Jira ticket slog into a competition people want to win.

---

## 🎮 Features

### 🐛 Core Bug Tracking
- ✅ **Report bugs** — title, description, severity, assignee
- ✅ **Status workflow** — Open → In Progress → Closed (with transitions logged)
- ✅ **Search & filters** — find by status, severity, assignee, text search
- ✅ **Assign to teammates** — individual accountability
- ✅ **Bug detail view** — full history, notes, XP earned on close

### 🏆 Gamification Layer
- ⭐ **XP system** — XP awarded on bug close, scaled by severity (Low/Medium/High/Critical)
- 📈 **Level progression** — XP thresholds per level, level-up toast notifications
- 📊 **Competitive leaderboard** — top users by total XP, weekly resettable
- 🎯 **Visual progress bar** — on every user card, see how far to the next level
- 👤 **Per-user bug history** — every bug closed, every XP gain logged

### 👥 User Profiles
- 👤 Custom profiles with avatar, level badge, XP counter
- 📋 Personal resolved bug history timeline
- 📈 Individual performance stats (bugs closed, avg severity, streaks)

---

## 🏗️ Architecture

```mermaid
flowchart TB
    U[Team Member] -->|Browser| FE[Next.js 15<br/>App Router]
    FE -->|Server Actions + API Routes| API[Next.js Route Handlers<br/>/api/bugs /api/users]
    API -->|Type-safe queries| PRISMA[Prisma Client]
    PRISMA --> DB[(SQLite<br/>/prisma/dev.db)]
    DB -->|Schema| MODELS[Bug · User · BugStatusHistory · LevelConfig]

    subgraph XP Logic
        BUG_CLOSE[Close Bug]
        SEV[Severity lookup]
        XP[XP grant: 10/25/50/100 pts]
        LEVEL[Level threshold check<br/>→ level up if XP crosses]
        BUG_CLOSE --> SEV --> XP --> LEVEL
    end
```

### Engineering Notes
- **Atomic XP + bug close in a Prisma transaction** — you can't close a bug without the XP being written (or vice versa)
- **Prisma schema defines level thresholds** — tune XP curves in `LevelConfig` without touching code
- **Optimistic UI on the frontend** — leaderboard re-renders the moment you close a bug (no reload)
- **App Router + Route Handlers** — modern Next.js 15 patterns, no legacy Pages API

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15 (App Router) · React 19 |
| **Language** | TypeScript 5 (strict mode) |
| **Styling** | Tailwind CSS (utility-first) + responsive |
| **Database** | SQLite (dev) / Postgres-ready (prod via Prisma migrate) |
| **ORM** | Prisma (fully typed queries, schema-first) |
| **Performance** | `useMemo` / `useCallback` for expensive lists, route-level caching |

---

## 🚀 Hosted Demo

A hosted demo is not published yet. To try the app, follow the local setup below and then use the [Demo Flow](#-how-to-use-demo-flow).

---

## ⚙️ Running Locally

### Prerequisites
- Node.js 18+ (20+ recommended)
- npm / yarn / pnpm

### 1. Clone & Install
```bash
git clone https://github.com/asyncisaac/Gamified-Bug-Tracker.git
cd Gamified-Bug-Tracker
npm install
```

### 2. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Create tables (SQLite auto-creates the file)
npx prisma db push

# Seed with sample users + bugs to see the gamification in action
npx prisma db seed
```

### 3. Run Dev Server
```bash
npm run dev
```

Open → **http://localhost:3000**

---

## 📂 Project Structure

```
Gamified-Bug-Tracker/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── bugs/           # CRUD + close/assign route handlers
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   └── users/          # Leaderboard + profile endpoints
│   │   │       ├── route.ts
│   │   │       └── [id]/route.ts
│   │   ├── layout.tsx          # Root layout + Tailwind setup
│   │   └── page.tsx            # Main dashboard
│   ├── components/
│   │   ├── BugCard.tsx         # Bug list card (status, XP, severity)
│   │   ├── LeaderBoard.tsx     # Ranked user list with XP bars
│   │   ├── BugDetailModal.tsx  # Full bug view + close flow
│   │   └── UserLevelBadge.tsx  # Level + progress bar component
│   ├── hooks/
│   │   └── useGamification.ts  # XP / level calculation helpers
│   └── types/
│       ├── Bug.ts              # Bug types + enums
│       └── User.ts             # User + level types
├── prisma/
│   ├── schema.prisma           # Data model
│   └── seed.ts                 # Demo users, demo bugs, level config
└── public/                     # Static assets
```

---

## 🔧 API Endpoints

### Bugs
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/api/bugs` | List all bugs (query: `?status=Open&assigneeId=...`) |
| `POST` | `/api/bugs` | Create a new bug |
| `GET`  | `/api/bugs/[id]` | Single bug detail with full history |
| `PUT`  | `/api/bugs/[id]` | Update bug (title, description, assignee, severity) |
| `DELETE` | `/api/bugs/[id]` | Delete a bug |
| `POST` | `/api/bugs/[id]/close` | 🔥 Close bug → grants XP, checks level-up |

### Users & Leaderboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/api/users` | Leaderboard (sorted by total XP, desc) |
| `POST` | `/api/users` | Create a new user |
| `GET`  | `/api/users/[id]` | User profile + stats + bug history |

---

## 🎮 How to Use (Demo Flow)

1. **Create users** via the UI or use the seed accounts
2. **Report 5–10 bugs** with varying severity (Critical = most XP)
3. **Assign them** to different users
4. **Close bugs one by one** → watch XP pop, levels go up, leaderboard shuffle
5. **Open the leaderboard** → competition begins 😄

---

## 🧪 Testing the XP Curve

| Severity | XP Awarded | Example |
|----------|-----------|---------|
| Low | 10 | Spelling, CSS nitpick |
| Medium | 25 | Broken filter, minor UX |
| High | 50 | Feature broken for subset of users |
| Critical | 100 | Data loss, 500 errors, security |

> Tune these values in `prisma/seed.ts` → `LevelConfig` or directly in the XP helper.

---

## 🚢 Deployment

### Fastest: Vercel + Postgres (Neon / Supabase)

1. Push the repo to GitHub
2. **Import into Vercel** → auto-detects Next.js
3. In Vercel project → Storage → **Create Postgres** (or connect Neon/Supabase)
4. Set environment variable:
   ```
   DATABASE_URL=postgresql://user:pass@host:5432/verceldb
   ```
5. In Build command: add DB bootstrap:
   ```bash
   npx prisma generate && npx prisma db push && npx prisma db seed && next build
   ```
6. Deploy 🎉 → first load seeds the level config + demo users

---

## 🧠 Ideas for Next Version

- [ ] Badge system ("Bug Slayer" after 100 bugs closed, etc.)
- [ ] Team rooms + per-team leaderboards
- [ ] Attach screenshots / files to bugs
- [ ] Comments + @mentions on bugs
- [ ] Slack/Discord webhook on level-up: "Isaac just hit Level 15!" 🎉
- [ ] Weekly XP reset for season-based competition
- [ ] OAuth login (GitHub / Google)

---

<div align="center">

**[⬆ Back to Top](#-gamified-bug-tracker)** · Make bug fixing fun again 🎮

</div>
