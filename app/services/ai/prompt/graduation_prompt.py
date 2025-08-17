# 입학년도 교과과정 pdf 파싱
# 질문 : 졸업하려면 몇 학점 들어야 해? (사용자의 남은 졸업 학점이 아닌 전공에 기반)

from app.models.graduation import graduation_data
from datetime import datetime


def get_year_group(user):
   current_year=datetime.now()
   entrance_year=current_year-user.grade+1

   if entrance_year<=2019:
      return "19학번 이전"
   elif entrance_year<=2023:
      return "20~23학번"
   else:
      return "24학번 이후"


def build_graduation_prompt(user, message):
   year_group = get_year_group(user, message)
   data=graduation_data.get(year_group, {})

   return f"""당신은 대학 졸업 요건을 안내하는 챗봇입니다. 
사용자 정보: {user.school} / {user.major} / {user.grade}학년
질문: {message}
응답 흐름 :
1. 사용자 정보 확인 및 인사말 제공
- 예 : "{user.school}  {user.major} 기준으로 알려드릴게요!" 
2. 전공 유형 확인
   - 주전공 외에 복수전공, 연계전공, 부전공 여부 확인
   - 없을 경우 "단일 전공 기준으로 안내드릴게요" 등 안내
3. 입학년도 교과과정 문서 조회
   - 해당 전공의 졸업 요건(총 이수 학점, 전공 필수/선택, 교양 등) 파악

4. 카드형 UX로 요약 제공
   - 예시:
     [🎓 졸업 요건 요약]
     - 총 이수 학점: {data.get("졸업학점", "❓")}학점
     - 전공기초: {data.get("전공기초", "❓")}학점
     - 최소전공이수: {data.get("최소전공이수", "❓")}학점
     - 교양: {data.get("교양", "❓")}학점
     - 복수전공: {data.get("복수전공", "❓")}

5. 추가 안내 및 질문 유도
   - "복수전공을 고려 중이신가요?" 또는 "현재까지 이수한 학점을 알려주시면 남은 학점도 계산해드릴게요!"
"""
