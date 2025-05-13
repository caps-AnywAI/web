// signup.js

const signupBtn = document.getElementById("signup-btn");

signupBtn.addEventListener("click", function () {
  const userId = document.getElementById("user-id").value.trim();
  const userPw = document.getElementById("user-password").value.trim();
  const userPwConfirm = document.getElementById("user-password-confirm").value.trim();
  const username = document.getElementById("username").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const agree = document.getElementById("agree").checked;

  // 유효성 검사
  if (!userId || !userPw || !userPwConfirm || !username || !phone || !email) {
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

  const userData = {
    id: userId,
    password: userPw,
    name: username,
    phone: phone,
    email: email
  };

  fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("서버 응답 오류");
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        alert(`회원가입이 완료되었습니다! 환영합니다, ${data.data.name}님`);
        location.href = "login.html";
      } else {
        alert("회원가입 실패: " + (data.message || "알 수 없는 에러"));
      }
    })
    .catch(error => {
      console.error("에러 발생:", error);
      alert("서버 연결 실패 ");
    });
});
