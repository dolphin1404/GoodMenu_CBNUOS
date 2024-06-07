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
          url: HOME_PATH + "./goodmenu-map/public/favicon.ico",
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
    position: new naver.maps.LatLng(36.624639, 127.467022),
    category: "후문",
    category_1: "한식",
    name: "사나이 짬뽕",
  },
  {
    position: new naver.maps.LatLng(36.627527, 127.452819),
    category: "교내시설",
    name: "양성재 CU 편의점",
  },
  {
    position: new naver.maps.LatLng(36.627766, 127.458847),
    category: "교내시설",
    name: "제 1학생회관 이마트24 편의점",
  },
  {
    position: new naver.maps.LatLng(36.630457, 127.456008),
    category: "교내시설",
    name: "대학본부 이마트24 편의점",
  },
  {
    position: new naver.maps.LatLng(36.62398, 127.459104),
    category: "교내시설",
    name: "양진재 CU 편의점",
  },
  {
    position: new naver.maps.LatLng(36.625097, 127.457317),
    category: "교내시설",
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
    category: "정문",
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
    category: "정문",
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
];

var naverMarkers = [];

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

    naverMarkers.push({ marker: marker, store: store });
  });

  updateStoreList();
}

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

function updateStoreList(categoryType, category) {
  var storeList = document.getElementById("storeList");
  storeList.innerHTML = "";

  var filteredMarkers = naverMarkers.filter(function (nMarker) {
    return category === "전체" || nMarker.store[categoryType] === category;
  });

  if (userPosition) {
    filteredMarkers.sort(function (a, b) {
      var distanceA = naver.maps.geometry.spherical.computeDistanceBetween(
        userPosition,
        a.marker.getPosition()
      );
      var distanceB = naver.maps.geometry.spherical.computeDistanceBetween(
        userPosition,
        b.marker.getPosition()
      );
      return distanceA - distanceB;
    });
  }

  filteredMarkers.forEach(function (nMarker) {
    var li = document.createElement("li");
    li.textContent = nMarker.store.name;
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
          currentInfoWindow.close();
        }
        infowindow.open(map, nMarker.marker);
        currentInfoWindow = infowindow;
        found = true;
      }
    });

    if (!found) {
      alert("해당 핀을 찾을 수 없습니다.");
    }
  }

  document.getElementById("searchBtn").addEventListener("click", searchHandler);
  document
    .getElementById("searchInput")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        searchHandler(event);
      }
    });
});
