$(document).ready(async function() {
  let curPageNumber = 1;

  let response = await fetch("/data/q&a.json"); 
  let jsonData = await response.json();

  clearNoticeList()
  
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
    $(".notice-list").empty();
  }

  function applyContentData(pageNumber) {
    let pageKey = `page${pageNumber}`;

    $.each(jsonData[pageKey].contents, function(index, content) {
      if (index == 9) {
        $("list").append(`
          <li class="acive">
              <div>
                <a href="#" class="faq-question">프리엄을 해지하고 싶어요.</a>
              </div>
          </li>
          <li class="active"> 
              <a href="${content.url}">
                  <h4 class="notice-content">${content.title}</h4>
                  <p class="date">${content.date}</p>
              </a>
          </li>
      `);
      } else {
        $(".notice-list").append(`
          <li> 
              <a href="${content.url}">
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

