

document.addEventListener("DOMContentLoaded", () => {
  const festivalContainer = document.getElementById("festival-list");
  const tagContainer      = document.getElementById("tag-container");

  // — 1) 사용자 선택 테마 세션에서 꺼내 와서 태그로 표시
  const answers = JSON.parse(sessionStorage.getItem("answers")) || [];
  const uniqueThemes = [...new Set(answers)];
  // 키 → 한글 레이블 매핑
  const labelMap = {
    nature:      "자연",
    urban:       "도시",
    healing:     "힐링",
    activity:    "액티비티",
    traditional: "전통",
    new:         "새로움",
    food:        "음식",
    experience:  "경험",
    popular:     "인기",
    hidden:      "숨겨진",
    quiet:       "고요",
    lively:      "활발"
  };

  uniqueThemes.forEach(theme => {
    const span = document.createElement("span");
    span.className = "bg-[#60B7FF] text-white rounded-full px-5 py-2 text-sm font-medium";
    span.textContent = `#${labelMap[theme] || theme}`;
    tagContainer.appendChild(span);
  });

  // — 2) 추천 API 호출 (/api/v1/recommendation/festivals)
  const token  = localStorage.getItem("authToken");
  if (!token) {
    alert("로그인이 필요합니다.");
    return location.href = "login.html";
  }

  fetch(`${BASE_URL}/api/v1/recommendation/festivals`, {
    method: "GET",
    headers: {
      "Content-Type":  "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then(res => {
      if (!res.ok) {alert("선호도 분석 결과가 없습니다.\n추천을 위해서는 테마를 선택해주세요.");
      return location.href = "balance.html";
      } else {
    return res.json(); // 성공 시 반환
      }
    })
    .then(({ success, data, message }) => {
      if (!success) {
        throw new Error(message || "추천 목록 조회 실패");
      }

      // — 3) 받아온 축제 데이터 렌더링
      data.forEach(festival => {
        const card = document.createElement("div");
        card.className = `
          flex flex-col sm:flex-row
          bg-white w-full max-w-4xl p-6
          rounded-2xl shadow-md
          items-center justify-between mb-6
        `;

        card.innerHTML = `
          <!-- 이미지 -->
          <div class="w-full sm:w-1/3 h-48 bg-cover bg-center rounded-xl mb-4 sm:mb-0"
               style="background-image: url('${festival.imageUrl}');">
          </div>
          <!-- 제목 + 버튼 -->
          <div class="flex-1 sm:ml-6 flex flex-col items-center sm:items-start">
            <div class="text-xl sm:text-2xl font-black text-[#363636] mb-2">
              ${festival.title}
            </div>
            <div class="text-sm text-gray-500 mb-4">
              ${festival.startDate} ~ ${festival.endDate} | ${festival.city}
            </div>
            <a href="detail.html?id=${festival.id}"
               class="px-6 py-2 bg-white border border-[#E2E2E2]
                      rounded-xl text-sm text-[#6D6D6D]
                      hover:bg-gray-100 hover:shadow transition">
              상세 보기 ➜
            </a>
          </div>
        `;
        festivalContainer.appendChild(card);
      });
    })
    .catch(err => {
      console.error(err);
      alert(err.message);
    });
});
