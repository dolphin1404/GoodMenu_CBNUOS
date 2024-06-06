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
  { position: new naver.maps.LatLng(36.624639, 127.467022), category: '쿠폰', name: '사나이 짬뽕' }
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
