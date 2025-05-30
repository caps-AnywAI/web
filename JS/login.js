// login.js

// config.js 에서 불러온 BASE_URL
// export const BASE_URL = "http://localhost:8080";

const loginBtn = document.getElementById("login-btn");
const idInput  = document.getElementById("user-id");
const pwInput  = document.getElementById("user-password");

loginBtn.addEventListener("click", () => {
  const userId = idInput.value.trim();
  const userPw = pwInput.value.trim();

  if (!userId || !userPw) {
    return alert("아이디와 비밀번호를 입력해주세요.");
  }

  // 로그인 요청을 백엔드로 보냄
  fetch(`${BASE_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: userId,
      password: userPw
    })
  })
    .then(async (res) => {
      if (!res.ok) throw new Error("로그인 실패 (서버 응답 오류)");

      // 백엔드가 응답 헤더에 토큰을 담아 보내면 꺼내서 저장
      const authorizationHeader = res.headers.get("Authorization");
      if (!authorizationHeader) {
        throw new Error("로그인 실패: 토큰이 없습니다.");
      }
      const token = authorizationHeader ? authorizationHeader.split(" ")[1] : null;
      const result = await res.json();

      console.log("로그인 응답:", result);
      console.log("토큰:", token);

      if (!result.success || !token) {
        throw new Error("로그인 실패: 아이디 또는 비밀번호를 확인해주세요.");
      }

      // 토큰과 유저 ID를 로컬에 저장
      localStorage.setItem("authToken", token);
      localStorage.setItem("loginUserId", result.data.id || userId);

      alert("로그인 성공!");
      location.href = "../index.html";
    })
    .catch((err) => {
      console.error("로그인 오류:", err);
      alert(err.message);
    });
});
