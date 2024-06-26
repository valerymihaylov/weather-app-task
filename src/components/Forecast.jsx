import {Link} from "react-router-dom";

function Forecast({ title, weatherData, formatToLocalTime }) {

    const getDays = weatherData => {
         let content = []
        for (let i = 0; i < weatherData.forecastWeather.length; i+=8) {
            const item = weatherData.forecastWeather[i];
            const location = weatherData.location;
            let forecastedTemp = Math.floor(item.main.temp);
            let icon = "https://openweathermap.org/img/wn/" + item.weather[0].icon + "@2x.png"
            let slug = formatToLocalTime(item.dt, "ccc")
            content.push(
                <>
                    <div className="flex flex-col items-center justify-center">
                        <Link className="text-center p-4 hover:backdrop-brightness-90" to={slug}  state={{ item, location }}>
                            <p className="font-light text-sm">{formatToLocalTime(item.dt, "ccc")}</p>
                            <img
                                src={icon}
                                className="w-12 my-1"
                                alt=""
                            />
                            <p className="font-medium">{forecastedTemp}°</p>
                        </Link>
                    </div>
                </>
            );
        }
        return content;
    };

    return (
        <div className="flex flex-col min-w-[330px] max-w-[450px] w-full">
            <div className="flex items-center justify-start mt-6">
                <p className="text-white font-medium uppercase">{title}</p>
            </div>
            <hr className="my-2"/>

            <div className="flex flex-row items-center justify-between text-white">
                {getDays(weatherData)}
            </div>
        </div>
    );
}

export default Forecast;