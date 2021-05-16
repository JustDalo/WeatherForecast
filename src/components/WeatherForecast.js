import React from 'react'

export default function WeatherForecast(props) {
    return (
        <div>
            <div className="weatherForecast__day">{props.ForecastInfo}</div>
            <div className="weatherForecast__info">
                <div className="weatherForecast__icon"></div>
                <div className="weatherForecast__temp"></div>
                <div className="weatherForecast__desctription"></div>
            </div>
        </div>
    )
}
