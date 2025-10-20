// Aurora Cove Hotel - minimal Express server
// Comments use British English for consistency.

import express from "express";
import morgan from "morgan";
import cors from "cors";
import { pool, testConnection } from "./db.js";

const app = express();

// HTTP request logging (development mode only)
app.use(morgan("dev"));
app.use(express.json());

// CORS: allow GitHub pages frontend
const allowedOrigins = ["https://minhquach8.github.io"];
app.use(
    cors({
        origin: (origin, cb) => {
            if (!origin || allowedOrigins.includes(origin))
                return cb(null, true);
            return cb(new Error("Not allowed by CORS"));
        },
    })
);

// Basic health-check for operational visibility
app.get("/api/health", (_req, res) => {
    res.status(200).json({
        status: "OK",
        service: "hotel-booking-backend",
        environment: process.env.NODE_ENV || "development",
        timestamp: new Date().toISOString(),
    });
});

await testConnection();
// Rooms (from MySQL)
app.get("/api/rooms", async (_req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM rooms ORDER BY price_nzd ASC"
        );
        res.status(200).json({ count: rows.length, rooms: rows });
    } catch (error) {
        res.status(500).json({
            error: "DB_QUERY_FAILED",
            message: error.message,
        });
    }
});

// Create new booking
app.post("/api/booking", async (_req, res) => {
    try {
        const { full_name, email, room_slug, checkin, checkout, notes } =
            _req.body;
        if (!full_name || !email || !room_slug || !checkin || !checkout) {
            return res.status(400).json({
                error: "MISSING_FIELDS",
                message: "Required fields are missing.",
            });
        }

        const [result] = await pool.query(
            `INSERT INTO bookings (full_name, email, room_slug, checkin, checkout, notes)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [full_name, email, room_slug, checkin, checkout, notes || null]
        );

        res.status(201).json({
            message: "Booking created successfully.",
            booking_id: result.insertId,
        });
    } catch (error) {
        console.error(" Booking creation failed:", error.message);
        res.status(500).json({
            error: "DB_INSERT_FAILED",
            message: error.message,
        });
    }
});

// Get all bookings (basic admin view)
app.get("/api/bookings", async (_req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT id, full_name, email, room_slug, checkin, checkout, created_at
       FROM bookings
       ORDER BY created_at DESC
       LIMIT 100`
        );
        res.status(200).json({ count: rows.length, bookings: rows });
    } catch (err) {
        res.status(500).json({
            error: "DB_QUERY_FAILED",
            message: err.message,
        });
    }
});

// Optional root message so visiting the base URL is clear
app.get("/", (_req, res) => {
    res.type("text").send(
        "Aurora Cove Hotel API — see /api/health, /api/rooms, /api/booking"
    );
});

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ API listening on :${PORT}`);
});
