from flask import Flask, render_template, redirect, url_for, session, request, jsonify
import json
import os

app = Flask(__name__)
app.secret_key = "your_secret_key"  
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"

USER_DB_FILE = "users.json"

# Function to load users from JSON file
def load_users():
    if not os.path.exists(USER_DB_FILE):
        return {}
    with open(USER_DB_FILE, "r") as file:
        return json.load(file)

# Function to save users to JSON file
def save_users(users):
    with open(USER_DB_FILE, "w") as file:
        json.dump(users, file)

users = load_users()

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        users = load_users()  # Load latest users

        print(f"Attempting login: {username}, {password}")  # Debugging

        if username in users and users[username] == password:
            session["user"] = username
            print(f"Login successful for: {username}")
            return redirect(url_for("home"))
        else:
            print("Invalid username or password")
            return render_template("login.html", error="Invalid Credentials")

    return render_template("login.html")


@app.route("/signup", methods=["GET", "POST"])  # FIXED: Corrected URL path
def signup():
    if request.method == "POST":
        newusername = request.form.get("new-username")
        newpassword = request.form.get("new-password")
        
        if newusername in users:
            return render_template("signup.html", error="Username already exists")
        
        users[newusername] = newpassword  # Store password securely in production
        print("New user signed up:", newusername)  # Debugging
        
        return redirect(url_for("login"))

    return render_template("signup.html")  # FIXED: Render correct template

@app.route("/police-section")
def police_section():
    if "user" not in session:
        return redirect(url_for("login"))
    return render_template("policesection.html")

@app.route("/citizen-section")
def citizen_section():
    if "user" not in session:
        return redirect(url_for("login"))
    return render_template("citizensection.html")

@app.route("/logout")
def logout():
    session.pop("user", None)
    print("User logged out")  # Debugging
    return redirect(url_for("login"))


if __name__ == "__main__":
    app.run(debug=True)
