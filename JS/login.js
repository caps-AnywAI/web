// login.js

// config.js 에서 불러온 BASE_URL
// export const BASE_URL = "http://localhost:8080";
import { BASE_URL } from "./config.js";

const loginBtn = document.getElementById("login-btn");
const idInput  = document.getElementById("user-id");
const pwInput  = document.getElementById("user-password");

loginBtn.addEventListener("click", () => {
  const userId = idInput.value.trim();
  const userPw = pwInput.value.trim();

  if (!userId || !userPw) {
    return alert("아이디와 비밀번호를 입력해주세요.");
  }

  // GET 방식이 명세라면, body 대신 쿼리스트링으로 전송
  const params = new URLSearchParams({ id: userId, password: userPw });

  fetch(`${BASE_URL}/api/v1/auth/login?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json" // GET에도 넣어도 무방
    }
  })
    .then(async (res) => {
      if (!res.ok) throw new Error("로그인 실패 (서버 응답 오류)");

      // 백엔드가 응답 헤더에 토큰을 담아 보내면 꺼내서 저장
      const token = res.headers.get("authorization");
      const result = await res.json();

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
