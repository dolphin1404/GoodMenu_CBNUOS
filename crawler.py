import requests
from bs4 import BeautifulSoup
import json
import time

def crawl_menu():
    url = 'https://www.cbnucoop.com/service/restaurant/'  # 실제 학식 메뉴 URL로 변경
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    # 예시: 학식 메뉴 데이터 추출
    menu_data = {
        'Breakfast': ['EEEEE', 'Bacon', 'Toast'],
        'Lunch': ['Chicken Sandwich', 'Salad'],
        'Dinner': ['Spaghetti', 'Meatballs']
    }

    # 크롤링된 데이터를 파일에 저장
    with open('menu_data.json', 'w') as file:
        json.dump(menu_data, file)

    # Flask 서버에 데이터 업데이트 요청
    requests.post('http://127.0.0.1:5000/update_menu')

if __name__ == "__main__":
    while True:
        crawl_menu()
        time.sleep(3600)  # 1시간마다 크롤링
