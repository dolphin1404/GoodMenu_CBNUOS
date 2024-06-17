from flask import Flask, request, jsonify, render_template
import requests
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

CLIENT_ID = '93gqruosnz'
CLIENT_SECRET = 'Pn0O5SEuntABB1OurAnkQQAqk2fZlKl3LrYvSa6c'  # 이미 바뀐 키

# 학식 메뉴 데이터 저장소
menu_data = {}

@app.route('/')
def index():
    return render_template('index.html', menu_data=menu_data)

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

@app.route('/update_menu', methods=['POST'])
def update_menu():
    global menu_data
    menu_data = request.get_json()
    with open('menu_data.json', 'w', encoding='utf-8') as file:
        json.dump(menu_data, file, ensure_ascii=False, indent=4)
    return "Menu updated", 200

if __name__ == '__main__':
    app.run(debug=True)
