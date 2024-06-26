import {Thermometer, Droplet, Wind, Sunrise, Sunset, Sun} from "react-feather";

function TemperatureDetails({weatherData,unit, formatToLocalTime}) {
console.log(weatherData)
    return (
        <>
            <div>
                <div className="flex flex-row items-center justify-evenly text-white py-3">
                    <div className="flex flex-col items-center justify-center">
                        <img src={weatherData.icon} alt="" className="w-20"/>
                        <p className="text-center text-2xl text-white">{weatherData.weatherCondition}</p>
                    </div>
                    <p className="text-5xl">{weatherData.temperature}°</p>
                    <div className="flex flex-col space-y-2">
                        <div className="flex font-light text-sm items-center justify-center">
                            <Thermometer size={18} className="mr-1"/>
                            Real feel:
                            <span className="font-medium ml-1">{weatherData.realFeel}°</span>
                        </div>
                        <div className="flex font-light text-sm items-center justify-center py-3">
                            <Droplet size={18} className="mr-1"/>
                            Humidity:
                            <span className="font-medium ml-1">{weatherData.humidity}%</span>
                        </div>
                        <div className="flex font-light text-sm items-center justify-center">
                            <Wind size={18} className="mr-1"/>
                            Wind:
                            <span className="font-medium ml-1">{weatherData.windSpeed} {unit === 'metric' ? "km/h" : "mph"} </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
                    <Sunrise />
                    <p className="font-light">
                        Rise:{" "}
                        <span className="font-medium ml-1">
            {formatToLocalTime(weatherData.sunrise, "HH:mm")}
          </span>
                    </p>
                    <p className="font-light">|</p>

                    <Sunset />
                    <p className="font-light">
                        Set:{" "}
                        <span className="font-medium ml-1">
            {formatToLocalTime(weatherData.sunset, "HH:mm")}
          </span>
                    </p>
                    <p className="font-light">|</p>

                    <Sun />
                    <p className="font-light">
                        High:{" "}
                        <span className="font-medium ml-1">{weatherData.tempHigh}°</span>
                    </p>
                    <p className="font-light">|</p>

                    <Sun />
                    <p className="font-light">
                        Low:{" "}
                        <span className="font-medium ml-1">{weatherData.tempLow}°</span>
                    </p>
                </div>
            </div>
        </>
    );
}

export default TemperatureDetails;