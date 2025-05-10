const signupBtn = document.getElementById("signup-btn");

signupBtn.addEventListener("click", function () {
  const userId = document.getElementById("user-id").value.trim();
  const userPw = document.getElementById("user-password").value.trim();
  const userPwConfirm = document.getElementById("user-password-confirm").value.trim();
  const username = document.getElementById("username").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const agree = document.getElementById("agree").checked;

  // 유효성 검사
  if (!userId || !userPw || !userPwConfirm || !username || !phone) {
    alert("모든 정보를 입력해주세요.");
    return;
  }

  if (userPw !== userPwConfirm) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  if (!agree) {
    alert("개인정보 이용에 동의해주세요.");
    return;
  }

  // 회원정보 저장 (백엔드 연동 전: localStorage 사용)
  const userInfo = {
    userId,
    userPw,
    username,
    phone
  };
  localStorage.setItem("tempUser", JSON.stringify(userInfo));

  alert("회원가입이 완료되었습니다!");
  location.href = "login.html";
});
