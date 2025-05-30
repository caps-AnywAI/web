// mypage.js

document.addEventListener("DOMContentLoaded", () => {
  const token  = localStorage.getItem("authToken");
  const userId = localStorage.getItem("loginUserId");

  // — 로그인 체크
  if (!token || !userId) {
    alert("로그인이 필요합니다.");
    return location.replace("login.html");
  }

  // — /api/v1/members/{id} 엔드포인트 호출 (GET)
  fetch(`${BASE_URL}/api/v1/members/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`      // 로그인 때 받은 헤더 값: "Bearer ... 토큰"
    }
  })
    .then(async res => {
      if (res.status === 401) {
        // 인증 실패 시 재로그인
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        localStorage.clear();
        return location.replace("login.html");
      }
      if (!res.ok) {
        throw new Error("프로필 조회 실패");
      }
      return res.json();
    })
    .then(({ success, data, message }) => {
      if (!success) {
        throw new Error(message || "프로필 조회 실패");
      }
      // data: { id, name, phone, email, ... }
      document.getElementById("user-name").textContent  = `${data.name} 님`;
      //document.getElementById("user-id").textContent    = data.id;
      //document.getElementById("user-phone").textContent = data.phone;
      //document.getElementById("user-email").textContent = data.email;
    })
    .catch(err => {
      console.error(err);
      alert(err.message || "프로필을 불러오는 중 오류가 발생했습니다.");
    });

  // — 로그아웃 버튼
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      // /api/v1/auth/logout 호출이 필요하면 여기 추가
      localStorage.clear();
      location.replace("login.html");
    });
  }
});
