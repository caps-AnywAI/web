// detail.js
import { BASE_URL } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1) URL에서 festivalId 뽑기
  const params = new URLSearchParams(window.location.search);
  const festivalId = params.get("id");
  if (!festivalId) {
    alert("잘못된 접근입니다.");
    window.location.href = "../index.html";
    return;
  }

  // 2) API 호출
  fetch(`${BASE_URL}/api/v1/festival/${festivalId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
      // 인증이 필요하다면:
      // "Authorization": `Bearer ${localStorage.getItem("authToken")}`
    }
  })
    .then(res => {
      if (!res.ok) throw new Error("축제 정보를 불러올 수 없습니다.");
      return res.json();
    })
    .then(({ success, data }) => {
      if (!success) throw new Error("축제 정보를 불러오는 중 오류가 발생했습니다.");

      // 3) DOM에 값 채우기
      // 축제 카드
      const card = document.querySelector("div.bg-white.p-5.rounded-xl.shadow");
      const imgEl = card.querySelector("img");
      const titleEl = card.querySelector("h2");
      const pEls = card.querySelectorAll("p");
      const btnEl = card.querySelector("button");

      imgEl.src = data.imageUrl;
      imgEl.alt = data.title;

      titleEl.textContent = data.title;
      pEls[0].textContent = `날짜: ${data.startDate} ~ ${data.endDate}`;
      pEls[1].textContent = `장소: ${data.address}`;
      pEls[2].textContent = `축제 설명: ${data.description || "-"}`;

      if (data.homepageUrl) {
        btnEl.textContent = "홈페이지 ➜";
        btnEl.onclick = () => window.open(data.homepageUrl, "_blank");
      } else {
        btnEl.style.display = "none";  // 홈페이지 없으면 버튼 숨김
      }
    })
    .catch(err => {
      console.error(err);
      alert(err.message);
    });
});
