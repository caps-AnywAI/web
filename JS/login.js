const loginBtn = document.getElementById("login-btn");
const idInput = document.getElementById("user-name");  
const pwInput = document.getElementById("user-password");

loginBtn.addEventListener("click", function () {
  const userId = idInput.value.trim();
  const userPw = pwInput.value.trim();

  if (!userId || !userPw) {
    alert("아이디와 비밀번호를 입력해주세요.");
    return;
  }

  fetch(`${BASE_URL}/login`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: userId,         //  API 명세상 name
      password: userPw
    })
  })
    .then(async (response) => {
      const token = response.headers.get("authorization"); // Bearer ~~~
      const result = await response.json();

      if (!response.ok || !result.success || !token) {
        alert("로그인 실패: 아이디 또는 비밀번호가 잘못되었습니다.");
        return;
      }

      // ✅ 토큰과 사용자 ID 저장
      localStorage.setItem("authToken", token);
      localStorage.setItem("loginUserId", userId);

      alert("로그인 성공!");
      location.href = "../index.html"; // 로그인 후 이동할 페이지
    })
    .catch((error) => {
      console.error("로그인 중 오류:", error);
      alert("서버 연결 실패");
    });
});
