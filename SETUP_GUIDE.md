# Finoxyra — Complete Fresh Setup

This is the entire project, cleanly organized in one place. Backend (Spring Boot, with
Auth already fully wired in — no separate merging needed this time) and frontend
(React, with Login/Register/Income/Expenses/Goals) both included.

## ⚠️ Before you delete anything — protect your GitHub connection

Your `C:\Finoxyra` folder has a hidden `.git` folder that connects it to your GitHub
repo (`Dhanya13005/finoxyra-finance`) and remembers your commit history. If you delete
that along with everything else, you'd need to reconnect Git from scratch.

**Recommended: delete everything EXCEPT the `.git` folder.**

## Step 1 — Wipe the old contents (keep `.git`)

Open a terminal:

```
cd C:\Finoxyra
dir /a
```

This shows all folders including hidden ones — confirm `.git` is there. Then delete
everything else:

```
rmdir /s /q backend
rmdir /s /q frontend
rmdir /s /q database
rmdir /s /q docs
rmdir /s /q finoxyra-auth-module
del package-lock.json
```

(If any of these don't exist, Windows will just say "cannot find the file" — ignore
those, it just means that item wasn't there.)

Confirm `C:\Finoxyra` is now empty except `.git`:
```
dir
```

## Step 2 — Unzip this package

Unzip `FINOXYRA-FRESH.zip` somewhere temporary (like your Desktop). Inside, you'll find:
```
FINOXYRA-FRESH/
├── backend/
│   └── finoxyra-backend/
├── frontend/
├── database/
└── docs/
```

## Step 3 — Copy everything into `C:\Finoxyra`

Copy the **contents** of `FINOXYRA-FRESH` (the `backend`, `frontend`, `database`, `docs`
folders) directly into `C:\Finoxyra` — not the `FINOXYRA-FRESH` folder itself, just what's
inside it.

End result:
```
C:\Finoxyra\
├── .git\              (untouched, your GitHub connection)
├── backend\
│   └── finoxyra-backend\
├── frontend\
├── database\
└── docs\
```

## Step 4 — Set your MySQL password

Open `backend\finoxyra-backend\src\main\resources\application.properties` and replace:
```properties
spring.datasource.password=your_mysql_password_here
```
with your real password.

## Step 5 — Open in VS Code and run the backend

1. Open the `C:\Finoxyra` folder in VS Code
2. Open `backend/finoxyra-backend/src/main/java/com/finoxyra/FinoxyraBackendApplication.java`
3. Click ▶ Run above `main`
4. Wait for `Started FinoxyraBackendApplication`

Test in Postman:
```
POST http://localhost:8081/api/auth/register
```
Body → raw → JSON:
```json
{
  "fullName": "Aditya Rao",
  "email": "aditya@test.com",
  "password": "password123"
}
```
Expected: `200 OK` with a `token` in the response.

## Step 6 — Run the frontend

```
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173`, register a (mock, local) account, and try adding income,
expenses, and a goal.

## Step 7 — Push this clean version to GitHub

```
cd C:\Finoxyra
git add .
git commit -m "Reorganize project into clean, complete structure"
git push origin main
```

## What's included and confirmed working

- **Backend**: User entity, health check, and the full Auth module (register/login with
  JWT + BCrypt) — this exact code already ran successfully on your machine before; it's
  just properly organized now instead of split across separate zips
- **Frontend**: Landing page, Login, Register, Dashboard Overview, Income tracking,
  Expense tracking (Household/Food/Health/Entertainment/Children's Education/Travel/Other),
  and Goals with a monthly-savings calculator — currently using mock/local data, not yet
  connected to the backend

## Next step once this is running cleanly

We'll build the backend **Income, Expense, and Goal modules** (entities, repositories,
controllers) to match what the frontend already sends, then connect `FinanceContext.jsx`
in the frontend to real API calls instead of localStorage.
