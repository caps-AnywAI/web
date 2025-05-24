// 1) 해시태그 표시
const resultTags = ['#도시', '#자연', '#체험', '#인기', '#휴식'];
const tagContainer = document.getElementById('tag-container');

resultTags.forEach(tag => {
  const span = document.createElement('span');
  span.className = 'bg-[#60B7FF] text-white rounded-full px-5 py-2 text-sm font-medium';
  span.textContent = tag;
  tagContainer.appendChild(span);
});

// 2) 축제 데이터 예시
const festivalList = [
  { title: '축제 1', imageUrl: '', detailLink: '#' },
  { title: '축제 2', imageUrl: '', detailLink: '#' },
  { title: '축제 3', imageUrl: '', detailLink: '#' }
];

const festivalContainer = document.getElementById('festival-list');

festivalList.forEach(festival => {
  const card = document.createElement('div');
  card.className = `
    flex flex-col sm:flex-row 
    bg-white w-full max-w-4xl p-6 
    rounded-2xl shadow-md 
    items-center justify-between
  `;

  card.innerHTML = `
    <!-- 이미지 영역 -->
    <div class="w-full sm:w-1/3 h-48 bg-[#D9D9D9] rounded-xl mb-4 sm:mb-0"></div>
    
    <!-- 제목 + 버튼 -->
    <div class="flex-1 sm:ml-6 flex flex-col items-center sm:items-start">
      <div class="text-xl sm:text-2xl font-black text-[#363636] mb-4">
        ${festival.title}
      </div>
      <a href="${festival.detailLink}"
         class="px-6 py-2 bg-white border border-[#E2E2E2] rounded-xl text-sm text-[#6D6D6D] hover:bg-gray-100 hover:shadow transition">
        상세 보기
      </a>
    </div>
  `;

  festivalContainer.appendChild(card);
});
