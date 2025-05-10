const loginBtn = document.getElementById("login-btn");
const idInput = document.getElementById("user-id");
const pwInput = document.getElementById("user-password");

loginBtn.addEventListener("click", function () {
  const userId = idInput.value.trim();
  const userPw = pwInput.value.trim();

  if (!userId || !userPw) {
    alert("아이디와 비밀번호를 입력해주세요.");
    return;
  }

  // 🔥 회원가입 정보 불러오기
  const savedUser = JSON.parse(localStorage.getItem("tempUser"));

  // 🔍 정보 없는 경우
  if (!savedUser) {
    alert("회원가입된 사용자가 없습니다.");
    return;
  }

  // ✅ 아이디/비밀번호 일치 확인
  if (userId === savedUser.userId && userPw === savedUser.userPw) {
    alert("로그인 성공!");

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userId", userId);

    location.href = "../index.html";
  } else {
    alert("아이디 또는 비밀번호가 올바르지 않습니다.");
  }
});
