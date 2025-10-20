# 🏨 Aurora Cove Hotel — Full-Stack (Node.js + MySQL)

A learning project developed by **Minh Hoang Quach**, evolving from a static HTML/CSS site into a modern **full-stack hotel booking system** using **Node.js**, **Express**, and **MySQL**.

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
├── index.html
├── rooms.html
├── booking.html
├── styles.css
├── booking.js
└── images/

````

---

## ⚙️ Backend (Express + MySQL)

### Environment Setup

Create a file named **`.env`** inside `backend/`:

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=hotel_booking
DB_PORT=3306
````

> Replace credentials with your local MySQL configuration.

### Installation & Run

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

### Database Schema

#### 🗂️ Table: `rooms`

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

#### 🗂️ Table: `bookings`

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

## 🎨 Frontend

The **frontend** is a modern static site located in `frontend/`.
It is served automatically by the backend (`express.static()`).

### Pages

| File           | Description                                     |
| :------------- | :---------------------------------------------- |
| `index.html`   | Landing page with hero section                  |
| `rooms.html`   | Room listings and rates                         |
| `booking.html` | Booking form connected to the API               |
| `styles.css`   | Unified design system                           |
| `booking.js`   | Handles booking form submission using Fetch API |

### Booking Flow

1. User fills in form on **`booking.html`**
2. `booking.js` validates inputs and sends POST request → `/api/booking`
3. Backend inserts record into MySQL → returns booking ID
4. User receives confirmation message (Reference ID shown)

---

## 🧠 Key Technologies

* **Node.js** + **Express** (backend server)
* **MySQL** + **mysql2/promise**
* **dotenv** for environment configuration
* **HTML5 / CSS3 / JavaScript (ES6)** frontend
* **Fetch API** for AJAX form submission

---

## 🚀 Run the Full Stack

```bash
# 1️⃣ Start backend (serves frontend too)
cd backend
npm run dev

# 2️⃣ Open in browser
http://localhost:3000
```

---

## 📋 Roadmap

| Stage | Description                                    | Status |
| :---- | :--------------------------------------------- | :----: |
| 1     | Static frontend (HTML + CSS)                   |    ✅   |
| 2     | Express backend with `/api/health`             |    ✅   |
| 3     | MySQL connection & `/api/rooms`                |    ✅   |
| 4     | Booking API `/api/booking`                     |    ✅   |
| 5     | Frontend form integration (Fetch API)          |    ✅   |
| 6     | Dynamic room rendering & basic admin dashboard |   🔜   |

---

## 📄 Licence

This project is released under the **MIT Licence**.
© 2025 Minh Hoang Quach — Designed and built in Aotearoa NZ 🇳🇿