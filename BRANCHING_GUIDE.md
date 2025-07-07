# 🧭 GitHub 브랜치 전략 & 협업 가이드

## ✅ 브랜치 구조 이해

### 🔹 main 브랜치

* 최종본(배포용) 코드만 존재
* 직접 작업 ❌
* \*\*오직 Pull Request(PR)\*\*를 통해서만 merge

### 🔹 dev 브랜치

* 팀 전체 기능 통합 공간
* 모든 개인 브랜치(feature/\~\~)는 dev로 PR을 보냄
* 개발 중간 테스트나 확인은 여기서 진행

### 🔹 feature/ 브랜치 (개인 작업용)

* 각자 작업할 기능별로 새로 만드는 브랜치
* 기능 단위로 브랜치명을 의미 있게 작성
* 작업 후 dev로 PR을 보냄

---

## ✅ 브랜치 네이밍 규칙

형식: `종류/작업내용 (영문 소문자, kebab-case)`

| 종류       | 설명                  | 예시                    |
| -------- | ------------------- | --------------------- |
| feature  | 새로운 기능 추가           | `feature/chat-input`  |
| fix      | 버그 수정               | `fix/calendar-bug`    |
| style    | 스타일 수정 (UI, 포맷팅 등)  | `style/button-hover`  |
| refactor | 코드 구조 변경 (기능 변화 없음) | `refactor/chat-state` |

---

## ✅ 작업 흐름 예시

1. dev에서 새 브랜치 생성

```bash
git checkout dev
git pull
git checkout -b feature/chat-input
```

2. 작업 후 커밋 & 푸시

```bash
git add .
git commit -m "feat: 채팅 입력창 UI 구성"
git push origin feature/chat-input
```

3. GitHub에서 Pull Request 생성

* base: `dev`
* compare: `feature/chat-input`
* 제목 예시: `feat: 채팅 입력창 UI 구성`
* 본문: 작업 내용 요약 (예: 구현 내용, 확인 요청 등)

4. 팀원 1명 이상 리뷰 후 dev로 merge

---

## ✅ 커밋 메시지 규칙 (권장)

| 태그       | 설명            |
| -------- | ------------- |
| feat     | 새로운 기능 추가     |
| fix      | 버그 수정         |
| style    | 스타일/포맷 수정     |
| docs     | 문서 작성/수정      |
| refactor | 코드 구조 리팩토링    |
| chore    | 설정/빌드 등 기타 작업 |

예시:

```bash
git commit -m "feat: 로그인 페이지 레이아웃 구현"
git commit -m "fix: 버튼 클릭 이벤트 중복 해결"
```

---

## ✅ 요약 정리

* `main`: 절대 직접 작업하지 말고, PR로만 머지 (완성본)
* `dev`: 모든 기능 브랜치가 합쳐지는 곳 (작업 베이스)
* `feature/~~`: 실제로 내가 작업하는 브랜치 (기능 단위)

➡️ 브랜치 이름, 커밋 메시지, PR 제목은 모두 **일관된 규칙**으로 작성하기


