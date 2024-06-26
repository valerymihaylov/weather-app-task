
function TimeAndLocation({weatherData, formatToLocalTime}) {

    return (
        <>
            <div className="flex items-center justify-center my-6">
                <p className="text-white text-xl font-extralight text-center">
                    {formatToLocalTime(weatherData.time -1)}
                </p>
            </div>
            <div className="flex items-center justify-center my-3">
                <p className="text-white text-3xl font-medium capitalize">
                    {weatherData.location }
                </p>
            </div>
        </>
    )
}

export default TimeAndLocation;