// Aurora Cove Hotel — booking form handler

(function () {
    const form = document.querySelector(".booking-form");
    if (!form) return;

    const API_BASE =
        typeof window !== "undefined" && window.API_BASE ? window.API_BASE : "";

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
        return value ? new Date(value + "T00:00:00") : null;
    }

    // 1️⃣ Pre-select room from query (?room=slug)
    const params = new URLSearchParams(window.location.search);
    const roomSlug = params.get("room");
    if (roomSlug) {
        const select = document.getElementById("room");
        if (select) {
            const opt = Array.from(select.options).find(
                (o) => o.value === roomSlug
            );
            if (opt) {
                select.value = roomSlug;
            }
        }
    }

    // 2️⃣ Basic date validation: min today for check-in
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;

    const checkinInput = document.getElementById("checkin");
    if (checkinInput) checkinInput.min = todayStr;

    const checkoutInput = document.getElementById("checkout");
    if (checkoutInput) checkoutInput.min = todayStr;

    /* ------------------------------------------------------------ */

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
        const now = new Date(todayStr + "T00:00:00");

        if (inDate < now) {
            setStatus("Check-in date cannot be in the past.", "error");
            return;
        }

        if (!(inDate < outDate)) {
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
