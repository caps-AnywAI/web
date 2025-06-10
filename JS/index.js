document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("authToken");
  const container = document.getElementById("auth-buttons");

  const listContainer = document.getElementById("festival-list");
  const whitelist = ["login-btn"];

  container.innerHTML = "";

  if (token) {
    // ✅ 로그인 상태 → 로그아웃 버튼 생성
    const logoutBtn = document.createElement("button");
    logoutBtn.textContent = "로그아웃";
    logoutBtn.id = "logout-btn";
    logoutBtn.className =
      "bg-white text-[#58abf7] px-4 py-1 rounded-full font-semibold text-sm shadow";
    logoutBtn.onclick = () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("loginUserId");
      alert("로그아웃되었습니다.");
      location.reload(); // 상태 반영
    };

    container.appendChild(logoutBtn);
  } else {
    // ✅ 비로그인 상태 → 기존 로그인 버튼 HTML 구조로 생성
    const loginLink = document.createElement("a");
    loginLink.href = "pages/login.html";

    const loginBtn = document.createElement("button");
    loginBtn.id = "login-btn";
    loginBtn.className =
      "bg-white text-[#58abf7] px-4 py-1 rounded-full font-semibold text-sm shadow";
    loginBtn.textContent = "로그인";

    loginLink.appendChild(loginBtn);
    container.appendChild(loginLink);
  }

  async function loadFestivals() {
  try {
    const res = await fetch("http://localhost:8080/api/v1/recommendation/festivals/random");
    const result = await res.json();

    if (result.success && Array.isArray(result.data)) {
      result.data.forEach(festival => {
        const card = document.createElement("div");
        card.className = "bg-white p-4 sm:p-6 rounded-2xl shadow-md text-center w-full";

        card.innerHTML = `
          <img src="${festival.imageUrl}" alt="${festival.title} 포스터"
            class="rounded-full mb-6 border w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto object-cover" />

          <h2 class="text-lg sm:text-xl font-semibold mb-2">${festival.title}</h2>
          <p class="text-gray-600 text-sm mb-1">${festival.city}</p>
          <p class="text-gray-500 text-sm mb-4">${festival.startDate} ~ ${festival.endDate}</p>

          <a href="pages/detail.html?id=${festival.id}">
            <button class="bg-gray-100 hover:bg-gray-200 px-4 sm:px-6 py-2 rounded-md text-sm sm:text-base">
              바로가기 →
            </button>
          </a>
        `;

        listContainer.appendChild(card);
      });
    } else {
      alert("축제 정보를 불러오는 데 실패했습니다.");
    }
  } catch (error) {
    console.error(error);
    alert("서버 연결에 실패했습니다.");
  }
}


  loadFestivals();

  document.body.addEventListener("click", (e) => {
    const target = e.target.closest("a, button");
    if (!target) return;

    // 2) whitelist 에 있는 ID는 로그인 체크 제외
    if (target.id && whitelist.includes(target.id)) return;

    // 3) AI 추천 버튼 클릭 분기
    if (target.id === "recommend-btn") {
      // 로그인 안 된 상태 → 로그인 페이지로 이동
      if (!token) {
        alert("로그인 후 이용 가능합니다.");
        location.href = "pages/login.html";
        return;
      }
      // 로그인 된 상태 → 추천 페이지로 이동
      location.href = "pages/result.html";
      return;
    }

    // 3) AI 추천 버튼 클릭 분기
    if (target.id === "recommend-btn") {

      // 로그인 된 상태 → 추천 페이지로 이동
      e.preventDefault();
      location.href = "pages/result.html";
      return;
    }
  });
});