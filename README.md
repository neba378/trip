# SAVANNA Ethiopia Travel - Full Stack System

A robust, production-ready travel booking system with a dedicated Node.js backend and React frontend.

## Features
- **Persistent Storage**: All bookings are stored in a SQLite database (SQL-based persistence).
- **Payment Verification**: Users can upload payment screenshots during booking.
- **Admin Dashboard**: Verification and management of bookings with real-time status updates.
- **Bilingual Support**: Fully localized in English and Amharic.
- **Automated Workflows**: Ready for email integration (Nodemailer ready).

## Architecture
- **Frontend**: React + Vite + Tailwind CSS + Lucide Icons.
- **Backend**: Node.js + Express.js + Sequelize (SQLite).
- **Storage**: Local SQLite database (`server/database.sqlite`) and local file storage for uploads.

## Project Structure
```text
savanna-ethiopia-travel/
├── server/                 # Backend API
│   ├── config/             # DB connection
│   ├── controllers/        # Business logic
│   ├── models/             # Database schemas
│   ├── routes/             # API endpoints
│   ├── uploads/            # Payment screenshots
│   └── index.js            # Server entry point
├── src/                    # Frontend React code
│   ├── components/
│   ├── context/            # Global state (BookingContext)
│   ├── pages/
│   └── data/               # Static trip data
└── package.json            # Root configuration
```

## Getting Started

### Installation
```bash
npm install
cd server && npm install
```

### Running the System
From the root directory:
```bash
npm run dev
```
- Frontend: `http://localhost:5174`
- Backend: `http://localhost:5000`

## Admin Panel
- **URL**: `/admin`
- **Login**: individual admin accounts (email + password). The first admin is
  seeded from `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `server/.env` on first run.
  Log in, then add or disable other admins from the **Admins** tab in the panel.
- Passwords are bcrypt-hashed; access is enforced server-side with role-checked JWTs.
