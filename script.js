var HOME_PATH = window.HOME_PATH || ".";

var currentInfoWindow = null;
var map;
var userPosition;
var naverMarkers = [];
var userMarker;

function initMap() {
  map = new naver.maps.Map("map", {
    center: new naver.maps.LatLng(36.62762, 127.454883),
    zoom: 16,
    scaleControl: false,
    logoControl: false,
    mapDataControl: false,
    zoomControl: true,
    minZoom: 14,
    zoomControlOptions: {
      position: naver.maps.Position.TOP_RIGHT,
    },
  });

  navigator.geolocation.getCurrentPosition(
    function (position) {
      userPosition = new naver.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      );
      map.setCenter(userPosition);

      userMarker = new naver.maps.Marker({
        position: userPosition,
        map: map,
        title: "현재 위치",
        icon: {
          url: HOME_PATH + "/goodmenu-map/public/favicon.ico",
          scaledSize: new naver.maps.Size(48, 39),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(0, 0),
        },
      });

      loadMarkers();
    },
    function (error) {
      console.error("Geolocation error: ", error);
      loadMarkers(); // 위치 정보를 얻지 못해도 마커를 로드
    }
  );
}

var markerImage = {
  url: "https://navermaps.github.io/maps.js/docs/img/example/pin_default.png",
  size: new naver.maps.Size(50, 52),
  origin: new naver.maps.Point(0, 0),
  anchor: new naver.maps.Point(25, 52),
};

var markers = [
  {
    position: new naver.maps.LatLng(36.624303, 127.449607),
    category: "서문",
    category_1: "한식",
    name: "명장국밥 개신점",
    menu: "국밥",
  },
  {
    position: new naver.maps.LatLng(36.626117, 127.452091),
    category: "서문",
    category_1: "한식",
    name: "보통의 국수집",
  },
  {
    position: new naver.maps.LatLng(36.625669, 127.463756),
    category: "후문",
    category_1: "한식",
    name: "구룡산 한식",
  },
  {
    position: new naver.maps.LatLng(36.624039, 127.450508),
    category: "서문",
    category_1: "한식",
    name: "현고 들깨칼국수",
  },
  {
    position: new naver.maps.LatLng(36.624639, 127.467022)점
    category: "후문",
    category_1: "한식",
    name: "사나이 짬뽕",
  },
  {
    position: new naver.maps.LatLng(36.627527, 127.452819),
    category: "편의점",
    name: "양성재 CU 편의점",
  },
  {
    position: new naver.maps.LatLng(36.627766, 127.458847),
    category: "편의점",
    name: "제 1학생회관 이마트24 편의점",
  },
  {
    position: new naver.maps.LatLng(36.630457, 127.456008),
    category: "편의점",
    name: "대학본부 이마트24 편의점",
  },
  {
    position: new naver.maps.LatLng(36.62398, 127.459104),
    category: "편의점",
    name: "양진재 CU 편의점",
  },
  {
    position: new naver.maps.LatLng(36.625097, 127.457317),
    category: "편의점",
    name: "학연산 세븐일레븐 편의점",
  },
  {
    position: new naver.maps.LatLng(36.628456, 127.45754),
    category: "교내시설",
    name: "중앙도서관 쿠비앤유",
  },
  {
    position: new naver.maps.LatLng(36.62814, 127.459553),
    category: "교내시설",
    name: "개신문화관 서점",
  },
  {
    position: new naver.maps.LatLng(36.6324919, 127.4526122),
    category: "정문",
    category_1: "일식",
    name: "해리초밥",
  },
  {
    position: new naver.maps.LatLng(36.6324919, 127.4561638),
    category: "중문",
    category_1: "한식",
    name: "햇살왕만두",
  },
  {
    position: new naver.maps.LatLng(36.6330112, 127.4554684),
    category: "정문",
    category_1: "한식",
    name: "황금냄비",
  },
  {
    position: new naver.maps.LatLng(36.63264, 127.457677),
    category: "중문",
    category_1: "술집",
    name: "너구리",
  },
  {
    position: new naver.maps.LatLng(36.632358, 127.458485),
    category: "중문",
    category_1: "술집",
    name: "달빛양조장",
  },
  {
    position: new naver.maps.LatLng(36.632934, 127.459287),
    category: "중문",
    category_1: "한식",
    name: "한마음정육식당",
  },
  {
    position: new naver.maps.LatLng(36.631785, 127.460717),
    category: "중문",
    category_1: "술집",
    name: "달랑주점",
  },
  {
    position: new naver.maps.LatLng(36.63154, 127.451485),
    category: "정문",
    category_1: "일식",
    name: "가락우동",
  },
  {
    position: new naver.maps.LatLng(36.631529, 127.451488),
    category: "정문",
    category_1: "술집",
    name: "지리산",
  },
  {
    position: new naver.maps.LatLng(36.626304, 127.449565),
    category: "서문",
    category_1: "술집",
    name: "추억에 포장마차",
  },
  {
    position: new naver.maps.LatLng(36.632817, 127.459185),
    category: "중문",
    category_1: "한식",
    name: "소주신랑 보쌈부인",
    menu: "보쌈",
  },
  {
    position: new naver.maps.LatLng(36.631885, 127.459612),
    category: "중문",
    category_1: "한식",
    name: "구석집",
    menu: "돼지두부 두루치기",
  },
  {
    position: new naver.maps.LatLng(36.626073, 127.466204),
    category: "후문",
    category_1: "한식",
    name: "동읍리 개신점",
    menu: "돼지구이",
  },
  {
    position: new naver.maps.LatLng(36.632829, 127.454729),
    category: "정문",
    category_1: "한식",
    name: "미송",
    menu: "한식",
  },
  {
    position: new naver.maps.LatLng(36.632764, 127.454485),
    category: "정문",
    category_1: "양식",
    name: "흥부네 왕돈까스",
    menu: "돈까스",
  },
  {
    position: new naver.maps.LatLng(36.632304, 127.457072),
    category: "중문",
    category_1: "한식",
    name: "일미리금계찜닭",
    menu: "찜닭",
  },
  {
    position: new naver.maps.LatLng(36.631972, 127.459542),
    category: "중문",
    category_1: "일식",
    name: "하마루",
    menu: "우동",
  },
  {
    position: new naver.maps.LatLng(36.62892, 127.452269),
    category: "편의점",
    name: "이마트24 농생대점, 쿠비앤유",
  },
  {
    position: new naver.maps.LatLng(36.627229, 127.460627),
    category: "교내시설",
    name: "카페쿠비엔유 5호점",
  },
  {
    position: new naver.maps.LatLng(36.631415, 127.457137),
    category: "교내시설",
    name: "중문 ATM",
  },
  {
    position: new naver.maps.LatLng(36.627741, 127.452633),
    category: "교내시설",
    name: "양성재 ATM",
  },
  {
    position: new naver.maps.LatLng(36.627100, 127.459023),
    category: "교내시설",
    name: "학생회관 ATM",
  },
];

var naverMarkers = [];
var currentInfoWindow = null; // 현재 열려 있는 인포 윈도우를 추적하는 변수

function loadMarkers() {
  markers.forEach(function (store) {
    var marker = new naver.maps.Marker({
      position: store.position,
      map: map,
      icon: markerImage,
      title: store.name,
    });
    marker.set("category", store.category);
    marker.set("category_1", store.category_1);

    var infowindow = new naver.maps.InfoWindow({
      content:
        '<div style="width:150px;text-align:center;padding:10px;">' +
        store.name +
        "</div>",
    });

    naver.maps.Event.addListener(marker, "click", function () {
      if (infowindow.getMap()) {
        infowindow.close();
      } else {
        infowindow.open(map, marker);
      }
    });
    var link = document.createElement("a");
    link.href = `#${store.position.lat()},${store.position.lng()}`;
    link.textContent = store.name;
    link.onclick = function () {
      map.setCenter(store.position);
      map.setZoom(18);
      if (currentInfoWindow) {
        currentInfoWindow.close();
      }
      infowindow.open(map, marker);
      currentInfoWindow = infowindow;
      currentMarker = marker;
    };
    naverMarkers.push({ marker: marker, store: store });
  });

  updateStoreList("category", "전체");
}

// 카테고리 기능
function filterMarkers(categoryType, category) {
  naverMarkers.forEach(function (nMarker) {
    if (category === "전체" || nMarker.store[categoryType] === category) {
      nMarker.marker.setMap(map);
    } else {
      nMarker.marker.setMap(null);
    }
  });
  updateStoreList(categoryType, category);
}

// 상점 거리 gps 기준 계산
function getDistance(lat1, lon1, lat2, lon2) {
  function toRad(value) {
    return (value * Math.PI) / 180;
  }

  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d * 1000; // meters
}
// 가까운 상점 위치 나타내기
function updateStoreList(categoryType, category) {
  var storeList = document.getElementById("storeList");
  storeList.innerHTML = "";

  var filteredMarkers = naverMarkers.filter(function (nMarker) {
    return category === "전체" || nMarker.store[categoryType] === category;
  });

  if (userPosition) {
    filteredMarkers.sort(function (a, b) {
      var distanceA = getDistance(
        userPosition.lat(),
        userPosition.lng(),
        a.marker.getPosition().lat(),
        a.marker.getPosition().lng()
      );
      var distanceB = getDistance(
        userPosition.lat(),
        userPosition.lng(),
        b.marker.getPosition().lat(),
        b.marker.getPosition().lng()
      );
      return distanceA - distanceB;
    });
  }

  filteredMarkers.forEach(function (nMarker) {
    var distance = userPosition
      ? getDistance(
          userPosition.lat(),
          userPosition.lng(),
          nMarker.marker.getPosition().lat(),
          nMarker.marker.getPosition().lng()
        )
      : 0;
    var li = document.createElement("li");
    li.textContent = `${nMarker.store.name} (${distance.toFixed(2)}m)`;
    li.addEventListener("click", function () {
      map.setCenter(nMarker.marker.getPosition());
      map.setZoom(18);
      var infowindow = new naver.maps.InfoWindow({
        content:
          '<div style="width:150px;text-align:center;padding:10px;">' +
          nMarker.store.name +
          "</div>",
      });
      if (currentInfoWindow) {
        currentInfoWindow.close();
      }
      infowindow.open(map, nMarker.marker);
      currentInfoWindow = infowindow;
      currentMarker = nMarker.marker;
    });
    storeList.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initMap();

  function searchHandler(event) {
    event.preventDefault(); // 기본 동작 막기
    var searchInput = document.getElementById("searchInput").value.trim();
    var found = false;

    naverMarkers.forEach((nMarker) => {
      if (nMarker.marker.getTitle().includes(searchInput)) {
        map.setCenter(nMarker.marker.getPosition());
        map.setZoom(18);
        var infowindow = new naver.maps.InfoWindow({
          content:
            '<div style="width:150px;text-align:center;padding:10px;">' +
            nMarker.store.name +
            "</div>",
        });
        if (currentInfoWindow) {
          if (currentMarker === nMarker.marker) {
            currentInfoWindow.close();
            currentInfoWindow = null;
            currentMarker = null;
            return;
          } else {
            currentInfoWindow.close();
          }
        }
        infowindow.open(map, nMarker.marker);
        currentInfoWindow = infowindow;
        currentMarker = nMarker.marker;
        found = true;
      }
    });

    if (!found) {
      alert("해당 핀을 찾을 수 없습니다.");
    }
  }
  // 검색기능
  document.getElementById("searchBtn").addEventListener("click", searchHandler);
  document
    .getElementById("searchInput")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        searchHandler(event);
      }
    });

  // Check if URL has coordinates and update the map
  var hash = window.location.hash;
  if (hash) {
    var coords = hash.substring(1).split(",");
    if (coords.length === 2) {
      var lat = parseFloat(coords[0]);
      var lng = parseFloat(coords[1]);
      if (!isNaN(lat) && !isNaN(lng)) {
        var position = new naver.maps.LatLng(lat, lng);
        map.setCenter(position);
        map.setZoom(18);
      }
    }
  }
});

// Default coordinates
var schoolLocation = new naver.maps.LatLng(36.628, 127.459); // Replace with your school's coordinates
var westLocation = new naver.maps.LatLng(36.626117, 127.452091); // 서문
var mainloadLocation = new naver.maps.LatLng(36.6324919, 127.4526122); // 정문
var backloadLocation = new naver.maps.LatLng(36.625669, 127.463756); // 후문
var middleLocation = new naver.maps.LatLng(36.632358, 127.458485); // 중문

function moveToLocation(location) {
  map.setCenter(location);
  map.setZoom(17); // Adjust zoom level as needed
}

function moveToCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var currentLocation = new naver.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        moveToLocation(currentLocation);
      },
      function () {
        // If user denies geolocation, move to the default school location
        moveToLocation(schoolLocation);
      }
    );
  } else {
    // If browser doesn't support geolocation, move to the default school location
    moveToLocation(schoolLocation);
  }
}

// Add the event listener for the school location button
document
  .getElementById("schoolLocationBtn")
  .addEventListener("click", function () {
    moveToCurrentLocation();
  });

// Add event listeners for other location buttons
document.getElementById("mainBtn").addEventListener("click", function () {
  moveToLocation(schoolLocation);
  map.setZoom(16);
});
document.getElementById("mainBtn1").addEventListener("click", function () {
  moveToLocation(schoolLocation);
});
document
  .getElementById("westLocationBtn")
  .addEventListener("click", function () {
    moveToLocation(westLocation);
  });

document
  .getElementById("mainloadLocationBtn")
  .addEventListener("click", function () {
    moveToLocation(mainloadLocation);
  });

document
  .getElementById("backloadLocationBtn")
  .addEventListener("click", function () {
    moveToLocation(backloadLocation);
  });

document
  .getElementById("middleLocationBtn")
  .addEventListener("click", function () {
    moveToLocation(middleLocation);
  });


// 처음 사용자용 가이드

document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("hasVisited")) {
    document.getElementById("userGuideModal").style.display = "block";
  }
});

function closeGuide() {
  document.getElementById("userGuideModal").style.display = "none";
  localStorage.setItem("hasVisited", "true");
}