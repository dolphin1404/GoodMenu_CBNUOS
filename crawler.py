import requests
from bs4 import BeautifulSoup
import json

# 웹페이지의 URL
url = 'https://www.cbnucoop.com/service/restaurant/'

# 웹페이지에 GET 요청 보내기
response = requests.get(url)

# 페이지의 HTML 내용 파싱
soup = BeautifulSoup(response.text, 'html.parser')

# 점심 메뉴 추출 함수
def extract_lunch_menu(soup):
    # 모든 메뉴 항목 찾기
    menu_items = soup.find_all('div', class_='card menu-body')
    
    lunch_menu = []
    for item in menu_items:
        menu = {}
        # 메뉴 제목 가져오기
        menu['title'] = item.find('h6', class_='card-header').text.strip()
        
        # 반찬 목록 가져오기
        sides = item.find_all('li', class_='side')
        menu['sides'] = [side.text.strip() for side in sides]
        
        # 가격 가져오기
        prices = item.find_all('span', class_='add commas')
        menu['price'] = prices[0].text.strip()
        menu['discounted_price'] = prices[1].text.strip() if len(prices) > 1 else None
        
        lunch_menu.append(menu)
    
    return lunch_menu

# 점심 메뉴 추출
lunch_menu = extract_lunch_menu(soup)

# JSON 파일로 저장
with open('menu_data.json', 'w', encoding='utf-8') as json_file:
    json.dump(lunch_menu, json_file, ensure_ascii=False, indent=4)

print("메뉴 데이터가 menu_data.json 파일에 저장되었습니다.")
