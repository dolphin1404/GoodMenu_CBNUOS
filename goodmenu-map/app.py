from flask import Flask, jsonify, render_template
import sqlite3

app = Flask(__name__)

# 데이터베이스 연결 함수
def get_db_connection():
    conn = sqlite3.connect('stores.db')
    conn.row_factory = sqlite3.Row
    return conn

# 매장 목록을 JSON으로 반환하는 엔드포인트
@app.route('/stores')
def get_stores():
    conn = get_db_connection()
    stores = conn.execute('SELECT * FROM stores').fetchall()
    conn.close()
    return jsonify([dict(ix) for ix in stores])

# HTML 페이지를 반환하는 엔드포인트
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
