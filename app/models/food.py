# pip install requests beautifulsoup4
import requests

# 이대 홈페이지는 동적 js 렌더링 구조 정적이 아니라 동적으로 가져와야함.
# pip install selenium
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
import re
import time


# 파싱

# 주말 체크 함수
def is_weekend(date_str):
    date_obj = datetime.strptime(date_str, "%Y-%m-%d")
    return date_obj.weekday() >= 5  # 5: 토요일, 6: 일요일

#사용자 쿼리 파싱
def parse_user_query(query):
    today = datetime.today()
    date=None

    # 날짜 파싱
    if "오늘" in query:
        date = today.strftime("%Y-%m-%d")
    elif "내일" in query:
        date = (today + timedelta(days=1)).strftime("%Y-%m-%d")
    else:
        match = re.search(r"(\d{1,2})월\s*(\d{1,2})일", query)
        if match:
            month, day = match.groups()
            year = today.year
            try:
                date_obj = datetime(year, int(month), int(day))
                date = date_obj.strftime("%Y-%m-%d")
            except ValueError:
                date = today.strftime("%Y-%m-%d")  # 잘못된 날짜면 오늘로 fallback


    # 식당 파싱
    if "공학관" in query or "공대" in query:
        articleNo = "1"
        location = "공대 식당"
    elif "진선미관" in query:
        articleNo = "2"
        location = "진선미관 식당"
    else:
        articleNo = "1"
        location = "공대 식당"

    return date, articleNo, location

# 🍽️ Selenium으로 메뉴 크롤링
def fetch_menu_with_selenium(url):
    options = Options()
    options.add_argument("--headless")
    driver = webdriver.Chrome(options=options)

    driver.get(url)
    time.sleep(3)  # JS 렌더링 대기

    soup = BeautifulSoup(driver.page_source, "html.parser")
    driver.quit()

    menu_wrap = soup.find("div", class_="menu-table-wrap")
    if not menu_wrap:
        return "메뉴 영역을 찾을 수 없습니다."

    menu_tables = menu_wrap.find_all("div", class_="menu-table")
    if not menu_tables:
        return "메뉴 테이블을 찾을 수 없습니다."

    result = ""
    for table in menu_tables:
        title = table.find("h4")
        result += f"\n🍽️ {title.get_text(strip=True) if title else '식당'}\n"
        result += table.get_text(strip=True) + "\n"

    return result.strip()

# 🧾 전체 메뉴 조회 함수
def fetch_menu_by_query(query):
    date, articleNo, location = parse_user_query(query)

    if is_weekend(date):
        return f"⚠️ {location} | {date}\n\n해당 날짜는 주말이라 식당이 운영되지 않을 수 있어요."

    url = f"https://www.ewha.ac.kr/ewha/life/restaurant.do?mode=view&articleNo={articleNo}&srDt={date}"
    menu_text = fetch_menu_with_selenium(url)
    return f"{location} | {date}\n\n{menu_text}"

# 테스트
if __name__ == "__main__":
    query = "오늘 공학관 학식 메뉴 알려줘"

    # 디버깅용으로 직접 파싱 결과 확인
    date, articleNo, location = parse_user_query(query)
    print(f"[DEBUG] Parsed date: {date}, articleNo: {articleNo}, location: {location}")

    # 메뉴 조회
    menu = fetch_menu_by_query(query)
    print(menu)
