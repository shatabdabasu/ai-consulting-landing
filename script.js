document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const button = form.querySelector("button");
  const status = document.createElement("p");

  status.style.marginTop = "10px";
  status.style.fontSize = "14px";
  form.appendChild(status);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    button.disabled = true;
    button.textContent = "Sending...";
    status.textContent = "";
    status.style.color = "#000";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      });

      if (response.ok) {
        status.textContent = "Thank you. Your message has been sent.";
        status.style.color = "green";
        form.reset();
      } else {
        throw new Error("Submission failed");
      }

    } catch (error) {
      status.textContent = "Something went wrong. Please try again.";
      status.style.color = "red";
    } finally {
      button.disabled = false;
      button.textContent = "Send Message";
    }
  });
});
