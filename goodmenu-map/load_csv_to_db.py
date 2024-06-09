import sqlite3
import pandas as pd

# CSV 파일 경로
csv_file = 'stores.csv'

# SQLite 데이터베이스 경로
database_file = 'stores.db'

# 데이터베이스 연결
conn = sqlite3.connect(database_file)
cursor = conn.cursor()

# 테이블 생성
cursor.execute('''
CREATE TABLE IF NOT EXISTS stores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT,
    menu TEXT,
    link TEXT,
    latitude REAL,
    longitude REAL
)
''')

# CSV 파일 읽기
df = pd.read_csv(csv_file)

# 데이터 삽입
df.to_sql('stores', conn, if_exists='replace', index=False)

# 커밋하고 연결 종료
conn.commit()
conn.close()
