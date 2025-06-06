document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("authToken");
  const container = document.getElementById("auth-buttons");
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