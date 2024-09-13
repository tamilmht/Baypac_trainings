from flask import Flask, session, render_template

app = Flask(__name__)
# secret_key = app.secret_key = '!@#$%^&*qwertyui234567'

@app.route('/')
def home_page():
    return 'This is HomePage!'

if __name__ == '__main__':
    app.run(debug = True)
