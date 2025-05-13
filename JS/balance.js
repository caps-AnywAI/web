// ✅ 공식 테마 기반 밸런스 게임 질문 구성
const questions = [
  { step: 1, title: "어떤 분위기의 여행지를 선호하나요?", options: ["nature", "urban"] },
  { step: 2, title: "당신의 여행 목적은?", options: ["healing", "activity"] },
  { step: 3, title: "여행에서 무엇을 느끼고 싶나요?", options: ["traditional", "new"] },
  { step: 4, title: "여행의 즐거움은?", options: ["food", "experience"] },
  { step: 5, title: "어떤 장소가 끌리나요?", options: ["popular", "hidden"] },
  { step: 6, title: "여행 분위기는?", options: ["quiet", "lively"] }
];

const labelMap = {
  nature: "자연",
  urban: "도시",
  healing: "힐링",
  activity: "액티비티",
  traditional: "전통",
  new: "새로움",
  food: "음식",
  experience: "체험",
  popular: "인기 많은",
  hidden: "숨겨진 장소",
  quiet: "고요한",
  lively: "활발한"
};

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
          <span>${labelMap[opt]}</span>
        </div>
      `).join('')}
    </div>
  `;

  for (let i = 0; i < 6; i++) {
    document.getElementById(`bar-${i}`).classList.toggle('active', i <= currentStep);
  }
}

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
    const answers = JSON.parse(sessionStorage.getItem("answers")) || [];
    const themes = [...new Set(answers)];
    const userId = localStorage.getItem("loginUserId");
    const token = localStorage.getItem("authToken");

    if (!userId || !token) {
      alert("로그인이 필요합니다.");
      location.href = "login.html";
      return;
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
      .then(data => {
        console.log("테마 저장 완료:", data);
        location.href = "result.html";
      })
      .catch(err => {
        console.error("테마 저장 실패:", err);
        alert("서버와의 연결에 실패했습니다.");
      });
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    renderStep();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("skip").addEventListener("click", nextStep);
  document.getElementById("back").addEventListener("click", prevStep);
  renderStep();
});
