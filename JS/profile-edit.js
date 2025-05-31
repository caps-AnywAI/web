// 1. DOM 요소 가져오기
const nicknameSection = document.getElementById("nicknameSection");
const passwordSection = document.getElementById("passwordSection");
const fileInput = document.getElementById("profile-upload");
const previewImg = document.getElementById("preview-img");
const defaultIcon = document.getElementById("default-icon");
const deleteImgBtn = document.getElementById("deleteImgBtn");
const saveBtn = document.getElementById("saveBtn");
const withdrawBtn = document.getElementById("withdrawBtn");
const modal = document.getElementById("modal");
const confirmWithdraw = document.getElementById("confirmWithdraw");
const cancelWithdraw = document.getElementById("cancelWithdraw");

// 2. 섹션 토글 함수
function toggleSection(id) {
  const section = document.getElementById(id);
  section.classList.toggle("hidden");
}

// 3. 프로필 이미지 미리보기 및 삭제
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImg.src = e.target.result;
      previewImg.classList.remove("hidden");
      defaultIcon.classList.add("hidden");
      deleteImgBtn.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
  }
});

deleteImgBtn.addEventListener("click", () => {
  previewImg.src = "";
  previewImg.classList.add("hidden");
  defaultIcon.classList.remove("hidden");
  deleteImgBtn.classList.add("hidden");
  fileInput.value = "";
});

// 4. 프로필 저장 (프로필 이미지, 닉네임, 비밀번호 변경)
saveBtn.addEventListener("click", () => {
  const newNicknameInput = nicknameSection.querySelector("input");
  const newNickname = newNicknameInput ? newNicknameInput.value.trim() : "";
  const pwInputs = Array.from(passwordSection.querySelectorAll("input"));
  const currentPw = pwInputs[0] ? pwInputs[0].value.trim() : "";
  const newPw = pwInputs[1] ? pwInputs[1].value.trim() : "";
  const newPwConfirm = pwInputs[2] ? pwInputs[2].value.trim() : "";

  if (!newNickname && !newPw && !fileInput.files[0]) {
    alert("변경할 닉네임, 비밀번호 또는 프로필 사진을 선택해주세요.");
    return;
  }

  if (newPw || currentPw || newPwConfirm) {
    if (!currentPw || !newPw || !newPwConfirm) {
      alert("비밀번호를 변경하려면 모든 칸을 채워주세요.");
      return;
    }
    if (newPw !== newPwConfirm) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }
  }

  const formData = new FormData();
  if (newNickname) {
    formData.append("nickname", newNickname);
  }
  if (newPw) {
    formData.append("currentPassword", currentPw);
    formData.append("newPassword", newPw);
  }
  if (fileInput.files[0]) {
    formData.append("profileImage", fileInput.files[0]);
  }

  fetch(`${BASE_URL}/api/v1/members/update-profile`, {
    method: "POST",
    body: formData
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("서버 응답 오류(프로필 수정 실패)");
      }
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        alert("프로필이 성공적으로 수정되었습니다.");
        location.reload();
      } else {
        alert("프로필 수정 실패: " + (data.message || "알 수 없는 에러"));
      }
    })
    .catch((error) => {
      console.error("프로필 수정 에러:", error);
      alert("서버 연결 실패");
    });
});

// 5. 회원탈퇴 모달 열기/닫기 및 API 호출
withdrawBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

cancelWithdraw.addEventListener("click", () => {
  modal.classList.add("hidden");
});

confirmWithdraw.addEventListener("click", () => {
  modal.classList.add("hidden");

  fetch(`${BASE_URL}/api/v1/members/withdraw`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("서버 응답 오류(탈퇴 실패)");
      }
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        alert("정상적으로 탈퇴되었습니다.");
        location.href = "index.html";
      } else {
        alert("탈퇴 실패: " + (data.message || "알 수 없는 에러"));
      }
    })
    .catch((error) => {
      console.error("탈퇴 에러:", error);
      alert("서버 연결 실패");
    });
});
