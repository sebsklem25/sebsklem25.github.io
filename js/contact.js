// js/contact.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const nameInput = form.querySelector("#name");
  const emailInput = form.querySelector("#email");
  const subjectInput = form.querySelector("#subject");
  const messageInput = form.querySelector("#message");
  const statusEl = document.getElementById("form-status");
  const submitBtn = form.querySelector('button[type="submit"]');

  const errors = {
    name: document.getElementById("name-error"),
    email: document.getElementById("email-error"),
    subject: document.getElementById("subject-error"),
    message: document.getElementById("message-error"),
  };

  // We only start showing validation AFTER the user tries to submit once
  let hasTriedSubmit = false;

  function setFieldError(input, errorEl, message) {
    const field = input.closest(".field");
    if (!field || !errorEl) return;

    if (message) {
      field.classList.add("error");
      errorEl.textContent = message;
    } else {
      field.classList.remove("error");
      errorEl.textContent = "";
    }
  }

  function validateAll() {
    let valid = true;
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Name
    if (!name) {
      setFieldError(nameInput, errors.name, "Please enter your name.");
      valid = false;
    } else {
      setFieldError(nameInput, errors.name, "");
    }

    // Email
    if (!email) {
      setFieldError(
        emailInput,
        errors.email,
        "Please enter your email address."
      );
      valid = false;
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setFieldError(
        emailInput,
        errors.email,
        "Please enter a valid email address."
      );
      valid = false;
    } else {
      setFieldError(emailInput, errors.email, "");
    }

    // Message
    if (!message) {
      setFieldError(
        messageInput,
        errors.message,
        "Please enter a short message."
      );
      valid = false;
    } else {
      setFieldError(messageInput, errors.message, "");
    }

    return valid;
  }

  // After the first submit attempt, validate as the user types to clear errors
  form.addEventListener("input", () => {
    if (!hasTriedSubmit) return;
    validateAll();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    hasTriedSubmit = true;

    // clear global status
    statusEl.textContent = "";
    statusEl.className = "form-status";

    const isValid = validateAll();
    if (!isValid) {
      statusEl.textContent = "Please fix the highlighted fields.";
      statusEl.classList.add("error");
      return;
    }

    // Pretend to submit
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    statusEl.textContent = "Sending your message (demo)…";
    statusEl.classList.remove("error");
    statusEl.classList.add("info");

    setTimeout(() => {
      form.reset();
      // Clear any error styling
      Object.values(errors).forEach((el) => {
        if (el) el.textContent = "";
      });
      form
        .querySelectorAll(".field.error")
        .forEach((field) => field.classList.remove("error"));

      submitBtn.disabled = false;
      submitBtn.textContent = originalText;

      statusEl.className = "form-status success";
      statusEl.textContent =
        "Thank you! Your message has been sent. Dr. Akter typically responds within 2–3 business days.";
    }, 900);
  });
});
