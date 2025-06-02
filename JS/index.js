document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("authToken");
  const whitelist = ["login-btn"];

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