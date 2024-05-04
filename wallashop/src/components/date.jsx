import { useEffect, useState } from "react";
//import axios from "axios";

function DateTime() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }

    // con api para convertir latitud y longitud en ciudad (futura implementación)
    /*
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        axios
          .get(
            `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=TU_CLAVE_DE_API`
          )
          .then((response) => {
            setCity(response.data.results[0].components.city);
          });
      });
    }
    */

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <span>
      {currentDate.toLocaleString()} - Ubicación:{" "}
      {location
        ? `Latitud: ${location.latitude}, Longitud: ${location.longitude}`
        : "Ubicación no disponible"}
    </span>
  );
}

export default DateTime;
