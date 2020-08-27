import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";

import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";
import { render } from "@testing-library/react";

const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 22.917017,
  lng: 47.930289,
};

export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const x1=45.805297;
  const y1=1.337069;
  const x2=30.375826;
  const y2=76.775195;
  const flightPath = [{ lat: x1 ,lng: y1 },
    { lat: x2, lng: y2 }];
  const [markers, setMarkers] = React.useState([]);
  const [selected] = React.useState(null);


  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
    setMarkers((current) => [
      ...current,
      {
        lat: 30.375826,
        lng: 76.775195,
        time: new Date(),
      },
    ]);

  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  render()
  return (
    <div>

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={3}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >

          {markers.map((marker) => (
          <div>
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: 30.375826, lng: 76.775195 }}
            icon={{
              url: `/location.png`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
         
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: 45.805297, lng: 1.337069 }}
            icon={{
              url: `/location.png`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: x1, lng: y1 }}
            onClick={() => {
              move(x1,y1,x2,y2);
            }}
            
            icon={{
              url: `/jet.png`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
           <Polyline
                path={flightPath}
                geodesic={true}
                options={{
                    strokeColor: "#ff2527",
                    strokeOpacity: 0.5,
                    strokeWeight: 2,
                    icons: [
                        {
                            icon: "-_-_-",
                            offset: "0",
                            repeat: "20px"
                        }
                    ]
                }}
            />
            
          </div>
        ))}

        {selected ? (
          move()
        ) : null}
      </GoogleMap>
    </div>
  );
}

function move(x1,y1,x2,y2) {
  for(var i = 0; i<100; i++)
  {
      x1+=(x2-x1)/(100-i);
      y1+=(y2-y1)/(100-i);
      //rerender the component with updated values
  } 
}  
