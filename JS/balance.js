// ✅ 사용자 선호도 질문 목록 + 이미지
const questions = [
  {
    step: 1,
    title: "더 선호하는 여행지는 무엇인가요?",
    options: [
      { value: "nature", label: "자연", img: "../assets/images/free-icon-national-park-7057859.png" },
      { value: "urban",  label: "도시",   img: "../assets/images/free-icon-fireworks-13394519.png" }
    ]
  },
  {
    step: 2,
    title: "더 선호하는 분위기는 무엇인가요?",
    options: [
      { value: "healing",  label: "힐링",     img: "../assets/images/free-icon-relaxing-1142699.png" },
      { value: "activity", label: "액티비티", img: "../assets/images/free-icon-running-4721050.png" }
    ]
  },
  {
    step: 3,
    title: "전통과 새로움 어느 쪽이 더 매력적인가요?",
    options: [
      { value: "traditional", label: "전통",   img: "../assets/images/free-icon-bukchon-hanok-4480645.png" },
      { value: "new",         label: "새로움", img: "../assets/images/free-icon-smart-city-2228558.png" }
    ]
  },
  {
    step: 4,
    title: "먹는 즐거움과 새로운 경험 중 당신의 선택은?",
    options: [
      { value: "food",       label: "음식",   img: "../assets/images/free-icon-dinner-3321601.png" },
      { value: "experience", label: "경험",   img: "../assets/images/free-icon-vacation-7058066.png" }
    ]
  },
  {
    step: 5,
    title: "모두가 아는 핫플과 당신만의 비밀 장소 중 당신의 선택은?",
    options: [
      { value: "popular", label: "인기",    img: "../assets/images/free-icon-popularity-9031042.png" },
      { value: "hidden",  label: "숨겨진", img: "../assets/images/free-icon-question-3888666.png" }
    ]
  },
  {
    step: 6,
    title: "여행에서 더 원하는 분위기는?",
    options: [
      { value: "quiet",  label: "고요",   img: "../assets/images/free-icon-beach-sunset-1886646.png" },
      { value: "lively", label: "활발",   img: "../assets/images/free-icon-dance-2402478.png" }
    ]
  }
];

let currentStep = 0;

// 현재 단계 렌더링
function renderStep() {
  const container = document.getElementById("question-container");
  const q = questions[currentStep];

  const optionsHTML = q.options.map(opt => `
    <div class="bg-white hover:shadow-xl cursor-pointer rounded-2xl w-full sm:w-72 h-auto sm:h-80 flex flex-col justify-between items-center p-4 sm:p-6 border border-gray-200 hover:border-blue-400 transition"
         onclick="selectOption('${opt.value}')">
      <img src="${opt.img}" alt="${opt.label}" class="w-32 h-32 sm:w-48 sm:h-48 object-contain mt-2" />
      <div class="text-lg sm:text-xl font-semibold text-gray-800 mb-2">${opt.label}</div>
    </div>
  `).join('');

  container.innerHTML = `
    <h2 class="text-[#60a5fa] font-bold text-lg md:text-xl">STEP ${q.step}</h2>
    <p class="text-base md:text-lg text-gray-600 mt-2 mb-8 md:mb-10">${q.title}</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
      ${optionsHTML}
    </div>
  `;

  // 진행바 업데이트
  questions.forEach((_, idx) => {
    document.getElementById(`bar-${idx}`).classList.toggle('active', idx <= currentStep);
  });
}

// 옵션 선택 처리
function selectOption(value) {
  const answers = JSON.parse(sessionStorage.getItem("answers")) || [];
  answers[currentStep] = value;
  sessionStorage.setItem("answers", JSON.stringify(answers));
  nextStep();
}

// 다음 단계 또는 결과 처리
function nextStep() {
  if (currentStep < questions.length - 1) {
    currentStep++;
    renderStep();
  } else {
    const answers = JSON.parse(sessionStorage.getItem("answers")) || [];
    const themes = [...new Set(answers)];
    const userId = localStorage.getItem("loginUserId");
    const token = localStorage.getItem("authToken");

    if (!userId || !token) {
      alert("로그인이 필요합니다.");
      return location.href = "login.html";
    }

    fetch(`${BASE_URL}/${userId}/themes`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({ themes })
    })
    .then(res => res.json())
    .then(() => location.href = "result.html")
    .catch(() => alert("서버와의 연결에 실패했습니다."));
  }
}

// 이전 단계
function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    renderStep();
  }
}

// 이벤트 바인딩 및 초기 렌더
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("skip").addEventListener("click", nextStep);
  document.getElementById("back").addEventListener("click", prevStep);
  renderStep();
});
