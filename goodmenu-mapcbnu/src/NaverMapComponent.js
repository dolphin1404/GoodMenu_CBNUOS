import React, { useEffect, useState } from 'react';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '400px'
};

function NaverMapComponent() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/restaurants')
      .then(response => {
        setRestaurants(response.data);
        const mapOptions = {
          center: new window.naver.maps.LatLng(37.5665, 126.9780),
          zoom: 15
        };
        const map = new window.naver.maps.Map('map', mapOptions);

        response.data.forEach(restaurant => {
          new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(restaurant.latitude, restaurant.longitude),
            map: map,
            title: restaurant.name
          });
        });
      });
  }, []);

  return <div id="map" style={containerStyle} />;
}

export default NaverMapComponent;
