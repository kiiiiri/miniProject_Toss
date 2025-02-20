$(document).ready(async function() {
  let curPageNumber = 1;
  let jsonData = null;

  try {
    let response = await fetch("/data/announce.json"); 
     jsonData = await response.json();
  } catch(error) {
    console.log("Json Data를 가져오는 중 오류 발생 : ", error);
    alert("데이터를 가져오는 중 오류가 발생했습니다. 나중에 다시 시도하세요.");
    return;
  }

  clearNoticeList()

  let pageKeys = Object.keys(jsonData).filter(key => key.startsWith("page"));
  let totalPages = pageKeys.length;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1) {
      $(".pagination").append(`<li class="prev"><button class="btn prev_btn"><</button></li>`)
    }

    $(".pagination").append(`<li class=${i === 1 ? 'active' : ''}><button class="btn page_btn" id="page${i}">${i}</button></li>`)

    if (i === totalPages) {
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
    $(".notice-list").empty();
  }

  function applyContentData(pageNumber) {
    let pageKey = `page${pageNumber}`;

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

