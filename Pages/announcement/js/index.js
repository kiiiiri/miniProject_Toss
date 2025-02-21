$(document).ready(async function() {
  let jsonData = null;

  try {
    let response = await fetch(`../../data/announce.json`);
     jsonData = await response.json();
  } catch(error) {
    console.log("Json Data를 가져오는 중 오류 발생 : ", error);
    alert("데이터를 가져오는 중 오류가 발생했습니다. 나중에 다시 시도하세요.");
    return;
  }

  let curPageNumber = 1;
  let maxPageBtnLength = 9;
  let totalPages = 0;

  init();

  $(".page_btn").on("click", function() {
    clearNoticeList()

    let pageNumber = $(this).text();
    curPageNumber = pageNumber;

    applyChangedProperty();
  })

  $(".prev_btn").on("click", function() {
    clearNoticeList()

    --curPageNumber;
    applyChangedProperty();
    $(this).blur();
  })

  $(".next_btn").on("click", function() {
    clearNoticeList()

    ++curPageNumber;
    applyChangedProperty();
    $(this).blur();
  })

  function init() {
    let firstPageBtnindex = 1;
    clearNoticeList()

    let pageKeys = Object.keys(jsonData).filter(key => key.startsWith("page"));
    totalPages = pageKeys.length;

    for (let i = 1; i <= totalPages; i++) {
      if (i >= maxPageBtnLength) {
        $(".pagination").append(`
          <li><button class="btn page_btn" id="page${totalPages}">${totalPages}</button></li>
          <li class="next"><button class="btn next_btn">></button></li>`)
        abbreviatePageBtn(1);
        break;
      }

      if (i === firstPageBtnindex) {
        $(".pagination").append(`<li class="prev"><button class="btn prev_btn"><</button></li>`)
      }

      $(".pagination").append(`<li class=${i === firstPageBtnindex ? 'active' : ''}><button class="btn page_btn" id="page${i}">${i}</button></li>`)

      if (i === totalPages) {
        $(".pagination").append(`<li class="next"><button class="btn next_btn">></button></li>`)
      }
    }

    applyContentData(firstPageBtnindex);
  }

  function clearNoticeList() {
    $(".notice-list").empty();
  }

  function applyContentData() {
    let pageKey = `page${curPageNumber}`;

    $.each(jsonData[pageKey].contents, function(index, content) {
      if (index == 9) {
        $(".notice-list").append(`
          <li class="active"> 
              <a href="announcementDetail/index.html?text=${encodeURIComponent(content.text)}">
                  <h4 class="notice-content">${content.title}</h4>
                  <p class="date">${content.date}</p>
              </a>
          </li>
      `);
      } else {
        $(".notice-list").append(`
          <li> 
              <a href="announcementDetail/index.html?text=${encodeURIComponent(content.text)}">
                  <h4 class="notice-content">${content.title}</h4>
                  <p class="date">${content.date}</p>
              </a>
              <hr>
          </li>
      `);
      }  
    });

    window.scrollTo(0,0);
  }

  function updatePaginationArrowButton() {
    if (curPageNumber == 1) {
      $(".prev_btn").addClass("disabled").prop("disabled", true); 
    } else {
      $(".prev_btn").removeClass("disabled").prop("disabled", false); 
    }

    if (curPageNumber == totalPages) {
      $(".next_btn").addClass("disabled").prop("disabled", true); 
    } else {
      $(".next_btn").removeClass("disabled").prop("disabled", false); 
    }
  }

  function calculatePaginationRange() {
    let firstPage = 1;
    let centerOfPageBtn = 5;  

    if (curPageNumber <= centerOfPageBtn) {
      for (let i = 0; i < centerOfPageBtn + 2; i++) {
        let pageBtn = $(".pagination").children().eq(firstPage + i).children();
        pageBtn.text((firstPage + i));
        pageBtn.attr("id", "page" + (firstPage + i));
      }

      abbreviatePageBtn(1);

      return;
    } else if (totalPages - curPageNumber < centerOfPageBtn - 1) {
      for (let i = 0; i < centerOfPageBtn + 2; i++) {
        let pageBtn = $(".pagination").children().eq(maxPageBtnLength - i).children();
        pageBtn.text((totalPages - i));
        pageBtn.attr("id", "page" + (totalPages - i));
      }

      abbreviatePageBtn(2);

      return;
    }

    let startPageNumber = curPageNumber - 2;
    let startPageBtnNumber = centerOfPageBtn - 2;

    for (let i = 0; i < centerOfPageBtn; i++) {
      let pageBtn = $(".pagination").children().eq(startPageBtnNumber + i).children()
      pageBtn.text((startPageNumber + i));
      pageBtn.attr("id", "page" + (startPageNumber + i));
    }

    abbreviatePageBtn(3);

    addActiveClassInList();
  }

  function applyChangedProperty() {
    applyContentData();
    updatePaginationArrowButton();
    addActiveClassInList();
    calculatePaginationRange();
  }

  function addActiveClassInList() {
    $(".pagination li").removeClass("active");
    $("#page"+curPageNumber).parent().addClass("active");
  }

  function abbreviatePageBtn(mode) {
    let pageBtns = [];
    let minAbbrBtnIndex = 2;
    let maxAbbrBtnIndex = 8;
  
    if (mode == 1) {
      pageBtns.push($(".pagination").children().eq(maxAbbrBtnIndex).children());

      $(".pagination").children().eq(minAbbrBtnIndex).children().text(minAbbrBtnIndex);
      $(".pagination").children().eq(minAbbrBtnIndex).children().removeClass("disabled");
    } else if (mode == 2) {
      pageBtns.push($(".pagination").children().eq(minAbbrBtnIndex).children());
      
      $(".pagination").children().eq(maxAbbrBtnIndex).children().text(totalPages - 1);
      $(".pagination").children().eq(maxAbbrBtnIndex).children().removeClass("disabled");
    } else if (mode == 3) {
      pageBtns.push($(".pagination").children().eq(minAbbrBtnIndex).children());
      pageBtns.push($(".pagination").children().eq(maxAbbrBtnIndex).children());
    }
  
    pageBtns.forEach((pageBtn) => {
      pageBtn.text("...");
      pageBtn.addClass("disabled");
    });
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
