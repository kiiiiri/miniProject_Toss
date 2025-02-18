$(document).ready(async function() {
  let pageNumber = 0;

  let response = await fetch("/data/announce.json"); 
  let jsonData = await response.json();

  console.log("JSON 데이터 확인:", jsonData); 

  $(".notice-list").empty();

  console.log(jsonData.count);
  for (let i = 1; i <= jsonData.count; i++) {
    if (i === 1) {
      $(".pagination").append(`<li class="prev"><button><</button></li>`)
    }

    $(".pagination").append(`<li class=${i === 1 ? 'active' : ''}><button class="btn page_btn">${i}</button></li>`)

    if (i === jsonData.count) {
      $(".pagination").append(`<li class="next"><button>></button></li>`)
    }
  }

  applyContentData(1);

  $(".page_btn").on("click", function() {
    $(".notice-list").empty();
    pageNumber = $(this).text();

    $(".pagination li").removeClass("active");
    $(this).parent().addClass("active");

    applyContentData(pageNumber);
  })

  function applyContentData(pageNumber) {
    let pageKey = `page${pageNumber}`;

    $.each(jsonData[pageKey].contents, function(index, content) {
      console.log("content 확인:", content);
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
});

