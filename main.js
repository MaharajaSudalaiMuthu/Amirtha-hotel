document.addEventListener("DOMContentLoaded", () => {
    // Hotel Phone Number for WhatsApp
    const WA_NUMBER = "918438435005";

    // Helper to generate WhatsApp URL and open
    const openWhatsApp = (text) => {
        const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank");
    };

    // 1. Handle Room Booking Form
    const bookingForm = document.getElementById("room-booking-form");
    if (bookingForm) {
        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("name")?.value || "";
            const phone = document.getElementById("phone")?.value || "";
            const checkin = document.getElementById("checkin")?.value || "";
            const checkout = document.getElementById("checkout")?.value || "";
            const roomType = document.getElementById("room-type")?.options[document.getElementById("room-type").selectedIndex].text || "";
            
            if (!name || !phone || !checkin || !checkout) {
                alert("Please fill in all details");
                return;
            }

            const message = `Hello, I would like to book a room.
*Details:*
Name: ${name}
Phone: ${phone}
Check-in: ${checkin}
Check-out: ${checkout}
Room Type: ${roomType}`;

            openWhatsApp(message);
        });
    }

    // 2. Handle Food Order Checkout
    const orderBtn = document.getElementById("whatsapp-order-btn");
    if (orderBtn) {
        orderBtn.addEventListener("click", () => {
            const items = document.querySelectorAll(".menu-item");
            let orderLines = [];

            items.forEach((item) => {
                const name = item.getAttribute("data-name");
                const qtyInput = item.querySelector(".qty-input");
                if (qtyInput) {
                    const qty = parseInt(qtyInput.value) || 0;
                    if (qty > 0) {
                        orderLines.push(`${qty} ${name}`);
                    }
                }
            });

            if (orderLines.length === 0) {
                alert("Please select at least one item to order.");
                return;
            }

            const message = `Hello, I want to order:\n${orderLines.join("\n")}`;
            openWhatsApp(message);
        });
    }

    // Quantity selector buttons (+/-) logic
    const minusBtns = document.querySelectorAll(".qty-minus");
    const plusBtns = document.querySelectorAll(".qty-plus");

    minusBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const input = e.target.closest(".qty-selector").querySelector(".qty-input");
            let val = parseInt(input.value) || 0;
            if (val > 0) {
                input.value = val - 1;
            }
        });
    });

    plusBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const input = e.target.closest(".qty-selector").querySelector(".qty-input");
            let val = parseInt(input.value) || 0;
            input.value = val + 1;
        });
    });

    // 3. Handle Event Enquiry
    const eventEnquiryBtn = document.getElementById("event-enquiry-btn");
    if (eventEnquiryBtn) {
        eventEnquiryBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const message = "Hello, I would like to enquire about the Party Hall & Catering services.";
            openWhatsApp(message);
        });
    }
});
