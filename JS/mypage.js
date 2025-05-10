document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userId = localStorage.getItem("userId");
  
    const currentPage = location.pathname.split("/").pop(); // 예: "mypage.html"
  
    //  마이페이지일 때만 로그인 확인
    if (currentPage === "mypage.html" && isLoggedIn !== "true") {
      location.href = "../login.html";
      return;
    }
  
    //  tempUser에서 유저 정보 출력
    const currentUser = JSON.parse(localStorage.getItem("tempUser"));
  
    if (currentUser && currentUser.userId === userId) {
      const nameTag = document.getElementById("user-name");
      if (nameTag) nameTag.textContent = `${currentUser.username} 님`;
    }
  
    //  로그아웃
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userId");
        location.href = "login.html"; 
      });
    }
  });
  