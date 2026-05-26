document.getElementById("loginForm")
.addEventListener("submit", function(e) {

  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (
    email === "admin@hr.com" &&
    password === "password143"
  ) {

    localStorage.setItem("loggedIn", "true");

    window.location.href = "dashboard.html";

  } else {

    alert("Invalid Credentials");

  }

});