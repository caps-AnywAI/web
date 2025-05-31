
const otpButtons = document.querySelectorAll(".email-group button");

const findIdForm = document.querySelector('form[action="/find-id"]');


const findPwForm = document.querySelector('form[action="/find-password"]');

 //인증번호

otpButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    
    const emailInput = btn.parentElement.querySelector("input[name='email']");
    const email = emailInput.value.trim();

    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }

    
    fetch(`${BASE_URL}/api/v1/members/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("서버 응답 오류(OTP 요청 실패)");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          alert("인증번호가 이메일로 발송되었습니다. 이메일을 확인해주세요.");
        } else {
          const msg = data.message || "인증번호 발송에 실패했습니다.";
          alert(`OTP 발송 실패: ${msg}`);
        }
      })
      .catch((error) => {
        console.error("OTP 요청 중 에러 발생:", error);
        alert("서버 연결 실패 또는 알 수 없는 오류가 발생했습니다.");
      });
  });
});

// 아이디 찾기기

if (findIdForm) {
  findIdForm.addEventListener("submit", (e) => {
    e.preventDefault();

 
    const nameInput  = findIdForm.querySelector("input[name='name']").value.trim();
    const emailInput = findIdForm.querySelector("input[name='email']").value.trim();
    const otpInput   = findIdForm.querySelector("input[name='otp']").value.trim();

 
    if (!nameInput || !emailInput || !otpInput) {
      alert("이름, 이메일, 인증번호를 모두 입력해주세요.");
      return;
    }

    const payload = {
      name: nameInput,
      email: emailInput,
      otp: otpInput
    };

    fetch(`${BASE_URL}/api/v1/members/find-id`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("서버 응답 오류(아이디 찾기 실패)");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success && data.data && data.data.userId) {
          alert(`회원님의 아이디는: ${data.data.userId} 입니다.`);
          
          window.location.href = "login.html";
        } else {
          const msg = data.message || "아이디 찾기에 실패했습니다.";
          alert(`아이디 찾기 실패: ${msg}`);
        }
      })
      .catch((error) => {
        console.error("아이디 찾기 에러:", error);
        alert("서버 연결 실패 또는 오류가 발생했습니다.");
      });
  });
}

// 비밀번호 찾기 처리


if (findPwForm) {
  findPwForm.addEventListener("submit", (e) => {
    e.preventDefault();

   
    const usernameInput  = findPwForm.querySelector("input[name='username']").value.trim();
    const nameInput      = findPwForm.querySelector("input[name='name']").value.trim();
    const birthdateInput = findPwForm.querySelector("input[name='birthdate']").value.trim();
    const emailInput     = findPwForm.querySelector("input[name='email']").value.trim();
    const otpInput       = findPwForm.querySelector("input[name='otp']").value.trim();

    
    if (!usernameInput || !nameInput || !birthdateInput || !emailInput || !otpInput) {
      alert("모든 정보를 정확히 입력해주세요.");
      return;
    }

    const payload = {
      username: usernameInput,
      name: nameInput,
      birthdate: birthdateInput,
      email: emailInput,
      otp: otpInput
    };

    fetch(`${BASE_URL}/api/v1/members/find-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("서버 응답 오류(비밀번호 찾기 실패)");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success && data.data && data.data.tempPassword) {
          alert("임시 비밀번호가 발급되었습니다. 이메일을 확인해주세요.");
         
          window.location.href = "login.html";
        } else {
          const msg = data.message || "비밀번호 찾기에 실패했습니다.";
          alert(`비밀번호 찾기 실패: ${msg}`);
        }
      })
      .catch((error) => {
        console.error("비밀번호 찾기 에러:", error);
        alert("서버 연결 실패 또는 오류가 발생했습니다.");
      });
  });
}
