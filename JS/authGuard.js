
const token = localStorage.getItem("authToken");
if (!token) {
  alert("로그인이 필요합니다.");
  window.location.href = "login.html";
}
