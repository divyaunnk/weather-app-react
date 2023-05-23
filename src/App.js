import "./App.css";
import TopButton from "./components/TopButton";
import Inputs from "./components/Inputs";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureDetails from "./components/TemperatureDetail";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherServices";
import { useEffect, useState } from "react";
function App() {
  const [query, setQuery] = useState({ q: "boston" });
  const [units, setUnit] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        setWeather(data);
      });
    };

    fetchWeather();
    
  }, [query, units]);

  return (
    <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-600">
      <TopButton />
      <Inputs />
      {weather && (
        <div>
          <TimeAndLocation weather={weather}/>
          <TemperatureDetails weather={weather}/>

          <Forecast title="hourly forecast" items={weather.hourly}/>
          <Forecast title="daily forecast" items={weather.hourly}/>
        </div>
      )}
    </div>
  );
}

export default App;
