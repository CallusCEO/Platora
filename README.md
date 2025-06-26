# 🧭 Platora Game Roadmap

This is a full, **step-by-step and explicit** development roadmap for the multiplayer real-time market simulation game **Platora**. It uses Supabase (with no real authentication), Next.js, Tailwind & CSS, and React Context (`gameContext.tsx`).

---

## ✅ Core Principles

-   No real user accounts: all player data is tied to `userName` and `gameId`
-   Game sessions are temporary (30min–2h), created dynamically
-   Each game has:

    -   A home page to choose name
    -   A lobby to prep (location, strengths/weaknesses)
    -   A game phase (quarterly ticks, actions, events, etc.)

---

## 🏗️ PHASE 1 – Core Setup

### Supabase Setup

[x] Create project in Supabase
[x] Set up the following tables with required columns:

-   `games`: stores game sessions
-   `players`: one row per user in a game (linked by `game_id` and `name`)
-   `companies`: linked to player
-   `quarters`: quarterly stats per company
-   `events`: global or sector risks per game
-   `trades`: player-to-player trades
-   `actions`: actions (e.g., marketing) performed by players
-   `alliances`: many-to-many player alliances
-   `customers`: generated customer segments per game/sector

[x] Use `int8` for wealth and money-related values

[x] Enable Realtime on needed tables (`players`, `companies`, `quarters`, `events`, `trades`, `actions`, `alliances`)

[x] Enable RLS, but create policies like `USING (true)` for dev and guests

### Codebase Hygiene

[x] Organize your repo as a Next.js App Router project with `/app/` folder structure
[x] Add Tailwind, shadcn/ui, react-map-gl (or react-simple-maps), and Supabase client setup
[x] Add your custom `supabaseClient.ts` in `lib/`

### Game Context

[x] Implement `gameContext.tsx` to store and sync:

-   `player`, `company`, `gameId`, `userName`, `start`, `gameMode`, etc.
-   [x] Remove all use of `auth.getUser()`
-   [x] Fetch `player` by `name + gameId` (not user_id)
-   [x] Auto-fetch company once player is known

---

## 🏠 PHASE 2 – Home Page (`/`)

[x] Build home screen:

-   Input field for choosing `userName`
-   Dropdown or input for `gameId` (or create new one)
-   Button to "Join Game" or "Create Game"

[x] On click:

-   Set `gameId` and `userName` into context
-   Check if player exists in Supabase → if not, insert it into `players`

---

## 🛋️ PHASE 3 – Lobby Page (`/lobby`)

[ ] Timer countdown (1min30s prep phase)
[ ] Show all players in same `gameId` from `players` table (live sync)
[ ] Player selects:

-   HQ location on map (clickable)
-   Strengths and weaknesses (custom UI)

[ ] Save choices to `players` table (update)
[ ] Lock player inputs when timer ends
[ ] Move to game phase

---

## 🗺️ PHASE 4 – World Map

[ ] Use `react-map-gl` with minimal country shapes only
[ ] Show players’ HQs on map
[ ] Allow interactive selection (onClick → select country)
[ ] Optionally use `geoJSON` metadata from Supabase for country shapes

---

## 🤖 PHASE 5 – Company Creation & AI Evaluation

[ ] When player clicks on map → open CreateCompany modal
[ ] Input for description, sector, and products
[ ] Call `/api/describeCompany` endpoint

-   Use Gemini 2.0 Flash Lite to return `successChance`, `risk`, `marketFit`

[ ] Show returned stats in modal
[ ] On confirm → insert company to `companies` table and link to player

---

## 📊 PHASE 6 – Game Logic & Ticking Engine

[ ] Create a Supabase function or external cron worker that triggers every 5, 10, or 15 min based on game setting
[ ] For each company:

-   Read player stats + sector
-   Generate revenue, expenses, profit using demand algorithm
-   Insert new row in `quarters` table

[ ] Notify players via Realtime
[ ] Frontend listens and updates metrics in real-time

---

## 🔥 PHASE 7 – Events & Hazards

[ ] Use `events` table to store disasters, crashes, etc.
[ ] Display active events in game UI
[ ] Apply their effects during revenue calculations

---

## 💬 PHASE 8 – Trade, Actions & Alliances

[ ] Implement `trades` table:

-   Simple JSON offer system → sender, receiver, amount, product, etc.
    [ ] Build UI to show trades and accept/reject.

[ ] Implement `actions` table:

-   Allow players to run marketing, hire, etc.
-   Custom modal → save action to DB

[ ] Implement `alliances`:

-   Join table `alliances` with playerA, playerB
-   Limit number of allies

---

## 👥 PHASE 9 – Customer Engine

[ ] Create lightweight demand generator (based on PRNG or sector modifiers)
[ ] Populate `customers` table with demand per sector each quarter
[ ] Revenue = sum of (price × demand × noise × hazard)

---

## 🎨 PHASE 10 – UI Polish & Testing

[ ] Add KPIs charts (`recharts`) for company performance
[ ] Use toast notifications for events
[ ] Add loading spinners, feedback

---

## 🚀 PHASE 11 – Deployment

[ ] Host front-end on Vercel
[ ] Use Supabase Edge Functions or external cron to tick the game
[ ] Load-test with 10–20 players (Artillery, k6)
[ ] Monitor Supabase usage.
