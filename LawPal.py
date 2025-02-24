from flask import Flask, render_template, redirect, url_for, session, request, jsonify
import json
import os

app = Flask(__name__)
app.secret_key = "your_secret_key"  
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"

USER_DB_FILE = "users.json"

def load_users():
    if not os.path.exists(USER_DB_FILE):
        return {}
    with open(USER_DB_FILE, "r") as file:
        return json.load(file)

def save_users(users):
    with open(USER_DB_FILE, "w") as file:
        json.dump(users, file, indent=4)

users = load_users()

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "").strip()
        users = load_users()

        print(f"Attempting login: {username}, {password}") 

        if username in users and users[username] == password:
            session["user"] = username
            print(f"Login successful for: {username}")

            if request.headers.get("X-Requested-With") == "XMLHttpRequest":
                return jsonify({"success": True, "redirect": url_for("home")})

            return redirect(url_for("home"))

        print("Invalid username or password")
        return render_template("login.html", error="Invalid Credentials"), 401

    return render_template("login.html")


@app.route("/signup", methods=["GET", "POST"])  
def signup():
    if request.method == "POST":
        newusername = request.form.get("new-username", "").strip()
        newpassword = request.form.get("new-password", "").strip()
        users = load_users() 

        if not newusername or not newpassword:
            return render_template("signup.html", error="Username and password are required.")

        if newusername in users:
            return render_template("signup.html", error="Username already exists.")

        users[newusername] = newpassword 
        save_users(users)  
        print(f"New user signed up: {newusername}") 
        
        return redirect(url_for("login"))

    return render_template("signup.html")

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
    print("User logged out") 
    return redirect(url_for("login"))


if __name__ == "__main__":
    app.run(debug=True)
