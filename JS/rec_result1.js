// 해시태그 표시
const resultTags = ['#도시', '#자연', '#체험', '#인기', '#휴식'];
const tagContainer = document.getElementById('tag-container');

resultTags.forEach(tag => {
  const span = document.createElement('span');
  span.className = 'bg-[#60B7FF] text-white rounded-full px-5 py-2 text-sm font-medium';
  span.textContent = tag;
  tagContainer.appendChild(span);
});

// 축제 데이터
const festivalList = [
  { title: '축제 1', tags: ['#도시', '#경험', '#인기'], date: '07.20 - 07.23', location: '부산' },
  { title: '축제 2', tags: ['#자연', '#체험', '#휴식'], date: '08.10 - 08.13', location: '강릉' },
  { title: '축제 3', tags: ['#전통', '#도시', '#인기'], date: '09.01 - 09.03', location: '서울' }
];

// 축제 카드 생성
const festivalContainer = document.getElementById('festival-list');

festivalList.forEach(festival => {
  const card = document.createElement('div');
  card.className = 'flex bg-white w-[90%] max-w-4xl p-6 rounded-2xl shadow-md items-center justify-between';
  card.innerHTML = `
    <div class="w-80 h-48 bg-[#D9D9D9] rounded-xl"></div>
    <div class="flex-1 ml-8">
      <div class="text-2xl font-black text-[#363636] mb-2">${festival.title}</div>
      <div class="flex gap-2 mb-4">
        ${festival.tags.map(tag => `<span class="bg-[#B3DCFF] text-white text-sm font-medium px-4 py-1 rounded-full">${tag}</span>`).join('')}
      </div>
      <div class="flex gap-6 text-base text-black">
        <span>📅 ${festival.date}</span>
        <span>📍 ${festival.location}</span>
      </div>
    </div>
    <button class="ml-4 px-5 py-2 text-sm bg-white text-[#6D6D6D] border border-[#E2E2E2] rounded-xl hover:bg-gray-100 hover:shadow transition">
      상세 보기
    </button>
  `;
  festivalContainer.appendChild(card);
});
