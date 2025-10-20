// Database connection module

import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export async function testConnection() {
    try {
        const [rows] = await pool.query("SELECT NOW() as now");
        console.log(" Database connected - current time:", rows[0].now);
    } catch (error) {
        console.error(" Database connection failed:", error.message);
    }
}