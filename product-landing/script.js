// Hamburger Navigation
function toggleNavigation() {
  if (navBar.classList.contains("is-open")) {
    this.setAttribute("aria-expanded", false);
    navBar.classList.remove("is-open");
  } else {
    navBar.classList.add("is-open");
    this.setAttribute("aria-expanded", true);
  }
}

// Newsletter form submit
function createAlert(elem, msg) {
  if (footerForm.querySelector("span.form-error-message")) return;
  const alertElement = document.createElement(elem);
  alertElement.setAttribute("role", "alert");
  alertElement.classList.add("form-error-message");
  alertElement.textContent = msg;
  emailForm.insertAdjacentElement("afterend", alertElement);
}

;(function () {
  var queryString = window.location.search
  var href = window.location.href
  var parameters = new URLSearchParams(queryString)
  var email = parameters.get('email')

  var domEmail = document.querySelector('[data-email]')

  if (email) {
    domEmail.textContent = 'Email: ' + email
  }
})()