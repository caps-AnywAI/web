<details>
<summary>📁 프로젝트 구조 보기</summary>

```plaintext
anywAI-web/
├── index.html                  # 메인 페이지
├── pages/
│   ├── login.html              # 로그인 페이지
│   ├── signup.html             # 회원가입 페이지
│   ├── mypage.html             # 마이페이지 (로그인 시 접근 가능)
│   ├── balance.html            # AI 추천 밸런스 게임 페이지
│   ├── result.html             # 추천 결과 페이지
│   └── detail.html             # 축제 상세 페이지
├── js/
│   ├── auth.js                 # 로그인 상태 확인 및 로그아웃 처리
│   ├── index.js                # index.html 클릭 제어 (로그인 여부 확인 등)
│   ├── signup.js               # 회원가입 처리 로직
│   ├── login.js                # 로그인 처리 로직
│   ├── balance.js              # 밸런스 게임 질문 및 응답 저장
│   ├── mypage.js               # 마이페이지 전용 동작 처리
│   └── result.js               # 결과 페이지 동작 처리
├── assets/
│   ├── css/
│   │   ├── signup.css          # 회원가입 페이지 전용 CSS
│   │   └── login.css           # 로그인 페이지 전용 CSS
│   └── images/
│       ├── mascot.png
│       ├── ex.png              # 축제 예시 이미지
│       └── festival.png        # 축제 포스터 예시 이미지
