// ---- Settings: edit these two lines ----
// 1) Create a free form at https://formspree.io and paste its ID in index.html (replace YOUR_FORM_ID).
// 2) Fallback email, used only until the form ID is set.
const FALLBACK_EMAIL = "hello@goldencleaning.example";
// ----------------------------------------

document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") nav.classList.remove("open");
});

// Booking form
const form = document.getElementById("booking-form");
const statusEl = form.querySelector(".form-status");
const dateInput = form.querySelector('input[name="date"]');

// Earliest bookable date is tomorrow
const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
dateInput.min = tomorrow.toISOString().slice(0, 10);

function setStatus(msg, cls) {
  statusEl.textContent = msg;
  statusEl.className = "form-status " + (cls || "");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Validate
  let firstBad = null;
  form.querySelectorAll("[required]").forEach((el) => {
    const bad = !el.checkValidity();
    el.classList.toggle("invalid", bad);
    if (bad && !firstBad) firstBad = el;
  });
  if (firstBad) {
    setStatus("Please fill in the highlighted fields.", "err");
    firstBad.focus();
    return;
  }

  const data = new FormData(form);

  // Until a Formspree ID is set, open the visitor's email app instead.
  if (form.action.includes("YOUR_FORM_ID")) {
    const lines = [];
    for (const [k, v] of data.entries()) {
      if (!k.startsWith("_") && v) lines.push(`${k}: ${v}`);
    }
    window.location.href =
      `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent("Booking request")}` +
      `&body=${encodeURIComponent(lines.join("\n"))}`;
    setStatus("Your email app should open with the booking details. Press send to finish.", "ok");
    return;
  }

  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  setStatus("Sending…");
  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error("Request failed");
    form.reset();
    setStatus("Thank you! Your request was sent. We will contact you shortly to confirm.", "ok");
  } catch (err) {
    setStatus("Sorry, something went wrong. Please call us or try again.", "err");
  } finally {
    btn.disabled = false;
  }
});

// Pricing buttons preselect the matching service
document.querySelectorAll(".price .btn").forEach((b) => {
  b.addEventListener("click", () => {
    const title = b.closest(".price").querySelector("h3").textContent.trim().toLowerCase();
    const sel = form.querySelector('select[name="service"]');
    [...sel.options].forEach((o) => {
      if (o.text.toLowerCase().includes(title.split(" ")[0])) sel.value = o.text;
    });
  });
});
