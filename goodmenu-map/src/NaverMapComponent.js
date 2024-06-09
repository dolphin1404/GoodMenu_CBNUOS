import React, { useEffect, useState } from 'react';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '400px'
};

function NaverMapComponent() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/stores')
      .then(response => {
        setStores(response.data);
        const mapOptions = {
          center: new window.naver.maps.LatLng(37.5665, 126.9780),
          zoom: 15
        };
        const map = new window.naver.maps.Map('map', mapOptions);

        response.data.forEach(store => {
          new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(store.latitude, store.longitude),
            map: map,
            title: store.name
          });
        });
      });
  }, []);

  return (
    <div>
      <div id="map" style={containerStyle} />
      <div>
        {stores.map(store => (
          <div key={store.id} className="store">
            <h2>{store.name}</h2>
            <p>Phone: {store.phone}</p>
            <p>Menu: {store.menu}</p>
            <a href={store.link} target="_blank" rel="noopener noreferrer">Link</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NaverMapComponent;
