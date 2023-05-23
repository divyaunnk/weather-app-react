import { DateTime } from "luxon";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(process.env.REACT_APP_BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({
    ...searchParams,
    appid: process.env.REACT_APP_API_KEY,
  });
  return fetch(url).then((res) => res.json().then((data) => data));
};

const formatCurrentWeather = (data) => {
  console.log("formatCurrentWeather: ", data)
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;
  const { main: details, icon } = weather[0];
  console.log("weather current data: ",data)
  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    speed,
    details,
    icon,
  };
};

const formatForecastWeather = (data) => {
    console.log("weather forecast data: ", data)
    const { city: {name, timezone},list} = data;
    console.log("weather in data list",data.list.slice(0,5));
    const hourly = list.slice(0,5).map((d, index) => {   
        console.log("time: ", formatToLocalTime(d.dt, timezone, "ccc"), d.dt,d.dt_text, timezone) 
        return {
            id: index,
            title: formatToLocalTime(d.dt, timezone, "ccc"),
            temp: (d.main.temp.toFixed() - 273.15).toFixed(),
            icon : d.weather[0].icon
        };
    });
    console.log("formatForecastWeather : ", {name, timezone, ...hourly})
    return {name, timezone,hourly};
    // let { timezone, daily, hourly } = data;
    // console.log("data", data);
    // daily = daily.slice(1, 6).map((d) => {
    //   return {
    //     title: formatToLocalTime(d.dt, timezone, "ccc"),
    //     temp: d.temp.day,
    //     icon: d.weather[0].icon,
    //   };
    // });
  
    // hourly = hourly.slice(1, 6).map((d) => {
    //   return {
    //     title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
    //     temp: d.temp,
    //     icon: d.weather[0].icon,
    //   };
    // });
  
    // return { timezone, daily, hourly };
  };

  const getFormattedWeatherData = async (searchParams) => {
    console.log(searchParams)
    const formattedCurrentWeather = await getWeatherData(
      "weather",
      searchParams
    ).then(formatCurrentWeather);
  
    const { lat, lon } = formattedCurrentWeather;
  
    const formattedForecastWeather = await getWeatherData("forecast", {
      lat,
      lon
    }).then(formatForecastWeather);
  
    return { ...formattedCurrentWeather, ...formattedForecastWeather };
  };
  
  const formatToLocalTime = (
    secs,
    zone,
    // format = " cccc , LLL dd yyyy"
    format = "ccc, dd LLL yyyy' | Local time: 'hh:mm a"
  ) => {
    console.log("formatted zone",formatZone(zone));
    // zone = zone.toString();
    return DateTime.fromSeconds(secs).setZone(formatZone(zone)).toFormat(format);
    // return DateTime.fromSeconds(secs).setZone(`UTC+5:30`).toFormat(format); 
  } 
  
  const formatZone = (zone) => {
    let sign = zone.toString()[0] === "-" ? "-" : "+";
    let d = sign === '-' ? parseInt(zone.toString().slice(1)) : parseInt(zone.toString()) 
    return `UTC${sign}${d/3600}`;
  }
  
  
  const iconUrlFromCode = (code) =>
    `http://openweathermap.org/img/wn/01n@2x.png`;
  
  export default getFormattedWeatherData;
  
  export { formatToLocalTime, iconUrlFromCode };
