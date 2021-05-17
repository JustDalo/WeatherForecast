import React from 'react'

export default function WeatherForecast(props) {
    return (
        <div className="weather__forecast">
            <div className="weatherForecast__day">{props.ForecastDay}</div>
            <div className="weatherForecast__info">
                <div className="weatherForecast__temp">{props.ForecastTemp}°</div>
                <div className="weatherForecast__icon"><img className="img" src={props.ForecastIcon}></img></div>

            </div>
        </div>
    )
}
