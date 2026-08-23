// frontend/js/auth.js

function checkAuth() {
  const token = localStorage.getItem("globeTrotterToken");
  const isAuthPage =
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/";

  if (!token && !isAuthPage) {
    window.location.href = "../index.html";
  } else if (token && isAuthPage) {
    window.location.href = "pages/dashboard.html";
  }
}

function logout() {
  localStorage.removeItem("globeTrotterToken");
  window.location.href = "../index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const authAlert = document.getElementById("auth-alert");

  function showAlert(msg) {
    if (authAlert) {
      authAlert.textContent = msg;
      authAlert.style.display = "block";
    } else {
      alert(msg);
    }
  }

  // --- LOGIN LOGIC ---
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      try {
        // For LOGIN ONLY, we must use URLSearchParams instead of JSON
        const formData = new URLSearchParams();
        formData.append("username", email); // backend expects 'username'
        formData.append("password", password);

        const response = await fetch(`${API_BASE_URL}/api/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Invalid credentials");
        }

        const data = await response.json();
        localStorage.setItem("globeTrotterToken", data.access_token);
        window.location.href = "pages/dashboard.html";
      } catch (err) {
        showAlert(err.message);
      }
    });
  }

  // --- SIGNUP LOGIC ---
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;

      try {
        // Standard fetch for signup (sending JSON)
        const response = await fetch(`${API_BASE_URL}/api/users/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Signup failed");
        }

        const data = await response.json();
        localStorage.setItem("globeTrotterToken", data.access_token);
        window.location.href = "pages/dashboard.html";
      } catch (err) {
        showAlert(err.message);
      }
    });
  }

  // Bind logout button if it exists
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      logout();
    });
  }
});
