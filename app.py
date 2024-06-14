from flask import Flask, request, jsonify, render_template
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

CLIENT_ID = '93gqruosnz'
CLIENT_SECRET = 'wwhL7ZSwyGFCz8dXySeQt2fPAmNosUMhdNODxOp8' # 이미 바뀐 키

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/route')
def get_route():
    start = request.args.get('start')
    goal = request.args.get('goal')
    url = f"https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?start={start}&goal={goal}&option=trafast"
    
    headers = {
        'X-NCP-APIGW-API-KEY-ID': CLIENT_ID,
        'X-NCP-APIGW-API-KEY': CLIENT_SECRET
    }
    
    response = requests.get(url, headers=headers)
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True)