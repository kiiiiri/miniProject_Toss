$(document).ready(async function() {
  let curPageNumber = 0;

  let response = await fetch("/data/announce.json"); 
  let jsonData = await response.json();

  console.log("JSON 데이터 확인:", jsonData); 

  $(".notice-list").empty();

  console.log(jsonData.count);
  for (let i = 1; i <= jsonData.count; i++) {
    if (i === 1) {
      $(".pagination").append(`<li class="prev"><button class="prev_btn"><</button></li>`)
    }

    $(".pagination").append(`<li class=${i === 1 ? 'active' : ''}><button class="btn page_btn" id="page${i}">${i}</button></li>`)

    if (i === jsonData.count) {
      $(".pagination").append(`<li class="next"><button class="next_btn">></button></li>`)
    }
  }

  applyContentData(1);

  $(".page_btn").on("click", function() {
    $(".notice-list").empty();

    let pageNumber = $(this).text();
    curPageNumber = pageNumber;

    $(".pagination li").removeClass("active");
    $(this).parent().addClass("active");

    updatePaginationButton(pageNumber);
  
    applyContentData(pageNumber);
  })

  $(".prev_btn").on("click", function() {
    $(".notice-list").empty();
    applyContentData(--curPageNumber);
    updatePaginationButton(curPageNumber);

    $(".pagination li").removeClass("active");
    $("#page"+curPageNumber).parent().addClass("active");
  })

  $(".next_btn").on("click", function() {
    $(".notice-list").empty();
    applyContentData(++curPageNumber);
    updatePaginationButton(curPageNumber);

    $(".pagination li").removeClass("active");
    $("#page"+curPageNumber).parent().addClass("active");
  })

  function applyContentData(pageNumber) {
    let pageKey = `page${pageNumber}`;

    $.each(jsonData[pageKey].contents, function(index, content) {
      if (index == 9) {
        $(".notice-list").append(`
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

