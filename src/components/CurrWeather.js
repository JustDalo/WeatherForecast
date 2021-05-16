import React, { } from 'react'

export default function CurrWeather(props) {

    return (
        <div>
            <h6 className="temprature">{props.temp}</h6>
            <i className="weather--icon owf"></i>
            <div className="weather__atributes">
                <div className="weather__description">{props.description}</div>
                <div className="weather__feels__like">{props.feelsLike}</div>
                <div className="weather__wind">{props.wind}</div>
                <div className="weather__humidity">{props.humidity}</div>
            </div>
        
        </div>
    )
}
