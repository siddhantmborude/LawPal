document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // Load saved theme from localStorage
    if (localStorage.getItem("dark-mode") === "enabled") {
        body.classList.add("dark-mode");
    }

    // Toggle dark mode on button click
    themeToggle.addEventListener("click", function() {
        body.classList.toggle("dark-mode");
        
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("dark-mode", "enabled");
        } else {
            localStorage.setItem("dark-mode", "disabled");
        }
    });

    // Smooth transition effect
    document.querySelector(".intro").style.opacity = "1";
});

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const logoutBtn = document.getElementById("logout-btn");

    // LOGIN FUNCTION
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();
            
            const savedUsername = localStorage.getItem("username");
            const savedPassword = localStorage.getItem("password");

            if (username === savedUsername && password === savedPassword) {
                localStorage.setItem("loggedIn", "true");
                window.location.href = "/";
            } else {
                document.getElementById("error-message").textContent = "Invalid username or password!";
            }
        });
    }

    // SIGNUP FUNCTION
    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();
            
            const newUsername = document.getElementById("new-username").value.trim();
            const newPassword = document.getElementById("new-password").value.trim();
            const signupMessage = document.getElementById("signup-message");

            if (!newUsername || !newPassword) {
                signupMessage.textContent = "Please fill in all fields.";
                signupMessage.style.color = "red";
                return;
            }

            if (localStorage.getItem("username") === newUsername) {
                signupMessage.textContent = "Username already exists! Try a different one.";
                signupMessage.style.color = "red";
                return;
            }

            localStorage.setItem("username", newUsername);
            localStorage.setItem("password", newPassword);

            signupMessage.textContent = "Account created successfully! Redirecting to login...";
            signupMessage.style.color = "green";

            setTimeout(() => {
                window.location.href = "/login"; // Corrected redirect path
            }, 2000);
        });
    }

    // CHECK LOGIN STATUS
    window.checkLogin = function () {
        if (localStorage.getItem("loggedIn") !== "true") {
            window.location.href = "/login";
        }
    };

    // LOGOUT FUNCTION
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("loggedIn");
            window.location.href = "/login";
        });
    }
});
