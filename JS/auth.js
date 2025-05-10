document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("login-btn");
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userId = localStorage.getItem("userId");
  
    if (!loginBtn) return;
  
    if (isLoggedIn === "true") {
      loginBtn.textContent = "Logout";
      loginBtn.classList.add("bg-white", "text-[#58abf7]");
  
      loginBtn.addEventListener("click", () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userId");
        location.reload(); // 새로고침해서 상태 반영
      });
    } else {
      // 로그인 상태가 아니면 버튼이 로그인 기능 유지
      loginBtn.addEventListener("click", () => {
        location.href = "pages/login.html";
      });
    }
  });
  