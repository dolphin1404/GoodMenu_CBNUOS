from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

# 학식 메뉴 데이터 저장소
menu_data = {}

@app.route('/')
def index():
    return render_template('index.html', menu_data=menu_data)

@app.route('/update_menu', methods=['POST'])
def update_menu():
    global menu_data
    menu_data = request.get_json()
    with open('menu_data.json', 'w') as file:
        json.dump(menu_data, file)
    return "Menu updated", 200

if __name__ == '__main__':
    app.run(debug=True)
