// index.js

document.addEventListener("DOMContentLoaded", () => {
  // 토큰 기반 인증 확인
  const token = localStorage.getItem("authToken");

  // 클릭 시 로그인 체크에서 제외할 요소 ID 목록
  const whitelist = ["login-btn"];

  document.body.addEventListener("click", (e) => {
    const target = e.target.closest("a, button");
    if (!target) return;

    // 토큰이 있으면(로그인 상태) 그냥 통과
    if (token) return;

    // 로그인 버튼 클릭은 허용
    if (target.id && whitelist.includes(target.id)) return;

    // 이외에는 로그인 페이지로 이동
    e.preventDefault();
    alert("로그인 후 이용 가능합니다.");
    location.href = "pages/login.html";
  });
});
