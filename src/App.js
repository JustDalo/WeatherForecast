import React from "react";

import BackGroundImage from "./components/backGroundImage";

import CurrWeather from "./components/CurrWeather";
import CurrDate from "./components/Date";
import WeatherForecast from "./components/WeatherForecast";
import { City, VoiceSearch } from "./components/Search";

import mapboxgl from 'mapbox-gl';
import 'moment/locale/ru';

mapboxgl.accessToken = 'pk.eyJ1IjoianVzdGRhbG8iLCJhIjoiY2tvcXV5bGRiMHo0bDJ5bnVvZGZ2OG9tbiJ9.Ipu3ac3wlDlWxP_N72IWjg';

const moment = require('moment-timezone');
let map;


class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currWeatherData: [],

      degrees: 'metric',
      language: 'en',

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

      forecastfirstDay: [],
      forecastSecondDay: [],
      forecastThirdDay: [],

      error: null,
      isLoaded: false,
    };
    this.mapContainer = React.createRef();
    this.GetDegrees = this.GetDegrees.bind(this);
    this.GetLanguage = this.GetLanguage.bind(this);
  }




  componentDidMount() {
    let currCity;
    let currCountry;
    let currTimezone;
    let currLanguage;
    let degrees;
    let currWeather;
    let currLat;
    let currLon;



    fetch(`https://ipinfo.io/json?token=f642613f374b09`)
      .then(response => response.json())
      .then(data => {
        currCity = data.city;
        currTimezone = data.timezone;

        if (localStorage.getItem('degrees') != null) {
          degrees = localStorage.getItem('degrees');
        }
        else {
          degrees = 'metric';
        }
        if (localStorage.getItem('language') != null) {
          currLanguage = localStorage.getItem('language');
        }
        else {
          currLanguage = 'en';
        }
        moment.locale(currLanguage);

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&lang=${currLanguage}&appid=a9a3a62789de80865407c0452e9d1c27&units=${degrees}`)
          .then(response => response.json())
          .then((data) => {
            // const Icon = document.querySelector('.weather--icon');
            // console.log(data.weather[0].icon);
            // Icon.className = 'weather--icon owf';
            // Icon.classList.add(`owf-${data.weather[0].id}`);

            currWeather = data;
            currCountry = data.sys.country
            currLat = data.coord.lat;
            currLon = data.coord.lon;

            console.log('loop');

            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${currLat}&lon=${currLon}&exclude=current,hourly,minutely,alerts&units=${degrees}&appid=a9a3a62789de80865407c0452e9d1c27`)
              .then(response => response.json())
              .then(
                (data) => {
                  this.setState({
                    isLoaded: true,
                    currWeatherData: currWeather,

                    city: currCity,
                    country: currCountry,
                    timezone: currTimezone,

                    lat: currLat,
                    lon: currLon,

                    forecastfirstDay: data.daily[1],
                    forecastSecondDay: data.daily[2],
                    forecastThirdDay: data.daily[3],

                    language: currLanguage,

                  })

                  this.interval = setInterval(() => this.setState({
                    day: moment().tz(this.state.timezone).format('dddd'),
                    month: moment().tz(this.state.timezone).format('MMMM Do'),
                    time: moment().tz(this.state.timezone).format('h:mm:ss a'),
                  }), 1000);

                  map = new mapboxgl.Map({
                    container: this.mapContainer.current,
                    style: 'mapbox://styles/mapbox/dark-v10',
                    center: [this.state.lon, this.state.lat],
                    zoom: 11
                  });
                },
                (error) => {
                  this.setState({
                    isLoaded: true,
                    error
                  })
                }
              )
          },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              })
            })



        this.GetNewImage();



      });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate() {

  }

  GetLanguage = (e) => {
    let lan = e.target.value;
    moment.locale(lan);

    localStorage.setItem('language', lan);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&lang=${lan}&appid=a9a3a62789de80865407c0452e9d1c27&units=${this.state.degrees}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          currWeatherData: data,
          language: lan,
        })


      })
      .catch(error => console.log(error))
  }

  GetDegrees = (e) => {
    let deg = e.target.value;
    let currWeather;
    localStorage.setItem('degrees', deg);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&lang=${this.state.language}&appid=a9a3a62789de80865407c0452e9d1c27&units=${deg}`)
      .then(response => response.json())
      .then(data => {
        currWeather = data;
  
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lon}&exclude=current,hourly,minutely,alerts&units=${deg}&appid=a9a3a62789de80865407c0452e9d1c27`)
          .then(response => response.json())
          .then(data => {
              this.setState({

                currWeatherData: currWeather,

            

                forecastfirstDay: data.daily[1],
                forecastSecondDay: data.daily[2],
                forecastThirdDay: data.daily[3],

                degrees: deg,
              })
            }
            
          )
      }) 
      .catch (error => console.log(error))

  }


  GetNewImage = () => {
    let scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    fetch(`https://source.unsplash.com/1920x${scrollHeight}/?$fog`)
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

    let currLat;
    let currLon;
    let currCountry;
    let currWeather;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${City}&lang=${language}&appid=a9a3a62789de80865407c0452e9d1c27&units=${degrees}`)
      .then(response => response.json())
      .then(data => {
        currWeather = data;
        const Icon = document.querySelector('.weather--icon');
        Icon.className = 'weather--icon owf';
        Icon.classList.add(`owf-${data.weather[0].id}`);

        currCountry = data.sys.country;

        currLat = data.coord.lat;
        currLon = data.coord.lon;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${currLat}&lon=${currLon}&exclude=current,hourly,minutely,alerts&units=${degrees}&appid=a9a3a62789de80865407c0452e9d1c27`)
          .then(response => response.json())
          .then(data => {
            this.setState({
              timezone: data.timezone,

              currWeatherData: currWeather,

              city: City,
              country: currCountry,


              lat: currLat,
              lon: currLon,

              forecastfirstDay: data.daily[1],
              forecastSecondDay: data.daily[2],
              forecastThirdDay: data.daily[3],

              day: moment().tz(this.state.timezone).format('dddd'),
              month: moment().tz(this.state.timezone).format('MMMM Do'),
              time: moment().tz(this.state.timezone).format('h:mm:ss a'),

            })
            map.jumpTo({ 'center': [this.state.lon, this.state.lat], 'zoom': 11 });
          })





      })
      .catch(error => console.log(error))

  }




  render() {
    const { error, isLoaded } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (<div>Loading...</div>);
    } else {
      return (
        <div className="overlay">

          <div className="button__cluster">
            <div className="button__cluster__left">
              <BackGroundImage ImageMethod={this.GetNewImage} />
              <div className="language__buttons">
                <button className="button__en" value="en" onClick={e => this.GetLanguage(e)}>en</button>
                <button className="button__ru" value="ru" onClick={e => this.GetLanguage(e)}>ru</button>
              </div>

              <div className="degrees__buttons">
                <button className="button__F" value="imperial" onClick={e => this.GetDegrees(e)}>°F</button>
                <button className="button__C" value="metric" onClick={e => this.GetDegrees(e)}>°C</button>
              </div>
            </div>
            <div className="button__cluster__right">

              <VoiceSearch
                GetCity={this.GettingWeather}
                language={this.state.language} />
            </div>

          </div>
          <div className="main">
            <div className="weather">
              <div className="weather__section">
                <CurrDate
                  language={this.state.language}
                  country={this.state.country}
                  city={this.state.city}
                  time={this.state.time}
                  day={this.state.day}
                  month={this.state.month}
                />
                <CurrWeather
                  todayWeather={this.state.currWeatherData}
                  language={this.state.language}
                />

              </div>
              <div className="weather__Forecast__section">
                <WeatherForecast
                  Forecast={this.state.forecastfirstDay}
                  language={this.state.language}
                />
                <WeatherForecast
                  Forecast={this.state.forecastSecondDay}
                  language={this.state.language}
                />
                <WeatherForecast
                  Forecast={this.state.forecastThirdDay}
                  language={this.state.language}
                />
              </div>
            </div>

            <div className="map__container">
              <div ref={this.mapContainer} className="map" />
              <div className="coords">{this.state.language === 'en' ? 'Latitude' : 'Широта'}: {this.state.lat} - {this.state.language === 'en' ? 'Longtitude' : 'Долгота'}: {this.state.lon}</div>
            </div>
          </div>




        </div>
      );
    }
  }
}

export default App;