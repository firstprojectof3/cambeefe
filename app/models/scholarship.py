from bs4 import BeautifulSoup
from selenium import webdriver

def scholarship_data():
    
    driver = webdriver.Chrome()
    driver.get("https://www.ewha.ac.kr/ewha/bachelor/scholarship-info.do")
    soup = BeautifulSoup(driver.page_source, "html.parser")
    driver.quit()

    text = soup.get_text()
    scholarships = {
        "학비감면 장학금": [],
        "학업보조비 지원 장학금": [],
        "봉사 및 활동 장학금": []
    }

    # 카테고리별 키워드로 텍스트 분할
    sections = {
        "학비감면 장학금": "국가 장학금(Ⅰ,Ⅱ유형)",
        "학업보조비 지원 장학금": "지혜로운 인재 H",
        "봉사 및 활동 장학금": "실천하는 인재 E"
    }

    for category, marker in sections.items():
        start = text.find(marker)
        if start == -1:
            continue
        next_markers = [v for k, v in sections.items() if k != category]
        end = min([text.find(m, start) for m in next_markers if text.find(m, start) != -1] + [len(text)])
        section_text = text[start:end]

        # 장학금 이름 추출
        lines = section_text.split("장학금")
        for line in lines:
            parts = line.strip().split()
            if parts:
                name = parts[-1]
                if name and len(name) < 20:
                    scholarships[category].append(name + " 장학금")


    return scholarships

data = scholarship_data()
for category, items in data.items():
    print(f"\n[{category}]")
    for item in items:
        print("-", item)
