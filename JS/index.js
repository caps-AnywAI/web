
  // 공통 클릭 방지 처리
  document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // 제외할 ID나 href
    const whitelist = ["login-btn"];

    // 클릭 이벤트 가로채기
    document.body.addEventListener("click", (e) => {
      const target = e.target.closest("a, button");
      if (!target) return;

      // 로그인된 경우는 그냥 통과
      if (isLoggedIn === "true") return;

      // 로그인 버튼 클릭은 허용
      if (target.id && whitelist.includes(target.id)) return;

      // 로그인 안 된 상태에서 다른 거 누르면 로그인 요구
      e.preventDefault();
      alert("로그인 후 이용 가능합니다.");
      location.href = "pages/login.html";
    });
  });

