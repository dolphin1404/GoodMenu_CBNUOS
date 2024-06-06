var map = new naver.maps.Map('map', {
  center: new naver.maps.LatLng(36.62762, 127.454883),
  zoom: 16
});

var markerImage = {
  url: 'https://navermaps.github.io/maps.js/docs/img/example/pin_default.png',
  size: new naver.maps.Size(50, 52),
  origin: new naver.maps.Point(0, 0),
  anchor: new naver.maps.Point(25, 52)
};

var markers = [
  { position: new naver.maps.LatLng(36.624303, 127.449607), category: '음식점', name: '명장국밥 개신점' },
  { position: new naver.maps.LatLng(36.626117, 127.452091), category: '카페', name: '보통의 국수집' },
  { position: new naver.maps.LatLng(36.625669, 127.463756), category: '펜션', name: '구룡산 한식' },
  { position: new naver.maps.LatLng(36.624039, 127.450508), category: '주차장', name: '현고 들깨칼국수' },
  { position: new naver.maps.LatLng(36.624639, 127.467022), category: '쿠폰', name: '사나이 짬뽕' },
  { position: new naver.maps.LatLng(36.627527, 127.452819), category: '편의점', name: '양성재 CU 편의점' },
  { position: new naver.maps.LatLng(36.627766, 127.458847), category: '편의점', name: '제 1학생회관 이마트24 편의점' },
  { position: new naver.maps.LatLng(36.630457, 127.456008), category: '편의점', name: '대학본부 이마트24 편의점' },
  { position: new naver.maps.LatLng(36.623980, 127.459104), category: '편의점', name: '양진재 CU 편의점' },
  { position: new naver.maps.LatLng(36.625097, 127.457317), category: '편의점', name: '학연산 세븐일레븐 편의점' },
  { position: new naver.maps.LatLng(36.628456, 127.457540), category: '도서관', name: '중앙도서관' },
  { position: new naver.maps.LatLng(36.628140, 127.459553), category: '서점', name: '서점'}
];

var naverMarkers = [];

markers.forEach(function (store) {
  var marker = new naver.maps.Marker({
      position: store.position,
      map: map,
      icon: markerImage,
      title: store.name
  });
  marker.set('category', store.category);
  naverMarkers.push(marker);
});

function filterMarkers(category) {
  naverMarkers.forEach(function (marker) {
      if (category === '전체' || marker.get('category') === category) {
          marker.setMap(map);
      } else {
          marker.setMap(null);
      }
  });
}
