// Aurora Cove Hotel — Admin view with filtering & CSV export

(function () {
    const container = document.getElementById("bookingTable");
    const searchInput = document.getElementById("searchInput");
    const roomFilter = document.getElementById("roomFilter");
    const exportBtn = document.getElementById("exportBtn");

    if (!container) return;
    const API_BASE =
        typeof window !== "undefined" && window.API_BASE ? window.API_BASE : "";
    let allBookings = [];

    async function loadBookings() {
        container.innerHTML = "<p>Loading bookings…</p>";
        try {
            const res = await fetch(`${API_BASE}/api/bookings`);
            if (!res.ok) throw new Error(`Request failed: ${res.status}`);
            const data = await res.json();
            allBookings = data.bookings || [];
            renderTable(allBookings);
        } catch (err) {
            container.innerHTML = `<p style="color:#f87171">Failed to load bookings: ${err.message}</p>`;
        }
    }

    function renderTable(rows) {
        if (rows.length === 0) {
            container.innerHTML =
                "<p style='color:#a8b3cf'>No bookings match your filter.</p>";
            return;
        }

        const table = document.createElement("table");
        table.innerHTML = `
            <caption>Bookings (${rows.length})</caption>
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
                    <td>${
                        b.notes ? b.notes : "<span style='color:#64748b'>–</span>"
                    }</td>
                    <td>${new Date(b.created_at).toLocaleString("en-NZ")}</td>
                    </tr>`
                    )
                    .join("")}
            </tbody>`;
        container.innerHTML = "";
        container.appendChild(table);
    }

    // Simple client-side filtering
    function applyFilters() {
        const query = searchInput.value.toLowerCase();
        const room = roomFilter.value;
        const filtered = allBookings.filter((b) => {
            const matchText =
                b.full_name.toLowerCase().includes(query) ||
                b.email.toLowerCase().includes(query);
            const matchRoom = room ? b.room_slug === room : true;
            return matchText && matchRoom;
        });
        renderTable(filtered);
    }

    // Export CSV of current table view
    function exportCSV() {
        if (!allBookings.length) return;
        const visible = container.querySelectorAll("tbody tr");
        if (!visible.length) {
            alert("No data to export.");
            return;
        }
        const headers = [
            "ID",
            "Guest",
            "E-mail",
            "Room",
            "Check-in",
            "Check-out",
            "Notes",
            "Created",
        ];
        const rows = Array.from(visible).map((tr) =>
            Array.from(tr.children)
                .map((td) => `"${td.textContent.trim().replace(/"/g, '""')}"`)
                .join(",")
        );
        const csv = [headers.join(","), ...rows].join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "bookings.csv";
        a.click();
        URL.revokeObjectURL(url);
    }

    // Bind events
    searchInput.addEventListener("input", applyFilters);
    roomFilter.addEventListener("change", applyFilters);
    exportBtn.addEventListener("click", exportCSV);

    loadBookings();
})();
