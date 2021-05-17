import React from "react";

import BackGroundImage from "./components/backGroundImage";
import Search from "./components/search";
import Degrees from "./components/Degrees";
import CurrWeather from "./components/CurrWeather";
import CurrDate from "./components/Date";
import Map from "./components/Map";
import WeatherForecast from "./components/WeatherForecast";


import csc from 'country-state-city';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoianVzdGRhbG8iLCJhIjoiY2tvcXV5bGRiMHo0bDJ5bnVvZGZ2OG9tbiJ9.Ipu3ac3wlDlWxP_N72IWjg';


class App extends React.PureComponent {


  constructor(props) {
    super(props);
    this.state = {
      temp: undefined,
      weatherDescription: undefined,
      feelsLike: undefined,
      wind: undefined,
      humidity: undefined,

      country: undefined,
      city: undefined,
      lat: undefined,
      lon: undefined,
      zoom: 9,

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
    let lat;
    let lon;


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

            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lon}&exclude=current,hourly,minutely,alerts&units=metric&appid=a22a0229c938f98549e173a33c5ee9cc`)
              .then(response => response.json())
              .then(data => {
                this.setState({
                  firstForecastTemp: data.daily[0].temp.day.toFixed(0),
                  secondForecastTemp: data.daily[1].temp.day.toFixed(0),
                  thirdForecastTemp: data.daily[2].temp.day.toFixed(0),
                  firstForecastDay: new Date(data.daily[0].dt * 1000).toLocaleString("en-us", {
                    weekday: "long"
                  }),
                  secondForecastDay: new Date(data.daily[1].dt * 1000).toLocaleString("en-us", {
                    weekday: "long"
                  }),
                  thirdForecastDay: new Date(data.daily[2].dt * 1000).toLocaleString("en-us", {
                    weekday: "long"
                  }),
                  firstForecastIcon: "http://openweathermap.org/img/w/" + data.daily[0].weather[0].icon + ".png",
                  secondForecastIcon: "http://openweathermap.org/img/w/" + data.daily[1].weather[0].icon + ".png",
                  thirdForecastIcon: "http://openweathermap.org/img/w/" + data.daily[2].weather[0].icon + ".png",

                })
              })

            { this.GetNewImage() }
            /*const map = new mapboxgl.Map({
              container: this.mapContainer.current,
              style: 'mapbox://styles/mapbox/streets-v9',
              center: [lon, lat],
              zoom: 8
            });

            map.on('move', () => {
              const { lon, lat } = map.getCenter();

              this.setState({
                lon: lon.toFixed(4),
                lat: lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
              });
            });*/

          })



          {this.GetDate()};


      });




  }

  GetDate = () => {
    let moment = require('moment-timezone');
    this.setState({
      day: moment().tz(this.state.timezone).format('dddd'),
      month: moment().tz(this.state.timezone).format('MMMM Do'),
      time: moment().tz(this.state.timezone).format('h:mm:ss a'),
    })
    setTimeout(this.GetDate, 1000);
  }


  GetNewImage = () => {
    fetch(`https://source.unsplash.com/1920x1080/?${this.state.weatherDescription}`)
      .then((response) => {
        document.body.style = `background-image: url(${response.url});`;
      })
      .catch(error => console.log(error));
  }

  GetWeatherForecast = () => {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=38.7267&lon=-9.1403&exclude=current,hourly,minutely,alerts&units=metric&appid=a22a0229c938f98549e173a33c5ee9cc`)
      .then(function (response) {
        response.json().then(function (data) {
          var fday = "";
          data.daily.forEach((value, index) => {
            if (index > 0) {
              var dayname = new Date(value.dt / 1000)
              var icon = value.weather[0].icon;
              var temp = value.temp.day.toFixed(0);


            }
          });
        });
      })
  }



  GettingWeather = (e) => {
    e.preventDefault();
    let degrees = 'metric';
    let language = 'en';
    if (localStorage.getItem('degress') != null) {
      degrees = localStorage.getItem('degress');
    }

    if (localStorage.getItem('language') != null) {
      language = localStorage.getItem('language');
    }
    let city = e.target.elements.city.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${language}&appid=a22a0229c938f98549e173a33c5ee9cc&units=${degrees}`)
      .then(response => response.json())
      .then(data => {
        const Icon = document.querySelector('.weather--icon');
        Icon.className = 'weather--icon owf';
        Icon.classList.add(`owf-${data.weather[0].id}`);


        let newTimezone = data.timezone;

        let moment = require('moment-timezone');
        let day = moment().tz(newTimezone).format('MMMM Do')
        console.log(day);
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
        let lat = this.state.lat;
        let lon = this.state.lon;
        console.log(lat);
        console.log(lon);
        /*const map = new mapboxgl.Map({
          container: this.mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v9',
          center: [this.state.lon, this.state.lat],
          zoom: 8
        });*/



      })
      .catch(error => console.log(error))
  }


  render() {
    return (
      <div>
        {this.GetWeatherForecast()}
        <div className="button__cluster">
          <div className="button__cluster__left">
            <BackGroundImage ImageMethod={this.GetNewImage} />
            <Degrees />
          </div>
          <div className="button__cluster__right">
            <Search GetCity={this.GettingWeather} />
          </div>
        </div>
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

        <div ref={this.mapContainer} className="mapContainer" />

      </div>
    );
  }
}

export default App;