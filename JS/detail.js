// detail.js

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
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("authToken")}`
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

      document.getElementById("introduce").textContent = data.introduce ?? "내용 없음";

  // 주요 프로그램 삽입
  document.getElementById("program").textContent = data.program ?? "내용 없음";

  // 참고사항 처리
  if (data.info) {
    document.getElementById("info").textContent = data.info;
  } else {
    document.getElementById("info-label").style.display = "none";
    document.getElementById("info").style.display = "none";
  }

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

// 인근 여행지 정보 불러오기
fetch(`${BASE_URL}/api/v1/festival/${festivalId}/nearby`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("authToken")}`
  }
})
  .then(res => {
    if (!res.ok) throw new Error("인근 여행지 정보를 불러올 수 없습니다.");
    return res.json();
  })
  .then(({ success, data: nearbyList }) => {
    if (!success || !Array.isArray(nearbyList)) return;

    const container = document.querySelector('.lg\\:grid-cols-4');
    container.innerHTML = "";

    nearbyList.forEach(item => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "bg-white rounded-lg shadow-md overflow-hidden";

      const imgEl = document.createElement("img");
      imgEl.src = item.imageUrl;
      imgEl.alt = item.name;
      imgEl.className = "w-full h-40 object-cover";

      const bodyDiv = document.createElement("div");
      bodyDiv.className = "p-4";

      const titleEl = document.createElement("h3");
      titleEl.className = "text-md font-semibold mb-1";
      titleEl.textContent = item.name;

      const dateEl = document.createElement("p");
      dateEl.className = "text-sm text-gray-600 mb-1";
      dateEl.textContent = `📅 ${item.date}`;

      const locationEl = document.createElement("p");
      locationEl.className = "text-sm text-gray-600";
      locationEl.textContent = `🚩 ${item.location}`;

      bodyDiv.append(titleEl, dateEl, locationEl);
      cardDiv.append(imgEl, bodyDiv);
      container.appendChild(cardDiv);
    });
  })
  .catch(err => {
    console.error(err);
  });
