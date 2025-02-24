document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    if (localStorage.getItem("dark-mode") === "enabled") {
        body.classList.add("dark-mode");
    }

    themeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("dark-mode", "enabled");
        } else {
            localStorage.setItem("dark-mode", "disabled");
        }
    });

    document.querySelector(".intro").style.opacity = "1";
});

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const logoutBtn = document.getElementById("logout-btn");

    if (loginForm) {
        loginForm.addEventListener("submit", async function (e) {
            e.preventDefault();
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();
            const errorMessage = document.getElementById("error-message");

            if (errorMessage) {
                errorMessage.textContent = "";
            }

            try {
                const response = await fetch("/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams({ username, password }),
                });

                const result = await response.text();

                if (response.ok && !result.includes("Invalid Credentials")) {
                    localStorage.setItem("loggedIn", "true");

                    window.location.href = "/";
                } else {
                    if (errorMessage) {
                        errorMessage.textContent = "Invalid username or password!";
                    }
                }
            } catch (error) {
                console.error("Login request failed:", error);
                if (errorMessage) {
                    errorMessage.textContent = "Something went wrong. Please try again.";
                }
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const newUsername = document.getElementById("new-username").value.trim();
            const newPassword = document.getElementById("new-password").value.trim();
            const signupMessage = document.getElementById("signup-message");

            if (!newUsername || !newPassword) {
                signupMessage.textContent = "Please fill in all fields.";
                signupMessage.style.color = "red";
                return;
            }

            const response = await fetch("/signup", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ "new-username": newUsername, "new-password": newPassword })
            });

            if (response.ok) {
                signupMessage.textContent = "Account created successfully! Redirecting to login...";
                signupMessage.style.color = "green";
                setTimeout(() => window.location.href = "/login", 2000);
            } else {
                const errorText = await response.text();
                signupMessage.textContent = errorText;
                signupMessage.style.color = "red";
            }
        });
    }

    window.checkLogin = function () {
        if (localStorage.getItem("loggedIn") !== "true") {
            window.location.href = "/login";
        }
    };

    if (logoutBtn) {
        logoutBtn.addEventListener("click", async function () {
            await fetch("/logout", { method: "GET" });
            localStorage.removeItem("loggedIn");
            window.location.href = "/login";
        });
    }
});
