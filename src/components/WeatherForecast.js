import React from 'react'

export default function WeatherForecast(props) {
    const weatherIcon = `weatherForecast__icon owf owf-${props.Forecast.weather[0].id} owf-2x`;
    return (
        <div className="weather__forecast">
            <div className="weatherForecast__day">{new Date(props.Forecast.dt * 1000).toLocaleString(`${props.language}`, {
                weekday: "long"
              })}</div>
            <div className="weatherForecast__info">
                <div className="weatherForecast__temp">{props.Forecast.temp.day.toFixed(0)}°</div>
                <div className={weatherIcon}></div>

            </div>
        </div>
    )
}
