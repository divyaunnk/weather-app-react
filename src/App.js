import "./App.css";
import TopButton from "./components/TopButton";
import Inputs from "./components/Inputs";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureDetails from "./components/TemperatureDetail";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherServices";
import { useEffect, useState } from "react";

import {  Zoom} from 'react-toastify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [query, setQuery] = useState({ q: "boston" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {

    const fetchWeather = async () => {
      const message = query.q? query.q : 'current location';
      toast.info("Fetching weather for "+ message);
      console.log("query inside app component:",query)
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.info(`Successfully fetched weather for ${data.name}, ${data.country}.`)
        setWeather(data);
      });
    };

    fetchWeather();
    
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20: 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-400 to-red-300";
  }
  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br ${formatBackground()} h-fit shadow-xl shadow-gray-600`}>
      <TopButton setQuery={setQuery}/>
      <Inputs setQuery={setQuery} query={query} units={units} setUnits={setUnits}/>
      {weather && (
        <div>
          <TimeAndLocation weather={weather}/>
          <TemperatureDetails weather={weather}/>

          <Forecast title="hourly forecast" items={weather.hourly}/>
          {/* <Forecast title="daily forecast" items={weather.hourly}/> */}
        </div>
      )}
    <ToastContainer autoClose={5000} theme='colored' newestOnTop={true} transition={Zoom}/>  
    </div>
  );
}

export default App;
