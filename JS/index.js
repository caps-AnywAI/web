document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("authToken");
  const whitelist = ["login-btn"];

  document.body.addEventListener("click", (e) => {
    const target = e.target.closest("a, button");
    if (!target) return;

    // 1) 로그인 상태면 아무 처리 없이 통과
    if (token) {
      // (로그인 되어 있으면 추천 결과도 바로 이동시키도록 분기문 아래로 내려도 됩니다)
      return;
    }

    // 2) whitelist 에 있는 ID는 로그인 체크 제외
    if (target.id && whitelist.includes(target.id)) return;

    // 3) AI 추천 버튼 클릭 분기
    if (target.id === "recommend-btn") {
      // 로그인 안 된 상태 → 로그인 페이지로 이동
      alert("로그인 후 이용 가능합니다.");
      location.href = "pages/login.html";
      return;
    }

    // 4) 나머지 클릭(로그인 필요 페이지) → 로그인 페이지로
    e.preventDefault();
    alert("로그인 후 이용 가능합니다.");
    location.href = "pages/login.html";
  });
});
