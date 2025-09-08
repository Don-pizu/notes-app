// Set the backend API URL
const API = 'http://localhost:5000/api'; // Uncomment this for local testing

//const API = 'https://blog-api-4zax.onrender.com/api'; // Production backend


document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phone, password })
  });

  const data = await res.json();

  if (res.ok) {
    alert("Registered successfully. Please check your email for OTP.");
    window.location.href = `verify.html?email=${encodeURIComponent(email)}`;
  } else {
    alert(data.message || "Registration failed");
  }
    });