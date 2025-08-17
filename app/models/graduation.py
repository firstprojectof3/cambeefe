from bs4 import BeautifulSoup
from selenium import webdriver

def graduation_data():
    driver = webdriver.Chrome()
    driver.get("https://cse.ewha.ac.kr/cse/academic/curriculum.do")
    soup = BeautifulSoup(driver.page_source, "html.parser")
    driver.quit()

    graduation_table = {}
    rows = soup.find_all("tr")

    for row in rows:
        cols = [td.get_text(strip=True) for td in row.find_all(["td", "th"])]
        if len(cols) == 4 and cols[0] in ["교양*", "전공기초", "최소전공이수", "졸업학점"]:
            graduation_table.setdefault("19학번 이전", {})[cols[0].replace("*", "")] = int(cols[1].replace("(", "").replace(")", "").replace("학점", ""))
            graduation_table.setdefault("20~23학번", {})[cols[0].replace("*", "")] = int(cols[2].replace("학점", ""))
            graduation_table.setdefault("24학번 이후", {})[cols[0].replace("*", "")] = int(cols[3].replace("학점", ""))

    # 복수전공은 텍스트에서 따로 추출
    text = soup.get_text()
    if "복수전공" in text:
        for key in graduation_table:
            graduation_table[key]["복수전공"] = "전공기초 32학점 + 전공 51학점 + 졸업프로젝트"

    return graduation_table

data=graduation_data()
