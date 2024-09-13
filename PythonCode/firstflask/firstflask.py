from flask import Flask, request, session
from flask_cors import CORS, cross_origin
from config import *
from werkzeug.security import generate_password_hash,check_password_hash
from flask_session import Session

app = Flask(__name__)
CORS(app,support_credentials = True)
app.secret_key = '!@#$%^&*(234567)'
app.config['SESSION_PERMANENT'] = False
sess = Session()


@app.route('/')
def welcome():
    return 'HelloWorld!'


@app.route('/userlogin',methods=['POST'])
def userlogin():
    data = {}
    # data = dict((key,request.args.getlist(key)[0]) for key in request.args.keys()) #converts input props to json pairs IN GET
    for key,value in request.json.items():
        data[key] = value
    query = "select password from usersignup a \
            where a.effdt = (select max(a1.effdt) from usersignup a1 where a.email = a1.email and a.mobile = a1.mobile) \
                  and a.effseq= (select max(a1.effseq) from usersignup a1 where a.email = a1.email and a.mobile = a1.mobile and a.effdt = a1.effdt) \
                  and a.effstatus = 'A' and a.email = %(email)s"
    db_cursor.execute(query,data)
    if db_cursor.rowcount == 0:
        return 'User Not Found'
    else:
        if check_password_hash(db_cursor.fetchone()['password'],data['password']):
            session['email'] = data['email']
            return 'VALID'
        else:
            return 'Password Incorrect'
@app.route('/logout',methods=['GET'])
def userlogout():
    session.pop('email',None)
    return {'LogoutStatus' : True}

@app.route('/userSignUp',methods=['POST'])
#@cross_origin(supports_credentials=True)
def usersignup():
    data = {}
    for key,value in request.json.items():
        data[key] = value['data'] if key != 'password' else generate_password_hash(value['data'])
    # data['effstatus'] = 'A'
    # print(data)
    query = "insert into usersignup values (%(email)s,%(mobile)s,current_date, \
        coalesce((select max(effseq) from usersignup where email = %(email)s and mobile = %(mobile)s and effdt = current_date)+1,1)\
            ,'A',%(firstname)s,%(lastname)s,%(password)s)"
    db_cursor.execute(query,data)
    connection.commit()
    return data

@app.route('/getvalidateuser',methods=['GET'])
def getvalidateuser():
    req = dict((key,request.args.getlist(key)[0]) for key in request.args.keys())
    new_json = dict()
    new_json[req['validatefield']] = req['validatevalue']
    for key,val in new_json.items():
        query = "select * from usersignup a \
            where a.effdt = (select max(a1.effdt) from usersignup a1 where a.email = a1.email and a.mobile = a1.mobile) \
            and a.effseq= (select max(a1.effseq) from usersignup a1 where a.email = a1.email and a.mobile = a1.mobile and a.effdt = a1.effdt) \
            and a.effstatus = 'A' and a.%s = %s"
        db_cursor.execute(query,(AsIs(key),val))
        # print(db_cursor.rowcount)
        if db_cursor.rowcount == 1:
            return 'User Already Exists'
        else :
            return 'OK'

if __name__ == '__main__':
    app.run(debug = True)