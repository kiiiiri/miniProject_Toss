$(document).ready(async function() {
  try {
    let response = await fetch("/data/announce.json"); 
    let jsonData = await response.json();

    console.log("JSON 데이터 확인:", jsonData); 

    $(".notice-list").empty();

    if (!jsonData.contets || !Array.isArray(jsonData.contets)) {
      console.error("contets 배열이 존재하지 않음:", jsonData);
      return;
    }
    $.each(jsonData.contets, function(index, item) {
        console.log("item 확인:", item); 

        $(".notice-list").append(`
            <li> 
                <a href="${item.url}">
                    <h4 class="notice-content">${item.title}</h4>
                    <p class="date">${item.date}</p>
                    <hr>
                </a>
            </li>
        `);
    });

  } catch (error) {
    console.error("JSON 데이터를 불러오는 중 오류 발생:", error);
  }
});

