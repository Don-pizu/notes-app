// Set the backend API URL
const API = 'http://localhost:5000/api'; // Uncomment this for local testing

//const API = 'https://blog-api-4zax.onrender.com/api'; // Production backend


const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get("email");

//for verification
document.getElementById("verifyForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const otp = document.getElementById("otp").value;

  const res = await fetch(`${API}/auth/verifyOtp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp })
  });

  const data = await res.json();

  if (res.ok) {
    alert("Verification successful! You can now log in.");
    window.location.href = "index.html";
  } else {
    document.getElementById("status").innerText = data.message || "Invalid OTP";
  }
    });


// to resend otp
document.getElementById("resendBtn").addEventListener("click", async () => {
  const res = await fetch(`${API}/auth/resendOtp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });

  const data = await res.json();

  if (res.ok) {
    document.getElementById("status").innerText = "New OTP sent to your email.";
  } else {
    document.getElementById("status").innerText = data.message || "Failed to resend OTP.";
  }
});
  