const answers = JSON.parse(sessionStorage.getItem("answers")) || [];
    const answerList = document.getElementById("answer-list");
    const summaryText = document.getElementById("summary-text");

    if (answers.length === 0) {
      answerList.innerHTML = "<li>저장된 응답이 없습니다. 처음부터 다시 진행해주세요.</li>";
      summaryText.textContent = "추천 불가";
    } else {
      answers.forEach((answer, idx) => {
        answerList.innerHTML += `
          <li class="bg-gray-100 rounded-lg p-4 shadow-sm">STEP ${idx + 1}: <strong>${answer}</strong></li>
        `;
      });

      // 간단한 분석 예시
      const beachCount = answers.filter(a => a.includes("바다") || a.includes("맑은")).length;
      const result = beachCount >= 2 ? "🌊 여름 해변형 여행자" : "⛰ 자연힐링형 여행자";
      summaryText.textContent = result;
    }