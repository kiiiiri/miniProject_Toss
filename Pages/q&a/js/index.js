$(document).ready(async function() {
  let curPageNumber = 1;

  let response = await fetch("../../data/announce.json"); 
  let jsonData = await response.json();

  clearNoticeList()

  console.log(jsonData)
  
  for (let i = 1; i <= jsonData.count; i++) {
    if (i === 1) {
      $(".pagination").append(`<li class="prev"><button class="btn prev_btn"><</button></li>`)
    }

    $(".pagination").append(`<li class=${i === 1 ? 'active' : ''}><button class="btn page_btn" id="page${i}">${i}</button></li>`)

    if (i === jsonData.count) {
      $(".pagination").append(`<li class="next"><button class="btn next_btn">></button></li>`)
    }
  }

  applyContentData(1);

  $(".page_btn").on("click", function() {
    clearNoticeList()

    let pageNumber = $(this).text();
    curPageNumber = pageNumber;

    $(".pagination li").removeClass("active");
    $(this).parent().addClass("active");

    updatePaginationButton(pageNumber);
  
    applyContentData(pageNumber);
  })

  $(".prev_btn").on("click", function() {
    clearNoticeList()
    applyContentData(--curPageNumber);
    updatePaginationButton(curPageNumber);

    $(".pagination li").removeClass("active");
    $("#page"+curPageNumber).parent().addClass("active");

    $(this).blur();
  })

  $(".next_btn").on("click", function() {
    clearNoticeList()
    applyContentData(++curPageNumber);
    updatePaginationButton(curPageNumber);

    $(".pagination li").removeClass("active");
    $("#page"+curPageNumber).parent().addClass("active");

    $(this).blur();
  })

  function clearNoticeList() {
    $(".list").empty();
  }

  function applyContentData(pageNumber) {
    let pageKey = `page${pageNumber}`;

    $.each(jsonData[pageKey].contents, function(index, content) {
      console.log(pageKey)
      $(".list").append(`
        <li class="acive">
            <div>
              <a href="${content.url}" class="faq-question">${content.title}</a>
            </div>
        </li>
      `);
    });

    window.scrollTo(0,0);
  }

  function updatePaginationButton(pageNumber) {
    if (pageNumber == 1) {
      $(".prev_btn").addClass("disabled").prop("disabled", true); 
    } else {
      $(".prev_btn").removeClass("disabled").prop("disabled", false); 
    }

    if (pageNumber == jsonData.count) {
      $(".next_btn").addClass("disabled").prop("disabled", true); 
    } else {
      $(".next_btn").removeClass("disabled").prop("disabled", false); 
    }
  }
});

    // footer 가져오기
    document.addEventListener('DOMContentLoaded', function() {
      fetch('../footer/index.html') // 외부 footer 파일 경로
        .then(response => response.text()) // 파일을 텍스트로 변환
        .then(data => {
          // 불러온 데이터가 footer_container에 삽입
          const footerContainer = document.getElementById('footer_container');
          if (footerContainer) {
            footerContainer.innerHTML = data;
          } else {
            console.error('footer_container 요소를 찾을 수 없습니다.');
          }
        })
        .catch(error => console.error('Error loading footer:', error));
    });
    
    document.addEventListener('DOMContentLoaded', function() {
      const toggleButton = document.querySelector('.toggle-top');
      const categoryList = document.querySelector('.category-list');
    
      // 토글 버튼 클릭 시 카테고리 리스트 보이기/숨기기
      toggleButton.addEventListener('click', function(e) {
        e.stopPropagation(); // 이벤트 전파 막기
        categoryList.classList.toggle('show'); // show 클래스 토글
      });
    
      // 다른 곳을 클릭하면 카테고리 리스트가 사라지도록
      document.addEventListener('click', function(e) {
        if (!categoryList.contains(e.target) && !toggleButton.contains(e.target)) {
          categoryList.classList.remove('show');
        }
      });
    
      // 카테고리 리스트 내부에서 클릭하면, 해당 항목을 클릭한 것으로 간주하여 리스트 숨기기
      categoryList.addEventListener('click', function() {
        categoryList.classList.remove('show');
      });
    });

