// Aurora Cove Hotel — dynamic rooms rendering

(function () {
    const container = document.getElementById("rooms");
    if (!container) return;

    const API_BASE =
        typeof window !== "undefined" && window.API_BASE ? window.API_BASE : "";

    // Basic currency formatter for NZD
    const nzd = new Intl.NumberFormat("en-NZ", {
        style: "currency",
        currency: "NZD",
        maximumFractionDigits: 0,
    });

    // Lightweight skeleton while loading
    function showSkeleton() {
        container.innerHTML = `
            <article class="room-card" aria-hidden="true"><div class="room-card__body"><h2>Loading…</h2><p>Please wait while we fetch rooms.</p></div></article>
            <article class="room-card" aria-hidden="true"><div class="room-card__body"><h2>Loading…</h2><p>Please wait while we fetch rooms.</p></div></article>
            <article class="room-card" aria-hidden="true"><div class="room-card__body"><h2>Loading…</h2><p>Please wait while we fetch rooms.</p></div></article>
            `;
    }

    function renderRooms(rooms) {
        if (!rooms || rooms.length === 0) {
            container.innerHTML = `<p style="color:#a8b3cf">No rooms are available at the moment.</p>`;
            return;
        }

        const html = rooms
            .map((room) => {
                const price = nzd.format(Number(room.price_nzd || 0));
                const img = room.image || "/images/room-standard.jpg";
                const desc =
                    room.description ||
                    "A comfortable room with thoughtful amenities.";
                const name = room.name || "Room";
                const slug = room.slug || "standard";

                return `
                    <article class="room-card">
                    <img src="${img}" alt="${name}" />
                    <div class="room-card__body">
                        <h2>${name}</h2>
                        <p>${desc}</p>
                        <div class="room-meta">
                        <span class="price">From ${price}/night</span>
                        <a class="btn btn--ghost" href="booking.html?room=${encodeURIComponent(
                            slug
                        )}" aria-label="Book ${name}">Book</a>
                        </div>
                    </div>
                    </article>
                `;
            })
            .join("");

        container.innerHTML = html;
    }

    function renderError(message) {
        container.innerHTML = `
            <article class="room-card">
                <div class="room-card__body">
                <h2>Unable to load rooms</h2>
                <p style="color:#f87171">${message || "Please try again later."}</p>
                </div>
            </article>
            `;
    }

    async function init() {
        showSkeleton();
        try {
            const res = await fetch(`${API_BASE}/api/rooms`, {
                headers: { Accept: "application/json" },
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(
                    err.message || `Request failed with status ${res.status}`
                );
            }
            const data = await res.json();
            renderRooms(data.rooms);
        } catch (e) {
            renderError(e.message);
        }
    }

    init();
})();
