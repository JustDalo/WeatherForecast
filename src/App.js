import React from "react";

import BackGroundImage from "./components/backGroundImage";

import CurrWeather from "./components/CurrWeather";
import CurrDate from "./components/Date";
import WeatherForecast from "./components/WeatherForecast";
import { City, VoiceSearch } from "./components/Search";
import SetLanguage from "./components/SetLanguage";

import mapboxgl from 'mapbox-gl';


mapboxgl.accessToken = 'pk.eyJ1IjoianVzdGRhbG8iLCJhIjoiY2tvcXV5bGRiMHo0bDJ5bnVvZGZ2OG9tbiJ9.Ipu3ac3wlDlWxP_N72IWjg';

const moment = require('moment-timezone');
let map;


class App extends React.PureComponent {


  constructor(props) {
    super(props);
    this.state = {
      temp: undefined,
      weatherDescription: undefined,
      feelsLike: undefined,
      wind: undefined,
      humidity: undefined,
      degrees: undefined,

      country: undefined,
      city: undefined,
      lat: undefined,
      lon: undefined,
      map: undefined,
      zoom: 1,

      timezone: undefined,
      time: undefined,
      day: undefined,
      month: undefined,

      firstForecastTemp: undefined,
      secondForecastTemp: undefined,
      thirdForecastTemp: undefined,
      firstForecastDay: undefined,
      secondForecastDay: undefined,
      thirdForecastDay: undefined,
      firstForecastIcon: undefined,
      secondForecastIcon: undefined,
      thirdForecastIcon: undefined,
    };
    this.mapContainer = React.createRef();
  }

  componentDidMount() {
    let city;
    let degrees = 'metric';
    let language = 'en';
 


    fetch(`https://ipinfo.io/json?token=f642613f374b09`)
      .then(response => response.json())
      .then(data => {
        city = data.city;
        this.setState({
          city: data.city,
          timezone: data.timezone,
        });


        if (localStorage.getItem('degress') != null) {
          degrees = localStorage.getItem('degress');
        }
        if (localStorage.getItem('language') != null) {
          language = localStorage.getItem('language');
        }
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${language}&appid=a22a0229c938f98549e173a33c5ee9cc&units=${degrees}`)
          .then(response => response.json())
          .then(data => {
            const Icon = document.querySelector('.weather--icon');
            Icon.className = 'weather--icon owf';
            Icon.classList.add(`owf-${data.weather[0].id}`);

            this.setState({
              country: data.sys.country,
              temp: data.main.temp.toFixed(0),
              weatherDescription: data.weather[0].description,
              feelsLike: data.main.feels_like.toFixed(0),
              wind: data.wind.speed,
              humidity: data.main.humidity,
              lon: data.coord.lon,
              lat: data.coord.lat,

            });
            lat = this.state.lat;
            lon = this.state.lon;

            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lon}&exclude=current,hourly,minutely,alerts&units=${degrees}&appid=a22a0229c938f98549e173a33c5ee9cc`)
              .then(response => response.json())
              .then(data => {
                this.setState({
                  firstForecastTemp: data.daily[1].temp.day.toFixed(0),
                  secondForecastTemp: data.daily[2].temp.day.toFixed(0),
                  thirdForecastTemp: data.daily[3].temp.day.toFixed(0),
                  firstForecastDay: new Date(data.daily[1].dt * 1000).toLocaleString("en-us", {
                    weekday: "long"
                  }),
                  secondForecastDay: new Date(data.daily[2].dt * 1000).toLocaleString("en-us", {
                    weekday: "long"
                  }),
                  thirdForecastDay: new Date(data.daily[3].dt * 1000).toLocaleString("en-us", {
                    weekday: "long"
                  }),
                  firstForecastIcon: "http://openweathermap.org/img/w/" + data.daily[1].weather[0].icon + ".png",
                  secondForecastIcon: "http://openweathermap.org/img/w/" + data.daily[2].weather[0].icon + ".png",
                  thirdForecastIcon: "http://openweathermap.org/img/w/" + data.daily[3].weather[0].icon + ".png",

                })
              })

            { this.GetNewImage() }
            map = new mapboxgl.Map({
              container: this.mapContainer.current,
              style: 'mapbox://styles/mapbox/dark-v10',
              center: [this.state.lon, this.state.lat],
              zoom: 11
            });
          })



        { this.GetDate() }


      });




  }

  GetDate = () => {

    this.setState({
      day: moment().tz(this.state.timezone).format('dddd'),
      month: moment().tz(this.state.timezone).format('MMMM Do'),
      time: moment().tz(this.state.timezone).format('h:mm:ss a'),
    })
    setTimeout(this.GetDate, 1000);
  }


  GetNewImage = () => {
    let scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    fetch(`https://source.unsplash.com/1920x${scrollHeight}/?${this.state.weatherDescription}`)
      .then((response) => {
        document.body.style = `background-image: url(${response.url});`;
      })
      .catch(error => console.log(error));
  }



  GettingWeather = () => {

    let degrees = 'metric';
    let language = 'en';
    if (localStorage.getItem('degress') != null) {
      degrees = localStorage.getItem('degress');
    }

    if (localStorage.getItem('language') != null) {
      language = localStorage.getItem('language');
    }
    let city = City;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${City}&lang=${language}&appid=a22a0229c938f98549e173a33c5ee9cc&units=${degrees}`)
      .then(response => response.json())
      .then(data => {
        const Icon = document.querySelector('.weather--icon');
        Icon.className = 'weather--icon owf';
        Icon.classList.add(`owf-${data.weather[0].id}`);

        this.setState(({
          country: data.sys.country,
          city: city,
          temp: data.main.temp.toFixed(0),
          weatherDescription: data.weather[0].description,
          feelsLike: data.main.feels_like.toFixed(0),
          wind: data.wind.speed,
          humidity: data.main.humidity,
          lon: data.coord.lon,
          lat: data.coord.lat,
        }));

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lon}&exclude=current,hourly,minutely,alerts&units=${degrees}&appid=a22a0229c938f98549e173a33c5ee9cc`)
          .then(response => response.json())
          .then(data => {
            this.setState({
              timezone: data.timezone,
              firstForecastTemp: data.daily[1].temp.day.toFixed(0),
              secondForecastTemp: data.daily[2].temp.day.toFixed(0),
              thirdForecastTemp: data.daily[3].temp.day.toFixed(0),
              firstForecastDay: new Date(data.daily[1].dt * 1000).toLocaleString("ru-RU", {
                weekday: "long"
              }),
              secondForecastDay: new Date(data.daily[2].dt * 1000).toLocaleString("en-us", {
                weekday: "long"
              }),
              thirdForecastDay: new Date(data.daily[3].dt * 1000).toLocaleString("en-us", {
                weekday: "long"
              }),
              firstForecastIcon: "http://openweathermap.org/img/w/" + data.daily[1].weather[0].icon + ".png",
              secondForecastIcon: "http://openweathermap.org/img/w/" + data.daily[2].weather[0].icon + ".png",
              thirdForecastIcon: "http://openweathermap.org/img/w/" + data.daily[3].weather[0].icon + ".png",

            })
          })
        { this.GetDate() }

        map.jumpTo({ 'center': [this.state.lon, this.state.lat], 'zoom': 11 });


      })
      .catch(error => console.log(error))




  }




  render() {
    return (
      <div className="overlay">

        <div className="button__cluster">
          <div className="button__cluster__left">
            <BackGroundImage ImageMethod={this.GetNewImage} />
            <SetLanguage />
            <div className="degrees__buttons">
              <button className="button__F" onClick={e => {
                localStorage.setItem('degress', 'imperial');
                this.forceUpdate();
              }}>°F</button>
              <button className="button__C" onClick={e => { localStorage.setItem('degress', 'metric') }}>°C</button>
            </div>
          </div>
          <div className="button__cluster__right">

            <VoiceSearch GetCity={this.GettingWeather} />
          </div>

        </div>
        <div className="main">
          <div className="weather">
            <div className="weather__section">
              <CurrDate
                country={this.state.country}
                city={this.state.city}
                time={this.state.time}
                day={this.state.day}
                month={this.state.month}
              />
              <CurrWeather
                temp={this.state.temp}
                description={this.state.weatherDescription}
                feelsLike={this.state.feelsLike}
                wind={this.state.wind}
                humidity={this.state.humidity}
              />

            </div>
            <div className="weather__Forecast__section">
              <WeatherForecast
                ForecastTemp={this.state.firstForecastTemp}
                ForecastDay={this.state.firstForecastDay}
                ForecastIcon={this.state.firstForecastIcon}
              />
              <WeatherForecast
                ForecastTemp={this.state.secondForecastTemp}
                ForecastDay={this.state.secondForecastDay}
                ForecastIcon={this.state.secondForecastIcon}
              />
              <WeatherForecast
                ForecastTemp={this.state.thirdForecastTemp}
                ForecastDay={this.state.thirdForecastDay}
                ForecastIcon={this.state.thirdForecastIcon}
              />
            </div>
          </div>

          <div className="map__container">
            <div ref={this.mapContainer} className="map" />
            <div className="coords">Latitude: {this.state.lat} - Longtitude: {this.state.lon}</div>
          </div>
        </div>




      </div>
    );
  }
}

export default App;