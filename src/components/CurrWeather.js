import React, { } from 'react'

export default function CurrWeather(props) {
 

    
    return (
        <div className="currWeather">
            <div className="temprature">{props.todayWeather.main.temp.toFixed(0)}°</div>
           
            <div className="weather__atributes">
                <div className="weather--icon owf"></div>
                <div className="weather__description">{props.todayWeather.weather[0].description}</div>
                <div className="weather__feels__like">{props.language === 'en' ? 'Feels like' : 'Ощущается как'}: {props.todayWeather.main.feels_like.toFixed(0)}°</div>
                <div className="weather__wind">{props.language === 'en' ? 'Wind' : 'Скорость ветра'}: {props.todayWeather.wind.speed}</div>
                <div className="weather__humidity">{props.language === 'en' ? 'Humidity' : 'Влажность'}: {props.todayWeather.main.humidity}%</div>
            </div>
        
        </div>
    )
}
