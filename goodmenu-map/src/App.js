import React from 'react';
import './App.css';
import NaverMapComponent from './NaverMapComponent';
import OffcanvasExample from './OffcanvasExample';

function App() {
  return (
    <div className="App">
      <h1>Nearby Restaurants</h1>
      <OffcanvasExample />
      <NaverMapComponent />
    </div>
  );
}

export default App;
