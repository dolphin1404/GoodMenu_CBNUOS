function moveToMarker(markerTitle) {
  var found = false;
  naverMarkers.forEach(function (marker) {
    if (marker.getTitle() === markerTitle) {
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
