// Aurora Cove Hotel — simple admin view for bookings

(function () {
    const container = document.getElementById("bookingTable");
    if (!container) return;

    const API_BASE =
        typeof window !== "undefined" && window.API_BASE ? window.API_BASE : "";

    async function loadBookings() {
        container.innerHTML = "<p>Loading bookings…</p>";
        try {
            const res = await fetch(`${API_BASE}/api/bookings`);
            if (!res.ok) throw new Error(`Request failed: ${res.status}`);
            const data = await res.json();
            renderTable(data.bookings || []);
        } catch (err) {
            container.innerHTML = `<p style="color:#f87171">Failed to load bookings: ${err.message}</p>`;
        }
    }

    function renderTable(rows) {
        if (rows.length === 0) {
            container.innerHTML =
                "<p style='color:#a8b3cf'>No bookings yet.</p>";
            return;
        }

        const table = document.createElement("table");
        table.innerHTML = `
            <caption>Recent Bookings (${rows.length})</caption>
            <thead>
                <tr>
                <th>ID</th>
                <th>Guest</th>
                <th>E-mail</th>
                <th>Room</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Notes</th>
                <th>Created</th>
                </tr>
            </thead>
            <tbody>
                ${rows
                    .map(
                        (b) => `<tr>
                    <td>${b.id}</td>
                    <td>${b.full_name}</td>
                    <td>${b.email}</td>
                    <td>${b.room_slug}</td>
                    <td>${b.checkin}</td>
                    <td>${b.checkout}</td>
                    <td>${b.notes ? b.notes : ""}</td>
                    <td>${new Date(b.created_at).toLocaleString("en-NZ")}</td>
                    </tr>`
                    )
                    .join("")}
            </tbody>`;
        container.innerHTML = "";
        container.appendChild(table);
    }

    loadBookings();
})();
