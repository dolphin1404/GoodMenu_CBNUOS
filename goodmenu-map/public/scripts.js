var mapOptions = {
  center: new naver.maps.LatLng(36.627620, 127.454883),
  zoom: 16,
};

var map = new naver.maps.Map("map", mapOptions);

var markerImage = {
  url: 'https://navermaps.github.io/maps.js/docs/img/example/pin_default.png',
  size: new naver.maps.Size(50, 52),
  origin: new naver.maps.Point(0, 0),
  anchor: new naver.maps.Point(25, 52)
};

var markers = [];

function createMarker(position, title) {
  var marker = new naver.maps.Marker({
      position: position,
      map: map,
      icon: markerImage,
      title: title
  });

  markers.push(marker);

  var infowindow = new naver.maps.InfoWindow({
      content: '<div style="width:150px;text-align:center;padding:10px;">' + title + '</div>'
  });

  naver.maps.Event.addListener(marker, 'click', function() {
      infowindow.open(map, marker);
  });
}

createMarker(new naver.maps.LatLng(36.624303, 127.449607), '명장국밥 개신점');
createMarker(new naver.maps.LatLng(36.626117, 127.452091), '보통의 국수집');
createMarker(new naver.maps.LatLng(36.625669, 127.463756), '구룡산 한식');
createMarker(new naver.maps.LatLng(36.624039, 127.450508), '현고 들깨칼국수');
createMarker(new naver.maps.LatLng(36.624639, 127.467022), '사나이 짬뽕');

var storeList = document.getElementById("storeList");
var storeDetails = document.getElementById("storeDetails");

fetch("http://127.0.0.1:5500/stores/")
  .then((response) => response.json())
  .then((data) => {
      console.log("Data Loaded:", data);
      data.forEach((store) => {
          let marker = new naver.maps.Marker({
              position: new naver.maps.LatLng(store.latitude, store.longitude),
              map: map,
              title: store.name,
              icon: markerImage,
          });
          markers.push(marker);

          let li = document.createElement("li");
          li.textContent = store.name;
          li.addEventListener("click", () => {
              map.setCenter(marker.getPosition());
              map.setZoom(25);
              showDetails(store);
          });
          storeList.appendChild(li);
      });
  })
  .catch((error) => {
      console.error("Error loading data:", error);
  });

function showDetails(store) {
  storeDetails.innerHTML = `
      <h2>${store.name}</h2>
      <p>전화번호: ${store.phone}</p>
      <p>메뉴: ${store.menu}</p>
      <p>링크: <a href="${store.link}" target="_blank">${store.link}</a></p>
      <p>위도: ${store.latitude}</p>
      <p>경도: ${store.longitude}</p>
  `;
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('searchBtn').addEventListener('click', function() {
      var searchInput = document.getElementById('searchInput').value.trim();
      var found = false;

      markers.forEach(marker => {
          if (marker.getTitle().includes(searchInput)) {
              map.setCenter(marker.getPosition());
              map.setZoom(18);
              found = true;
          }
      });

      if (!found) {
          alert('해당 핀을 찾을 수 없습니다.');
      }
  });
});

let navOpen = false; // 상태 변수

function toggleNav(navId) {
  let nav = document.getElementById(navId);
  if (nav) { // nav가 null이 아닌 경우에만 동작
      if (navOpen) {
          closeNav(nav);
      } else {
          openNav(nav);
      }
      navOpen = !navOpen; // 상태 변경
  } else {
      console.error(`Element with ID ${navId} not found`);
  }
}

function openNav(nav) {
  nav.style.width = "500px"; // width 값을 500px로 변경
}

function closeNav(nav) {
  nav.style.width = "0";
}
