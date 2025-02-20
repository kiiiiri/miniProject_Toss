$(document).ready(function() {
  let urlParams = new URLSearchParams(window.location.search);
  let text = urlParams.get("text");

  console.log(text);

  $(".detail_content").append(text);
})