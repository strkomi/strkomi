// Мелочи UI
document.getElementById("year").textContent = new Date().getFullYear();

const burger = document.getElementById("burger");
if (burger) {
  burger.addEventListener("click", () => {
    const nav = document.querySelector(".nav");
    const expanded = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!expanded));
    if (nav) nav.style.display = expanded ? "none" : "flex";
  });
}

// Отправка формы через Formspree (или любой другой endpoint)
const form = document.getElementById("leadForm");
const statusEl = document.getElementById("formStatus");

// 1) ЗАМЕНИТЕ этот URL на ваш endpoint Formspree после создания формы
// Пример: https://formspree.io/f/abcdwxyz
const FORMSPREE_ENDPOINT = "https://formspree.io/f/XXXXXXXX";

if (form) {
  form.action = FORMSPREE_ENDPOINT;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Если endpoint не настроен
    if (FORMSPREE_ENDPOINT.includes("XXXXXXXX")) {
      statusEl.textContent = "Нужно настроить обработчик формы (Formspree). Пока можно отправить заявку на post@strkomi.ru.";
      return;
    }

    // антиспам
    const gotcha = form.querySelector('input[name="_gotcha"]');
    if (gotcha && gotcha.value) return;

    statusEl.textContent = "Отправляем…";

    try {
      const data = new FormData(form);
      const res = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { "Accept": "application/json" }
      });

      if (res.ok) {
        form.reset();
        statusEl.textContent = "Заявка отправлена. Спасибо! Мы свяжемся с вами.";
      } else {
        statusEl.textContent = "Не получилось отправить. Напишите на post@strkomi.ru.";
      }
    } catch {
      statusEl.textContent = "Сеть недоступна. Напишите на post@strkomi.ru.";
    }
  });
}