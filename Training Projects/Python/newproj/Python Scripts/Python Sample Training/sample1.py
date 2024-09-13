from flask import Flask,redirect,url_for
app = Flask(__name__)

@app.route('/')
def welcome_login():
    return 'Welcome Everyone'

@app.route('/admin')
def admin_login():
    return 'Hello Admin'

@app.route('/guest/<guest>')
def guest_login(guest):
    return 'Hello Guest User : %s'%guest

@app.route('/user/<name>')
def user_login(name):
    if name == 'admin' or name == 'Admin' or name == 'ADMIN':
        return redirect(url_for('admin_login'))
    else:
        return redirect(url_for('guest_login',guest = name))

if __name__ == '__main__':
    app.run(debug = True)