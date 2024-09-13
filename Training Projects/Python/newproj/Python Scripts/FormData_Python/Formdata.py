from flask import Flask,render_template,request

app = Flask(__name__)

@app.route("/")
def homepage():
    return render_template('welcome.html')

@app.route("/form")
def form():
    return render_template('Formdata.html')

@app.route("/formdata",methods = ['POST','GET'])
def formdata():
    if request.method == 'POST':
        result = request.form
        print(result)
        return render_template('formresult.html',formdata = result)

if __name__ == "__main__":
    app.run(debug = True)