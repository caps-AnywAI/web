const questions = [
    { step: 1, title: "더 선호하는 교통수단은?", options: ["🚗 자가용", "🚆 대중교통"] },
    { step: 2, title: "더 선호하는 자연은 무엇인가요?", options: ["⛰ 산", "🌊 바다"] },
    { step: 3, title: "선호하는 날씨는?", options: ["☀️ 맑은 날", "🌧 흐린 날"] },
    { step: 4, title: "여행 스타일은?", options: ["🏃‍♂️ 활동적인", "🛋 여유로운"] },
    { step: 5, title: "선호하는 숙소는?", options: ["🏨 호텔", "🏕 캠핑"] },
    { step: 6, title: "여행 동행은 누구와?", options: ["👨‍👩‍👧‍👦 가족", "👫 친구"] }
  ];
  
  let currentStep = 0;
  
  function renderStep() {
    const container = document.getElementById("question-container");
    const question = questions[currentStep];
  
    container.innerHTML = `
      <h2 class="text-[#60a5fa] font-bold text-lg">STEP ${question.step}</h2>
      <p class="text-base text-gray-600 mt-2 mb-10">${question.title}</p>
      <div class="flex gap-10 justify-center">
        ${question.options.map((opt) => `
          <div class="bg-white hover:shadow-xl cursor-pointer rounded-2xl w-72 h-80 flex flex-col justify-center items-center text-xl font-semibold border border-gray-200 hover:border-blue-400 transition"
               onclick="selectOption('${opt}')">
            <span>${opt}</span>
          </div>
        `).join('')}
      </div>
    `;
  
    // 프로그레스 바 업데이트
    for (let i = 0; i < 6; i++) {
      document.getElementById(`bar-${i}`).classList.toggle('active', i <= currentStep);
    }
  }
  
  // 선택 시 저장 및 다음 질문
  function selectOption(option) {
    const answers = JSON.parse(sessionStorage.getItem("answers")) || [];
    answers[currentStep] = option;
    sessionStorage.setItem("answers", JSON.stringify(answers));
    nextStep();
  }
  
  function nextStep() {
    if (currentStep < questions.length - 1) {
      currentStep++;
      renderStep();
    } else {
      alert("추천 질문이 모두 완료되었습니다!");
      location.href = "result.html";
    }
  }
  
  function prevStep() {
    if (currentStep > 0) {
      currentStep--;
      renderStep();
    }
  }
  
  // 초기 실행
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("skip").addEventListener("click", nextStep);
    document.getElementById("back").addEventListener("click", prevStep);
    renderStep();
  });
  