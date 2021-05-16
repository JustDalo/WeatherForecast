import React, { } from 'react'

export default function CurrWeather(props) {

    return (
        <div className="currWeather">
            <div className="temprature">{props.temp}°</div>
            
            <div className="weather__atributes">
                <div className="weather--icon owf"></div>
                <div className="weather__description">{props.description}</div>
                <div className="weather__feels__like">feels like: {props.feelsLike}°</div>
                <div className="weather__wind">wind: {props.wind}</div>
                <div className="weather__humidity">humidity: {props.humidity}%</div>
            </div>
        
        </div>
    )
}
