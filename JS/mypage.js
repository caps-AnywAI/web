// mypage.js

document.addEventListener("DOMContentLoaded", () => {
  const token  = localStorage.getItem("authToken");
  const userId = localStorage.getItem("loginUserId");

  // — 로그인 체크
  if (!token || !userId) {
    alert("로그인이 필요합니다.");
    return location.replace("login.html");
  }

  // — /api/v1/members/{id} 엔드포인트 호출 (GET)
  fetch(`${BASE_URL}/api/v1/members/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`      // 로그인 때 받은 헤더 값: "Bearer ... 토큰"
    }
  })
    .then(async res => {
      if (res.status === 401) {
        // 인증 실패 시 재로그인
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        localStorage.clear();
        return location.replace("login.html");
      }
      if (!res.ok) {
        throw new Error("프로필 조회 실패");
      }
      return res.json();
    })
    .then(({ success, data, message }) => {
      if (!success) {
        throw new Error(message || "프로필 조회 실패");
      }
      // data: { id, name, phone, email, ... }
      document.getElementById("user-name").textContent  = `${data.name} 님`;
      //document.getElementById("user-id").textContent    = data.id;
      //document.getElementById("user-phone").textContent = data.phone;
      //document.getElementById("user-email").textContent = data.email;
    })
    .catch(err => {
      console.error(err);
      alert(err.message || "프로필을 불러오는 중 오류가 발생했습니다.");
    });
  
     // — 북마크 조회 및 렌더링
  const countEl = document.getElementById("bookmark-count");
  const listEl  = document.getElementById("bookmark-list");

  fetch(`${BASE_URL}/api/v1/members/me/like`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then(res => {
      if (!res.ok) throw new Error("북마크 정보를 불러올 수 없습니다.");
      return res.json();
    })
    .then(({ success, data }) => {
      // 초기화
      listEl.innerHTML = "";

      if (!success || !Array.isArray(data.likedPosts) || data.totalCount === 0) {
        countEl.textContent = "0";
        listEl.innerHTML = `
          <li class="text-center text-gray-400">
            아직 저장한 축제가 없습니다.
          </li>
        `;
        return;
      }

      // 카운트 갱신
      countEl.textContent = data.totalCount;
      const likedPosts = data.likedPosts;

      // 리스트 렌더링
      likedPosts.forEach(item => {
        const li = document.createElement("li");
        li.className = "flex justify-between items-center";

        li.innerHTML = `
          <div>
            <p class="font-semibold">${item.title}</p>
            <p class="text-xs text-gray-500">
              📅 ${item.startDate} – ${item.endDate}
            </p>
          </div>
          <button
            onclick="location.href='detail.html?id=${item.id}'"
            class="text-sm text-blue-500 hover:underline"
          >
            상세 보기
          </button>
        `;
        listEl.appendChild(li);
      });
    })
    .catch(err => {
      console.error(err);
      // 실패 시 placeholder 유지
    });
    
  // — 로그아웃 버튼
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      // /api/v1/auth/logout 호출이 필요하면 여기 추가
      localStorage.clear();
      location.replace("login.html");
    });
  }
});
