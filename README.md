# 🐾 AniCure – Animal Rescue & Care Platform

A **production-ready**, full-stack web application for real-time animal rescue, adoption, and NGO coordination.

---

## 🏗️ Project Structure

```
AniCure/
├── backend/                      # Node.js + Express API
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # JWT auth logic
│   │   ├── reportController.js   # Animal reports + geo-notifications
│   │   ├── adoptionController.js # Adoption listings & requests
│   │   ├── donationController.js # Stripe payment integration
│   │   ├── userController.js     # User/NGO dashboards + notifications
│   │   └── ngoController.js      # NGO profiles & location
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verify + role-based access
│   │   ├── uploadMiddleware.js   # Multer image upload handler
│   │   └── errorMiddleware.js   # Global error handler + validation
│   ├── models/
│   │   ├── User.js               # User schema (user/ngo/vet/shelter)
│   │   ├── Report.js             # Animal report schema + geo-index
│   │   ├── Adoption.js           # Adoption listing schema
│   │   ├── Donation.js           # Donation + Stripe schema
│   │   └── Notification.js      # Real-time notification schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── reportRoutes.js
│   │   ├── adoptionRoutes.js
│   │   ├── donationRoutes.js
│   │   ├── userRoutes.js
│   │   └── ngoRoutes.js
│   ├── uploads/
│   │   └── reports/              # Uploaded animal photos
│   ├── .env                      # Environment variables
│   ├── .env.example
│   ├── package.json
│   └── server.js                 # Express + Socket.io entry point
│
└── frontend/                     # Vanilla HTML/CSS/JS
    ├── assets/
    │   ├── css/
    │   │   └── style.css         # Complete design system
    │   └── js/
    │       └── app.js            # API helpers, auth, toasts, utils
    ├── pages/
    │   ├── auth.html             # Login / Register
    │   ├── report-form.html      # Submit animal report
    │   ├── reports.html          # Browse all reports
    │   ├── dashboard.html        # User dashboard
    │   ├── ngo-dashboard.html    # NGO/Vet dashboard
    │   ├── adoption.html         # Adoption listings
    │   ├── donate.html           # Donation + Stripe
    │   └── ngos.html             # NGO directory
    └── index.html                # Home page
```

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB + Mongoose |
| **Authentication** | JWT (JSON Web Tokens) |
| **Real-time** | Socket.io (WebSockets) |
| **File Upload** | Multer |
| **Payments** | Stripe |
| **Maps** | Google Maps JS API |
| **Frontend** | HTML5 + Vanilla CSS + Vanilla JS |
| **CSS Framework** | Custom Design System (dark green theme) |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ and npm
- [MongoDB](https://www.mongodb.com/try/download/community) running locally OR a MongoDB Atlas connection string

### 1. Install Node.js (if not already)
Download and install from: https://nodejs.org/en/download

### 2. Clone and Install Backend Dependencies
```bash
cd e:\AniCure\backend
npm install
```

### 3. Configure Environment Variables
Edit `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/anicure
JWT_SECRET=your_strong_secret_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_key_here
CLIENT_URL=http://127.0.0.1:5500/frontend
```

### 4. Start the Backend Server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```
Server starts at: `http://localhost:5000`

### 5. Open the Frontend
Simply open `e:\AniCure\frontend\index.html` in your browser.

> **Tip:** Use VS Code's **Live Server** extension to serve the frontend at `http://127.0.0.1:5500` for CORS to work correctly.

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login + get JWT |
| GET | `/api/auth/me` | Get current user profile |
| PUT | `/api/auth/update-profile` | Update profile |

### Reports
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/reports` | Get all reports (filters) | Public |
| GET | `/api/reports/stats` | Get rescue statistics | Public |
| GET | `/api/reports/my-reports` | Get user's own reports | User |
| GET | `/api/reports/nearby?lat=&lng=&radius=` | Get reports near NGO | NGO |
| POST | `/api/reports` | Submit animal report + images | User |
| PUT | `/api/reports/:id/status` | Update report status | NGO |

### Adoption
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/adoption` | Get all adoption listings |
| GET | `/api/adoption/:id` | Get single listing |
| POST | `/api/adoption` | Create listing (NGO only) |
| POST | `/api/adoption/:id/request` | Request adoption |
| PUT | `/api/adoption/:id/request/:reqId` | Approve/reject request |

### Donations
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/donations/ngos` | List NGOs accepting donations |
| POST | `/api/donations/create-checkout-session` | Create Stripe session |
| POST | `/api/donations/confirm` | Confirm payment |
| GET | `/api/donations/my-donations` | User's donation history |

### Users & Notifications
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users/dashboard` | User dashboard data |
| GET | `/api/users/ngo-dashboard` | NGO dashboard data |
| GET | `/api/users/notifications` | Get notifications |
| PUT | `/api/users/notifications/read` | Mark all as read |

### NGOs
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/ngos` | List all NGOs/Vets/Shelters |
| GET | `/api/ngos?lat=&lng=&radius=` | Find nearby NGOs |
| GET | `/api/ngos/:id` | Get NGO profile |
| PUT | `/api/ngos/location` | Update NGO location |

---

## 🗺️ Google Maps Integration

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable **Maps JavaScript API** and **Geocoding API**
3. Create an API key
4. In `report-form.html`, uncomment and update:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY"></script>
```

---

## 💳 Stripe Setup

1. Create account at [stripe.com](https://stripe.com)
2. Get your **Secret Key** from Dashboard → Developers → API Keys
3. Add to `backend/.env`:
```env
STRIPE_SECRET_KEY=sk_test_...
```
4. The frontend automatically redirects to Stripe Checkout for payments

---

## 🔐 User Roles

| Role | Access |
|---|---|
| `user` | Submit reports, track status, adopt animals, donate |
| `ngo` | Accept cases, update status, post adoption listings, receive donations |
| `vet` | Same as NGO |
| `shelter` | Same as NGO |
| `admin` | Full access |

---

## 🎁 Reward System

- **+50 points** – Submit a valid report
- **+100 points** – Animal from your report gets rescued  
- **+25 points** – Report with complete photos

**Rank Milestones:**
- 🌱 Sprout (0-99)
- 🌿 Helper (100-499)
- 🦅 Rescuer (500-999)
- ⭐ Animal Hero (1000-4999)
- 👑 Guardian Angel (5000+)

---

## 📡 Real-time Notifications (Socket.io)

When a report is submitted:
1. Server finds all NGOs/Vets within **50km** using MongoDB geo-query
2. Creates notification records in DB
3. Emits `notification` event via Socket.io to each NGO's room

To enable in frontend, uncomment Socket.io code in dashboards and add CDN:
```html
<script src="https://cdn.socket.io/4.7.4/socket.io.min.js"></script>
```

---

## 🐛 Demo Mode

The frontend works in **demo mode** without the backend running:
- All pages show realistic sample data
- Auth forms show error from API but interface stays functional
- Useful for UI review and presentations

---

## 📦 Production Deployment

### Backend (Railway / Render / Heroku)
1. Set all environment variables in your host
2. Use MongoDB Atlas for the database
3. `npm start`

### Frontend (Netlify / Vercel / GitHub Pages)
1. Update `API_URL` in `frontend/assets/js/app.js` to your deployed backend URL
2. Deploy the `frontend/` folder

---

## 🤝 Contributing

Built with ❤️ for animals everywhere. Every life deserves a second chance. 🐾
