import React, { useRef, useEffect } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoiYmVuamFtaW5kcGIiLCJhIjoiY2x0ZmJ4a2NsMG9xbTJwbjlyeTJzdnhscyJ9.3Hcg4PS1aq8o12OLrhdooQ';

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [-70.6465, -33.4946],
      zoom: 9,
    });
  });

  return (
    <div className='mt-3'>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default Map;
