// Aurora Cove Hotel — booking form handler

(function () {
    const form = document.querySelector(".booking-form");
    if (!form) return;

    // API base: use global from config.js, fall back to relative for local dev.
    const API_BASE =
        typeof window !== "undefined" && window.API_BASE ? window.API_BASE : "";

    // Create a status area for user feedback
    const status = document.createElement("div");
    status.setAttribute("role", "status");
    status.style.marginTop = "10px";
    status.style.fontWeight = "600";
    form.appendChild(status);

    function setStatus(message, tone) {
        status.textContent = message;
        status.style.color =
            tone === "error"
                ? "#f87171"
                : tone === "success"
                ? "#34d399"
                : "#cbd5e1";
    }

    function parseDate(value) {
        // value is yyyy-mm-dd; basic normalisation for comparison
        return value ? new Date(value + "T00:00:00") : null;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const fullName = document.getElementById("name")?.value.trim();
        const email = document.getElementById("email")?.value.trim();
        const roomSlug = document.getElementById("room")?.value;
        const checkin = document.getElementById("checkin")?.value;
        const checkout = document.getElementById("checkout")?.value;
        const notes = document.getElementById("notes")?.value.trim();

        if (!fullName || !email || !roomSlug || !checkin || !checkout) {
            setStatus("Please fill in all required fields.", "error");
            return;
        }

        const inDate = parseDate(checkin);
        const outDate = parseDate(checkout);
        if (!inDate || !outDate || !(inDate < outDate)) {
            setStatus("Check-out must be after check-in.", "error");
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.7";
        setStatus("Submitting your booking…", "info");

        try {
            const res = await fetch(`${API_BASE}/api/booking`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    full_name: fullName,
                    email,
                    room_slug: roomSlug,
                    checkin,
                    checkout,
                    notes: notes || null,
                }),
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(
                    err.message || "Unable to create booking at the moment."
                );
            }

            const data = await res.json();
            setStatus(
                `Booking confirmed. Reference ID: ${data.booking_id}`,
                "success"
            );
            form.reset();
        } catch (error) {
            setStatus(
                error.message || "Something went wrong. Please try again.",
                "error"
            );
        } finally {
            submitBtn.disabled = false;
            submitBtn.style.opacity = "1";
        }
    });
})();
