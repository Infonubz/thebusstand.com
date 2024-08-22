import React, { useEffect, useState } from "react";
import {
  Circle,
  GoogleMap,
  useJsApiLoader,
  Marker,
} from "@react-google-maps/api";
import locationicon from "../../assets/locationicon.png";
import busmap from "../../assets/mapbus.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function GooglemapRadius({ height, width }) {
  const busdata = useSelector((state) => state.bus_data);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD5R2BzBDq_qq0D5vg_yjgTZlD6imvcxRs",
  });

  const [cities, setCities] = useState([]);
  const [sourcedata, setSourceData] = useState({
    lat: 13.079579322748875,
    lng: 80.27216449452075,
  });

  useEffect(() => {
    const departure = localStorage.getItem("depature");
    if (departure === "Chennai") {
      setSourceData({ lat: 13.076235141903437, lng: 80.26804462155536 });
    } else if (departure === "Bangalore") {
      setSourceData({ lat: 12.972681690136117, lng: 77.61375471425302 });
    } else {
      setSourceData({ lat: 17.409660273652626, lng: 78.50209774697157 });
    }
  }, []);

  const [map, setMap] = useState(null);
  const circleOptions = {
    strokeColor: "#8CB6BD",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#8CB6BD",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 15000,
    center: sourcedata,
  };
  const circleOptions1 = {
    strokeColor: "#637CA7",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#637CA7",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 5000,
    center: sourcedata,
  };
  useEffect(() => {
    const fetchCities = async () => {
      try {
        // hyderabad

        // const nearbyCities = [
        //   {
        //     name: "Vanasthalipuram",
        //     lat: 17.333302686256662,
        //     lng: 78.57519265789192,
        //     count: 2,
        //   },
        //   {
        //     name: "Madhapur",
        //     lat: 17.449418564581123,
        //     lng: 78.39224623190127,
        //     count: 1,
        //   },
        //   {
        //     name: "Mehdipatnam",
        //     lat: 17.396030340854804,
        //     lng: 78.42899132553993,
        //     count: 2,
        //   },
        //   {
        //     name: "Kompally",
        //     lat: 17.536755069534173,
        //     lng: 78.48531927879182,
        //     count: 1,
        //   },
        // ];

        const nearbyCities = [
          {
            name: "Guindy",
            lat: 13.006684787942243,
            lng: 80.22078785994835,
            count: 2,
          },
          {
            name: "Porur",
            lat: 13.038113504986677,
            lng: 80.15604428404214,
            count: 1,
          },
          {
            name: "Perambur",
            lat: 13.12081624756937,
            lng: 80.2334482168963,
            count: 2,
          },
          {
            name: "T. Nagar",
            lat: 13.041632055130622,
            lng: 80.2351776348972,
            count: 1,
          },
          {
            name: "Velachery",
            lat: 12.974847520824747,
            lng: 80.22097329060284,
            count: 1,
          },
        ];
        nearbyCities.sort(
          (city1, city2) =>
            calculateDistance(sourcedata, city1) -
            calculateDistance(sourcedata, city2)
        );
        const fiveCities = nearbyCities.slice(0, 5);
        setCities(fiveCities);
      } catch (error) {
        console.error("Error fetching nearby cities:", error);
      }
    };

    if (map) {
      fetchCities();
    }
  }, [sourcedata, map]);

  const calculateDistance = (point1, point2) => {
    const R = 6371e3;
    const φ1 = (point1?.lat * Math.PI) / 180;
    const φ2 = (point2?.lat * Math.PI) / 180;
    const Δφ = ((point2?.lat - point1?.lat) * Math.PI) / 180;
    const Δλ = ((point2?.lng - point1?.lng) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
  };

  const [currentplace, setCurrentPlace] = useState("");
  const navigation = useNavigate();

  useEffect(() => {
    if (currentplace === "Vanasthalipuram" || currentplace === "Madhapur") {
      localStorage.setItem("depature", currentplace);
      navigation("/dashboard", { state: { currentplace } });
    }
  }, [currentplace]);

  const containerStyle = {
    width: width || "550px",
    height: height || "300px",
  };

  const onLoad = React.useCallback((map) => {
    setMap(map);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={sourcedata}
      zoom={11} // Set an initial zoom level
      onLoad={(map) => onLoad(map)}
    >
      {sourcedata.lat && sourcedata.lng && (
        <>
          <Marker
            position={{ lat: sourcedata.lat, lng: sourcedata.lng }}
            icon={{
              url: locationicon,
              scaledSize: new window.google.maps.Size(50, 50), // Adjust size as needed
            }}
          />
          <Circle options={circleOptions} />
          <Circle options={circleOptions1} />
          {cities.map((city, index) => (
            <Marker
              key={city.name}
              position={{ lat: city.lat, lng: city.lng }}
              title={city.name}
              icon={{
                url: busmap,
                scaledSize: new window.google.maps.Size(40, 40), // Adjust size as needed
                labelOrigin: new window.google.maps.Point(20, 15), // Adjust the label origin point
              }}
              label={{
                text: city.count.toString(), // Convert bus count to string
                color: "white",
                fontSize: "1vw",
                fontWeight: "bold",
              }}
              onClick={() => setCurrentPlace(city.name)}
            />
          ))}
        </>
      )}
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
}

export default React.memo(GooglemapRadius);
