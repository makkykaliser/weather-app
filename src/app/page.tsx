'use client';
import {DEFAULT_LAT, DEFAULT_LONG} from "./util/constants"
import LocationForm from "./components/locationForm";
import WeatherInfo from "./components/weatherInfo";
import React from "react";

export default function Home() {
  const [weather, setWeather] = React.useState('')
  const [location, setLocation] = React.useState('')
  const [temp, setTemp] = React.useState('')
  const [forecast, setForecast] = React.useState([])
  const [lat, setLat] = React.useState(DEFAULT_LAT.toFixed(6))
  const [long, setLong] = React.useState(DEFAULT_LONG.toFixed(6))

  let sevenDayForecast = []
  const onLocateMe = () => {
    if (navigator.geolocation) {
      console.debug('k')
      navigator.geolocation.getCurrentPosition((geolocation) => {
        const lat = geolocation.coords.latitude.toFixed(6)
        const long = geolocation.coords.longitude.toFixed(6)
        setLat(lat)
        setLong(long)
      })
    }
  }

  const onCoordsChanged = (coords: { latitude: Number, longitude: Number }) => {
    let forecastUrl: URL
    let forecastHourlyUrl: URL
    let forecastGridDataUrl: URL
    let city: String
    let state: String
    fetch(
      `https://api.weather.gov/points/${coords.latitude},${coords.longitude}`,
      { method: 'GET' }
    ).then((response) => response.json())
    .then((json) => {
      console.debug(json)
      city = json.properties?.relativeLocation.properties.city
      state = json.properties?.relativeLocation.properties.state
      forecastUrl = json.properties?.forecast
      forecastHourlyUrl = json.properties?.forecastHourly
      forecastGridDataUrl = json.properties?.forecastGridData

      setLocation(`${city}, ${state}`)
    })
    .then(() => getWeather(forecastUrl))
  }

  const getWeather = (url: URL) => {
    fetch(url, {method: 'GET'})   
    .then((response) => response.json())
    .then((json) => {
      sevenDayForecast = json.properties.periods.map((period) => (
        { name: period.name, 
          shortForecast: period.shortForecast, 
          temperature: period.temperature
        }))
      setWeather(sevenDayForecast[0].shortForecast ?? '')
      setTemp(sevenDayForecast[0].temperature.toString() ?? '')
      setForecast(sevenDayForecast)
    })
  }
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <LocationForm lat={lat} long={long} onSearchCoords={onCoordsChanged} onLocateMe={onLocateMe}></LocationForm>
        <div className={'p-4'}/>
        <WeatherInfo weather={weather} location={location} temp={temp}></WeatherInfo>
      </div>
    </main>
  );
}
