document.addEventListener("DOMContentLoaded", () => {
  const listEl = document.getElementById("bookmark-list");

  fetch(`${BASE_URL}/api/v1/members/me/like`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("authToken")}`
    }
  })
  
  
  .then(res => {
    if (!res.ok) throw new Error("북마크 정보를 불러올 수 없습니다.");
    return res.json();
  })
  .then(({ success, data }) => {
    listEl.innerHTML = "";

    if (!success || !Array.isArray(data.likedPosts) || data.totalCount === 0) {
      listEl.innerHTML = `
        <li class="p-6 text-center text-gray-600">
          저장된 축제가 없습니다.
        </li>
      `;
      return;
    }

    const likedPosts = data.likedPosts;

    likedPosts.forEach(item => {
      const li = document.createElement("li");
      li.className = "border-b last:border-none";

      li.innerHTML = `
        <div class="flex flex-col sm:flex-row items-center p-6">
          
          <!-- 썸네일 -->
          <img
            src="${item.imageUrl}"
            alt="${item.title}"
            class="w-full sm:w-24 h-24 rounded-lg object-cover mr-0 sm:mr-6 mb-4 sm:mb-0"
          />

          <!-- 정보 -->
          <div class="flex-1">
            <h2 class="text-lg font-semibold mb-2">${item.title}</h2>
            
            <!-- 축제 태그 -->
            <div class="flex flex-wrap gap-1 mb-2">
              ${(item.tags || []).map(tag =>
                `<span class="px-2 py-1 bg-blue-100 text-blue-500 rounded-full text-xs">#${tag}</span>`
              ).join("")}
            </div>

            <!-- 날짜 · 위치 -->
            <div class="flex flex-wrap text-sm text-gray-600">
              <span class="mr-4">📅 ${item.startDate} – ${item.endDate}</span>
              <span>🚩 ${item.location}</span>
            </div>
          </div>

          <!-- 상세보기 버튼 -->
          <button
            onclick="location.href='detail.html?id=${item.id}'"
            class="mt-4 sm:mt-0 sm:ml-6 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
          >
            상세 보기
          </button>

        </div>
      `;
      listEl.appendChild(li);
    });
  })
  .catch(err => {
    console.error(err);
    alert(err.message);
  });
});

const backBtn = document.getElementById("backBtn");
backBtn.addEventListener("click", () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "index.html";
  }
});