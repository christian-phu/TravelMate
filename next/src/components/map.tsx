import React, { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import { map } from "lodash";

function App({ addressData }) {

  // function getMapData(addressData: any) {
  //   let mapData: any = [];
  //   addressData.map((address: any) => {
  //     axios
  //       .get(
  //         `https://api.mapbox.com/geocoding/v5/mapbox.places/${address.address}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`
  //       )
  //       .then((response) => {
  //         console.log("response", response);
  //         mapData.push({
  //           ...address,
  //           longitude: response.data.features[0].center[0],
  //           latitude: response.data.features[0].center[1],
  //         });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   });
  //   console.log("mapData", mapData);
  // }
  const [markerData, setMarkerData] = useState([]);
  const fetchData = async (addressData: any) => {
    let mapData: any = [];
    for (let i = 0; i <= addressData.length; i++) {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressData[i].address}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`
        );
        mapData.push({
          ...addressData[i],
          longitude: response.data.features[0].center[0],
          latitude: response.data.features[0].center[1],
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    console.log("mapData", mapData);
    setMarkerData(mapData);
  };


  if (!addressData || addressData.length === 0) {
    console.log('addressData không có giá trị', addressData);
  } else {
    console.log('addressData có giá trị', addressData);
  }

  useEffect(() => {
    if (addressData && addressData.length > 0) {
      fetchData(addressData);
    }
  }, [addressData]);

  return (
    <Map
      style={{ width: "100%", minHeight: 600 }}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      initialViewState={{
        longitude: 105.6810675,
        latitude: 21.0226686,
        zoom: 8.5,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {/* <Marker latitude={11.6420438} longitude={107.74287369999999} anchor="bottom" color="red">
        <img src="https://lh5.googleusercontent.com/p/AF1QipMrp0aJUbkF6QyynCT3IsRANK3dAuwcDfdmXwYj=w92-h92-n-k-no" alt="" />
      </Marker> */}
      {markerData.map((address: any) => {
        return (
          <Marker
            key={address.id}
            latitude={address.latitude}
            longitude={address.longitude}
            anchor="bottom"
            color="red"
          ></Marker>
        );
        console.log("address >>>>>>", address);
      })}
    </Map>
  );
}

export default App;
