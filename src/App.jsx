import './App.css';
import TimeAndLocation from "./components/TimeAndLocation.jsx";
import TemperatureDetails from "./components/TemperatureDetails.jsx";
import Forecast from "./components/Forecast.jsx";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { Loader } from "react-feather";
import Dexie from "dexie";

const db = new Dexie('WeatherAppDatabase');
db.version(1).stores({ preferences: 'id, unit' });

const useWeatherData = (location, unit) => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        if (location) {
            const API_KEY = "7864c9551922335fb6c243378261cd38";
            const { latitude, longitude } = location;

            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${API_KEY}`)
                .then(response => response.json())
                .then(data => {
                    setWeatherData({
                        location: data.city.name,
                        temperature: Math.floor(data.list[0].main.temp),
                        tempHigh: Math.floor(data.list[0].main.temp_max),
                        tempLow: Math.floor(data.list[0].main.temp_min),
                        realFeel: Math.floor(data.list[0].main.feels_like),
                        humidity: data.list[0].main.humidity,
                        windSpeed: Math.floor(data.list[0].wind.speed),
                        weatherCondition: data.list[0].weather[0].main,
                        sunrise: data.city.sunrise,
                        sunset: data.city.sunset,
                        icon: `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`,
                        time: data.list[0].dt,
                        timezone: data.city.timezone,
                        forecastWeather: data.list.slice(7, 40),
                    });
                })
                .catch(error => console.log(error));
        }
    }, [location, unit]);

    return weatherData;
};

function App() {
    const [location, setLocation] = useState(null);
    const [unit, setUnit] = useState('metric');
    const weatherData = useWeatherData(location, unit);

    useEffect(() => {
        db.preferences.get(1, preference => {
            if (preference) {
                setUnit(preference.unit);
            }
        });
    }, []);

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log("Geolocation not supported");
        }
    };

    const success = (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
    };

    const error = () => {
        console.log("Unable to retrieve your location");
    };

    const toggleUnit = () => {
        const newUnit = unit === 'metric' ? 'imperial' : 'metric';
        setUnit(newUnit);
        db.preferences.put({ id: 1, unit: newUnit });
    };

    const formatToLocalTime = (secs, format = "cccc, d LLLL yyyy") => DateTime.fromSeconds(secs).toFormat(format);

    return (
        <div
            className="max-w-screen-sm flex flex-col items-center justify-center bg-gradient-to-br from-blue-700 to-indigo-700 h-fit shadow-xl shadow-gray-400 rounded-xl my-28 mx-4 py-2 px-10 md:max-w-screen-md sm:px-32 sm:py-5 sm:my-28 sm:mx-auto">
            <h1 className="text-4xl font-semibold text-white text-center my-8">Live Weather App</h1>
            {!location ? (
                <button
                    className="bg-[#4e76ff] text-white py-2 px-4 mb-8 rounded-full drop-shadow-lg shadow-slate-700 hover:drop-shadow-xl hover:scale-105 transition transform"
                    onClick={handleLocationClick}>
                    Get Location
                </button>
            ) : null}

            {location && !weatherData ? (
                <div className="flex flex-col items-center justify-center text-white">
                    <Loader className="animate-spin" />
                    <p>Loading weather data...</p>
                </div>
            ) : null}

            {weatherData ? (
                <>
                    <button className="bg-[#4e76ff] text-white py-2 px-4 rounded-full drop-shadow-lg shadow-slate-700 hover:drop-shadow-xl hover:scale-105 transition transform" onClick={toggleUnit}>
                         {unit === 'metric' ? <span>Change to F °</span> : <span>Change to C °</span>}
                    </button>
                    <TimeAndLocation weatherData={weatherData} formatToLocalTime={formatToLocalTime} />
                    <TemperatureDetails weatherData={weatherData} unit={unit} formatToLocalTime={formatToLocalTime} />
                    <Forecast title="daily forecast" weatherData={weatherData} formatToLocalTime={formatToLocalTime} />
                </>
            ) : null}
        </div>
    );
}

export default App;
