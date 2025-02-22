from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/signup.html')
def signup():
    return render_template('signup.html')

@app.route('/police-section.html')
def police_section():
    return render_template('policesection.html')

@app.route('/citizen-section.html')
def citizen_section():
    return render_template('citizensection.html')

if __name__ == '__main__':
    app.run(debug=True)
