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
├── backend/          # Express server + REST APIs (rooms, booking, admin)
│   ├── server.js
│   ├── db.js
│   ├── .env
│   └── data/         # (optional) mock data
└── frontend/         # Static UI: HTML, CSS, JS
│   ├── index.html
│   ├── rooms.html
│   ├── booking.html
│   ├── admin.html
│   ├── styles.css
│   ├── booking.js
│   ├── rooms.js
│   ├── admin.js
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
> On **Render**, these values are added as *Environment Variables* in the dashboard.

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

| Method   | Endpoint        | Description                             |
| :------- | :-------------- | :-------------------------------------- |
| **GET**  | `/api/health`   | Returns service status (for monitoring) |
| **GET**  | `/api/rooms`    | Retrieves room list from MySQL          |
| **POST** | `/api/booking`  | Creates a new booking record            |
| **GET**  | `/api/bookings` | Fetches booking list (admin dashboard)  |

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

The **frontend** is a modern static site hosted on **GitHub Pages**,
while the **backend API** is deployed on **Render**.
During local development, Express can serve the same frontend for convenience.

### Pages

| File           | Description                                             |
| :------------- | :------------------------------------------------------ |
| `index.html`   | Landing page with hero section                          |
| `rooms.html`   | Dynamic room listings and rates                         |
| `booking.html` | Booking form connected to the API                       |
| `admin.html`   | Admin dashboard for viewing bookings                    |
| `styles.css`   | Unified design system                                   |
| `booking.js`   | Handles booking form submission via Fetch API           |
| `rooms.js`     | Renders room data dynamically from `/api/rooms`         |
| `admin.js`     | Displays booking data, filters, and exports CSV         |
| `config.js`    | Defines the `window.API_BASE` global used for API calls |

### Booking Flow

1. User fills in form on **`booking.html`**.
2. `booking.js` validates input and sends a POST request → `/api/booking`.
3. Backend inserts the record into MySQL → returns a booking ID.
4. User sees a success message with **Reference ID**.

> The file `frontend/config.js` defines the global `window.API_BASE`,
> pointing to the deployed Render backend (e.g. `https://hotel-booking-bucm.onrender.com`).
> All Fetch requests use this base to communicate with the API.

---

## 🧠 Key Technologies

* **Node.js** + **Express** — backend server
* **MySQL** + `mysql2/promise` — relational database
* **dotenv** — environment configuration
* **HTML5 / CSS3 / JavaScript (ES6)** — frontend
* **Fetch API** — AJAX calls
* **CORS** — cross-origin access for GitHub Pages
* **Render** — backend hosting
* **Railway** — MySQL cloud database
* **GitHub Pages** — static frontend hosting

---

## 🚀 Run the Full Stack (Locally)

```bash
# 1️⃣ Start backend (serves frontend locally)
cd backend
npm run dev

# 2️⃣ Open in browser
http://localhost:3000
```

> To develop separately, open `frontend/` in Live Server or VS Code preview.

---

## 🧾 Notes

* **CORS** on backend explicitly allows origin `https://minhquach8.github.io`.
* Image paths in the database are stored as relative (`images/room-deluxe.jpg`),
  resolved automatically by the frontend for GitHub Pages.
* All wording and comments follow **British English** style for consistency.
* Admin dashboard supports:

  * 🔍 Search by guest or e-mail
  * 🏷 Filter by room type
  * 📤 Export visible data as CSV

---

## 📋 Roadmap

| Stage | Description                                         | Status |
| :---- | :-------------------------------------------------- | :----: |
| 1     | Static frontend (HTML + CSS)                        |    ✅   |
| 2     | Express backend with `/api/health`                  |    ✅   |
| 3     | MySQL connection & `/api/rooms`                     |    ✅   |
| 4     | Booking API `/api/booking`                          |    ✅   |
| 5     | Frontend form integration (Fetch API)               |    ✅   |
| 6     | Dynamic room rendering via `/api/rooms`             |    ✅   |
| 7     | URL pre-selection for booking form                  |    ✅   |
| 8     | Admin dashboard (bookings view, filter, export CSV) |    ✅   |
| 9     | Cloud deployment (GitHub Pages + Render + Railway)  |    ✅   |

---

## 🧭 Deployment & Setup Guideline

### 🟢 1. Backend (Render)

1. Push your repo to GitHub.
2. Go to [https://render.com](https://render.com) → **New + Web Service**.
3. Select repo → **Root Directory:** `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables:

   ```
   NODE_ENV=production
   DB_HOST=<your public Railway host>
   DB_PORT=<your Railway port>
   DB_USER=<your Railway user>
   DB_PASSWORD=<your Railway password>
   DB_NAME=<your Railway database>
   ```
7. Deploy → copy the generated Render domain.

---

### 🟢 2. Database (Railway)

1. Create new **MySQL** project → enable **Public Connection**.
2. Copy connection details → paste into Render’s environment variables.
3. In Railway SQL Console, run the schema in `README` (rooms + bookings + seed data).
4. Verify with:

   ```sql
   SELECT COUNT(*) FROM rooms;
   ```

---

### 🟢 3. Frontend (GitHub Pages)

1. In repo settings → **Pages** → set build source to `main` branch, `/frontend` folder.
2. Create `/index.html` in root (redirects to `/frontend/`):

   ```html
   <meta http-equiv="refresh" content="0; url=frontend/" />
   ```
3. In `frontend/config.js`, set:

   ```js
   window.API_BASE = "https://<your-render-service>.onrender.com";
   ```
4. Commit & push — GitHub Pages will deploy automatically.

---

### 🟢 4. Local Development

```bash
# Backend
cd backend
npm run dev

# MySQL local (optional)
mysql -u root -p
```

Then open [http://localhost:3000](http://localhost:3000)

---

## 📄 Licence

This project is released under the **MIT Licence**.
© 2025 **Minh Hoang Quach** — Designed and built in Aotearoa NZ 🇳🇿