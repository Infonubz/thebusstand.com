import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import locationicon from "../../assets/locationicon.png";
function Googlemap({ height, width }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD5R2BzBDq_qq0D5vg_yjgTZlD6imvcxRs",
  });
  const CustomIcon = ({ icon }) => (
    <div style={{ width: "32px", height: "32px" }}>
      <img
        src={icon}
        alt="Current Location Icon"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
  const containerStyle = {
    width: width ? width : "550px",
    height: height ? height : "300px",
  };
  const lat = Number(localStorage.getItem("latitude"));
  const lng = Number(localStorage.getItem("longitude"));

  console.log(lat, lng, "hello");
  const center = {
    lat: lat ? lat : 11.15656006295173,
    lng: lng ? lng : 77.3401068819217,
  };
  // const center=[]
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
      setMap(map);
    },
    [center]
  );

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      clickableIcons
    >
      {lat && lng && (
        <Marker position={center} icon={<CustomIcon icon={locationicon} />} />
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Googlemap);
