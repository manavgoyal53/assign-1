let end_cursor;
async function run() {
  // Open a new connection, using the GET request on the URL endpoint
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  let data;

  data = await fetch("https://us-central1-saath-health.cloudfunctions.net/video_rest_services/homepage_instafeeds/v2/initial", requestOptions)
    .then(response => response.text())
    .then(result => { return JSON.parse(result) })
    .catch(error => console.log('error', error));

  let element = document.getElementById("add_items");
  // Begin accessing JSON data here
  end_cursor = data.end_cursor;
  let items = data["items"];
  let html = "";
  for (let i = 0; i < items.length; i++) {
    if (i == 0) {
      html += '<div class="carousel-item active"><a href ='+ items[i]._linkUrl + '><img src=' + items[i]._imageUrl + ' class = "d-block w-100"></a><div class="carousel-caption"><p>'+ items[i]._caption +'</p></div></div>'
    }
    else {
      html += '<div class="carousel-item"><a href ='+ items[i]._linkUrl + '><img src=' + items[i]._imageUrl + ' class = "d-block w-100""></a><div class="carousel-caption"><p>'+ items[i]._caption +'</p></div></div>'
    }
  }
  element.innerHTML += html;

}
$('#myCarousel').on('slid.bs.carousel', async function() {
let currentIndex = $('div.active').index();
let total = $('.carousel-item').length;
if (currentIndex == total-1){
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  let data;

  data = await fetch("https://us-central1-saath-health.cloudfunctions.net/video_rest_services/homepage_instafeeds/v2/"+end_cursor, requestOptions)
    .then(response => response.text())
    .then(result => { return JSON.parse(result) })
    .catch(error => console.log('error', error));
  end_cursor = data.end_cursor;
  let element = document.getElementById("add_items");
  let items = data["items"];
  let html;
  for (let i = 0; i < items.length; i++) {
    html += '<div class="carousel-item"><a href ='+ items[i]._linkUrl + '><img src=' + items[i]._imageUrl + ' class = "d-block w-100"></a><div class="carousel-caption"><p>'+ items[i]._caption +'</p></div></div>'
  }
  element.innerHTML += html;
}

});