import {Link, useLocation} from "react-router-dom";
import {DateTime} from "luxon";
import {ArrowLeft, Droplet, Wind} from "react-feather";

function ForecastDetails() {
    let { state } = useLocation();
    let icon = "https://openweathermap.org/img/wn/" + state.item.weather[0].icon + "@2x.png"

    const formatToLocalTime = (secs, format = "cccc, d LLLL yyyy") => DateTime.fromSeconds(secs).toFormat(format);

    return (
       <>
           <div className="max-w-screen-sm relative flex flex-col items-center justify-center bg-gradient-to-br from-blue-700 to-indigo-700 h-fit shadow-xl shadow-gray-400 rounded-xl my-28 mx-4 py-2 px-10 md:max-w-screen-md sm:px-32 sm:py-5 sm:my-28 sm:mx-auto">
               <div className="flex items-center">
                   <Link className="bg-[#4e76ff] py-2 px-2 rounded-full text-white absolute left-[10%] drop-shadow-lg shadow-slate-700 hover:drop-shadow-2xl hover:scale-110 transition transform" to={"/"}>
                       <ArrowLeft></ArrowLeft>
                   </Link>
                   <h1 className="text-4xl font-semibold text-white text-center my-8">Live Weather App</h1>
               </div>
               <div className="flex items-center justify-center my-6">
                   <p className="text-white text-xl font-extralight text-center">
                       {formatToLocalTime(state.item.dt)}
                   </p>
               </div>
               <div className="flex items-center justify-center my-3">
                   <p className="text-white text-3xl font-medium capitalize">
                       {state.location}
                   </p>
               </div>
               <div className="flex flex-col min-w-[330px] max-w-[450px] w-full">
                   <div className="flex flex-row items-center justify-evenly text-white py-3">
                       <div className="flex flex-col items-center justify-center">
                           <img src={icon} alt="" className="w-20"/>
                           <p className="text-center text-2xl text-white">{state.item.weather[0].main}</p>
                       </div>
                       <p className="text-5xl">{Math.floor(state.item.main.temp)}°</p>
                       <div className="flex flex-col space-y-2">
                           <div className="flex font-light text-sm items-center justify-center py-3">
                               <Droplet size={18} className="mr-1"/>
                               Humidity:
                               <span className="font-medium ml-1">{state.item.main.humidity}%</span>
                           </div>
                           <div className="flex font-light text-sm items-center justify-center">
                               <Wind size={18} className="mr-1"/>
                               Wind:
                               <span className="font-medium ml-1">{Math.floor(state.item.wind.speed)} km/h</span>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </>
    );
}

export default ForecastDetails;