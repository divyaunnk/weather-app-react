import React, { useState } from "react";
import { UilLocationPoint, UilSearch } from "@iconscout/react-unicons";
import { toast } from "react-toastify";
function Inputs({setQuery,query, units, setUnits}) {

  console.log("city from App conponent :", query);

  const [city,setCity] = useState("");
  const handleSearchClick = () => {
    if (city !=='') setQuery({q: city})
  }

  const handleLocationClick = () => {
    if (navigator.geolocation) {
    toast.info("Fetching user's location.")
    navigator.geolocation.getCurrentPosition((position) => {
      toast.success("Location fetched!");    
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  const handleUnitChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units!== selectedUnit) setUnits(selectedUnit);
  };

  console.log("city : ", city)
  return (
    <div className="flex flex-row justify-center my6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
        value={city} onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Search for city..."
          className="text-xl font-light p-2 w-full shadow-xl focus: outline-none placeholder: lowercase"
        ></input>
        <UilSearch
          size={25}
          onClick={handleSearchClick}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
        />
        <UilLocationPoint
          size={25}
          onClick={handleLocationClick}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
        />
        <div className="flex flex-row w-1/4 items-center justify-center">
          <button name="metric"
            onClick={handleUnitChange}
            className="text-xl font-light text-white transition ease-out hover:scale-125" >°C</button>
          <p className="text-xl text-white mx-1">|</p>
          <button name="imperial"
            onClick={handleUnitChange}
            className="text-xl font-light text-white transition ease-out hover:scale-125">°F</button>
        </div>
      </div>
    </div>
  );
}

export default Inputs;
