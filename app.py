from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/police-section')
def police_section():
    return render_template('policesection.html')

@app.route('/citizen-section')
def citizen_section():
    return render_template('citizensection.html')

if __name__ == '__main__':
    app.run(debug=True)
