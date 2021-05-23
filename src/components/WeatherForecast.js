import React from 'react'

export default function WeatherForecast(props) {
    return (
        <div className="weather__forecast">
            <div className="weatherForecast__day">{new Date(props.Forecast.dt * 1000).toLocaleString(`${props.language}`, {
                weekday: "long"
              })}</div>
            <div className="weatherForecast__info">
                <div className="weatherForecast__temp">{props.Forecast.temp.day.toFixed(0)}°</div>
                <div className="weatherForecast__icon"><img className="img" src={"http://openweathermap.org/img/w/" + props.Forecast.weather[0].icon + ".png"} alt=""></img></div>

            </div>
        </div>
    )
}
