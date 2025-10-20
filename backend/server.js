// Aurora Cove Hotel - minimal Express server
// Comments use British English for consistency.

import express from "express";
import path from "path";
import morgan from "morgan";
import fs from "fs";
import { fileURLToPath } from "url";
import { error, timeStamp } from "console";
import { pool, testConnection } from "./db.js";
await testConnection();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// HTTP request logging (development mode only)
app.use(morgan("dev"));
app.use(express.json());

// Serve static files
const frontendRoot = path.resolve(__dirname, "../frontend");
app.use(express.static(frontendRoot, { extensions: ["html"] }));

// Basic health-check for operational visibility
app.get("/api/health", (_req, res) => {
    res.status(200).json({
        status: "OK",
        service: "hotel-booking-backend",
        environment: process.env.NODE_ENV || "development",
        timestamp: new Date().toISOString()
    });
});

// Rooms endpoint (mock JSON)
app.get("/api/rooms", async (_req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM rooms ORDER BY price_nzd ASC");
        res.status(200).json({ count: rows.length, rooms: rows });
    } catch (error) {
        res.status(500).json({
            error: "DB_QUERY_FAILED",
            message: error.message
        })
        
    }
});

// Create new booking
app.post("/api/booking", async (_req, res) => {
    try {
        const { full_name, email, room_slug, checkin, checkout, notes } = _req.body;
        if (!full_name || !email || !room_slug || !checkin || !checkout) {
            return res.status(400).json({
                error: "MISSING_FIELDS",
                message: "Required fields are missing."
            });
        }
        
        const [result] = await pool.query(
            `INSERT INTO bookings (full_name, email, room_slug, checkin, checkout, notes)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [full_name, email, room_slug, checkin, checkout, notes || null]
        );

        res.status(201).json({
            message: "Booking created successfully.",
            booking_id: result.insertId
        });
    } catch (error) {
        console.error(" Booking creation failed:", error.message);
        res.status(500).json({
            error: "DB_INSERT_FAILED",
            message: error.message
        })
    }
});

// SPA-friendly fallback: return index.html for unmatched routes
app.get("*", (_req, res) => {
    res.sendFile(path.join(frontendRoot, "index.html"));
});

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
    console.log(`Serving frontend from ${frontendRoot}`);
})