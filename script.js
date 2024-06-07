var map = new naver.maps.Map("map", {
  center: new naver.maps.LatLng(36.62762, 127.454883),
  zoom: 16,
});

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
var currentInfoWindow = null; // 현재 열려 있는 인포 윈도우를 추적하는 변수

markers.forEach(function (store) {
  var marker = new naver.maps.Marker({
    position: store.position,
    map: map,
    icon: markerImage,
    title: store.name,
  });

  var infowindow = new naver.maps.InfoWindow({
    content:
      '<div style="width:150px;text-align:center;padding:10px;">' +
      store.name +
      "</div>",
  });

  marker.set("category", store.category);
  marker.set("category_1", store.category_1);

  naverMarkers.push(marker);

  naver.maps.Event.addListener(marker, "click", function () {
    if (
      currentInfoWindow &&
      currentInfoWindow.getMap() &&
      currentInfoWindow.getAnchor() === marker
    ) {
      currentInfoWindow.close();
      currentInfoWindow = null;
    } else {
      if (currentInfoWindow) {
        currentInfoWindow.close();
      }

      infowindow.open(map, marker);
      currentInfoWindow = infowindow;
    }
  });
});

function filterMarkers(categoryType, category) {
  naverMarkers.forEach(function (marker) {
    if (category === "전체" || marker.get(categoryType) === category) {
      marker.setMap(map);
    } else {
      marker.setMap(null);
    }
  });

  if (currentInfoWindow) {
    currentInfoWindow.close(); // 필터링 시 인포 윈도우 닫기
    currentInfoWindow = null;
  }
}

function searchMarkers() {
  var searchInput = document.getElementById("searchInput").value.trim();
  var found = false;

  naverMarkers.forEach((marker) => {
    if (marker.getTitle().includes(searchInput)) {
      map.setCenter(marker.getPosition());
      map.setZoom(18);
      found = true;

      if (currentInfoWindow) {
        currentInfoWindow.close();
      }

      var infowindow = new naver.maps.InfoWindow({
        content:
          '<div style="width:150px;text-align:center;padding:10px;">' +
          marker.getTitle() +
          "</div>",
      });

      infowindow.open(map, marker);
      currentInfoWindow = infowindow;
    }
  });

  if (!found) {
    alert("해당 핀을 찾을 수 없습니다.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  function handleSearch() {
    console.log("Search button clicked or Enter pressed"); // 디버깅 로그 추가
    searchMarkers();
  }

  document.getElementById("searchBtn").addEventListener("click", handleSearch);

  document.getElementById("searchInput").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      console.log("Enter key pressed"); // 디버깅 로그 추가
      handleSearch();
    }
  });
});
