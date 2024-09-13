from flask import Flask, render_template

app = Flask(__name__)

@app.route('/hello/<user>')
def hello_user(user):
    return render_template('template.html',name = user)

@app.route('/rank/<int:score>')
def rank_score(score):
    data = 'You passed!' if score >= 50 else 'You Failed the subject' 
    return render_template('template.html',name = data)

if __name__ == '__main__':
    app.run(debug = True)