import * as React from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  return (
    <Map
      style={{ width: "100%", minHeight: 600 }}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      initialViewState={{
        longitude: 105.6810675,
        latitude: 21.0226686,
        zoom: 5.5,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker 
        latitude={21.0226686} 
        longitude={105.6810675} 
        anchor="bottom"
        color="red"
      >
        {/* <img src="./pin.png" /> */}
      </Marker>
    </Map>
  );
}

export default App;
