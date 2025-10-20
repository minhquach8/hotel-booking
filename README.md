# 🏨 Aurora Cove Hotel — Full-Stack (Node.js + MySQL)

A learning project developed by **Minh Hoang Quach**, evolving from a static HTML/CSS site into a modern **full-stack hotel booking system** using **Node.js**, **Express**, and **MySQL**.  
Built and deployed with a focus on clarity, modularity, and real-world deployment experience.

---

## 🌐 Live Deployment

| Service | URL |
|----------|-----|
| **Frontend (GitHub Pages)** | [https://minhquach8.github.io/hotel-booking/frontend/](https://minhquach8.github.io/hotel-booking/frontend/) |
| **Backend API (Render)** | [https://hotel-booking-bucm.onrender.com/api/health](https://hotel-booking-bucm.onrender.com/api/health) |
| **Database (Railway MySQL)** | Private connection (used by backend) |

---

## 📁 Project Structure

```

hotel-booking/
├── backend/          # Express server + REST APIs (rooms, booking)
│   ├── server.js
│   ├── db.js
│   ├── .env
│   └── data/         # (optional) mock data
└── frontend/         # Static UI: HTML, CSS, JS
│   ├── index.html
│   ├── rooms.html
│   ├── booking.html
│   ├── styles.css
│   ├── booking.js
│   ├── rooms.js
│   ├── config.js
│   └── images/

```

---

## ⚙️ Backend (Express + MySQL)

### Environment Setup

Create a file named **`.env`** inside `backend/` (for local use):

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=hotel_booking
DB_PORT=3306
NODE_ENV=development
```

> Replace credentials with your local MySQL configuration.
> On Render, these values are provided via the Environment Variables panel.

### Installation & Run (Local)

```bash
cd 03-node-mysql/hotel-booking/backend
npm install
npm run dev
```

Server will start at
👉 **[http://localhost:3000](http://localhost:3000)**

---

### Available Endpoints

| Method   | Endpoint       | Description                             |
| :------- | :------------- | :-------------------------------------- |
| **GET**  | `/api/health`  | Returns service status (for monitoring) |
| **GET**  | `/api/rooms`   | Retrieves room list from MySQL          |
| **POST** | `/api/booking` | Creates a new booking record            |

#### Example Request

```bash
POST /api/booking
Content-Type: application/json
```

```json
{
  "full_name": "John Smith",
  "email": "john@example.com",
  "room_slug": "deluxe",
  "checkin": "2025-11-05",
  "checkout": "2025-11-07",
  "notes": "Prefer a high floor."
}
```

#### Example Response

```json
{
  "message": "Booking created successfully.",
  "booking_id": 1
}
```

---

## 🗄️ Database Schema

### 🗂️ Table: `rooms`

| Field         | Type          | Description             |
| :------------ | :------------ | :---------------------- |
| `id`          | INT (PK)      | Auto-increment ID       |
| `name`        | VARCHAR(100)  | Display name            |
| `slug`        | VARCHAR(50)   | URL-friendly identifier |
| `description` | TEXT          | Room details            |
| `amenities`   | JSON          | List of amenities       |
| `price_nzd`   | DECIMAL(10,2) | Price per night         |
| `beds`        | VARCHAR(50)   | Bed info                |
| `occupancy`   | INT           | Default 2               |
| `image`       | VARCHAR(255)  | Image path              |
| `created_at`  | TIMESTAMP     | Auto-generated          |

### 🗂️ Table: `bookings`

| Field        | Type         | Description              |
| :----------- | :----------- | :----------------------- |
| `id`         | INT (PK)     | Auto-increment ID        |
| `full_name`  | VARCHAR(100) | Guest’s name             |
| `email`      | VARCHAR(100) | Guest’s e-mail           |
| `room_slug`  | VARCHAR(50)  | References `rooms.slug`  |
| `checkin`    | DATE         | Check-in date            |
| `checkout`   | DATE         | Check-out date           |
| `notes`      | TEXT         | Optional notes           |
| `created_at` | TIMESTAMP    | Auto-generated on insert |

---

## 🎨 Frontend (GitHub Pages)

The **frontend** is a modern static site hosted separately on **GitHub Pages**,
while the **backend API** is deployed on **Render**.
During local development, Express can serve the same frontend for convenience.

### Pages

| File           | Description                                             |
| :------------- | :------------------------------------------------------ |
| `index.html`   | Landing page with hero section                          |
| `rooms.html`   | Dynamic room listings and rates                         |
| `booking.html` | Booking form connected to the API                       |
| `styles.css`   | Unified design system                                   |
| `booking.js`   | Handles booking form submission using Fetch API         |
| `rooms.js`     | Renders room data dynamically from `/api/rooms`         |
| `config.js`    | Defines the `window.API_BASE` global used for API calls |

### Booking Flow

1. User fills in form on **`booking.html`**.
2. `booking.js` validates inputs and sends a POST request → `/api/booking`.
3. Backend inserts the record into MySQL → returns a booking ID.
4. User receives a confirmation message (Reference ID shown).

> The file `frontend/config.js` defines the global `window.API_BASE`,
> pointing to the deployed Render backend (e.g. `https://hotel-booking-bucm.onrender.com`).
> All Fetch requests use this base to communicate with the API.

---

## 🧠 Key Technologies

* **Node.js** + **Express** for backend server
* **MySQL** (via `mysql2/promise`)
* **dotenv** for environment configuration
* **HTML5 / CSS3 / JavaScript (ES6)** for frontend
* **Fetch API** for AJAX communication
* **CORS** enabled for GitHub Pages origin
* **Render** for backend hosting
* **GitHub Pages** for frontend hosting
* **Railway** for MySQL database hosting

---

## 🚀 Run the Full Stack (Locally)

```bash
# 1️⃣ Start backend (serves frontend locally)
cd backend
npm run dev

# 2️⃣ Open in browser
http://localhost:3000
```

---

## 📋 Roadmap

| Stage | Description                             | Status |
| :---- | :-------------------------------------- | :----: |
| 1     | Static frontend (HTML + CSS)            |    ✅   |
| 2     | Express backend with `/api/health`      |    ✅   |
| 3     | MySQL connection & `/api/rooms`         |    ✅   |
| 4     | Booking API `/api/booking`              |    ✅   |
| 5     | Frontend form integration (Fetch API)   |    ✅   |
| 6     | Dynamic room rendering via `/api/rooms` |    ✅   |
| 7     | URL pre-selection for booking form      |   🔜   |
| 8     | Admin dashboard (manage bookings)       |    ⏳   |
| 9     | Cloud deployment & optimisation         |    ✅   |

---

## 🧾 Notes

* **CORS** on backend explicitly allows origin `https://minhquach8.github.io`.
* Image paths in the database are stored as relative (`images/room-deluxe.jpg`),
  resolved by the frontend for GitHub Pages context.
* All wording and comments follow **British English** style for consistency.

---

## 📄 Licence

This project is released under the **MIT Licence**.
© 2025 **Minh Hoang Quach** — Designed and built in Aotearoa NZ 🇳🇿