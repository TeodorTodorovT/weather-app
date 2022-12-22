import './App.css';
import CurrentWeather from './components/current-weather/CurrentWeather';
import Search from './components/search/Search';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import { useState } from 'react';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecastWeather, setForecastWeather] = useState(null)

  const onSearchChangeHandler = (searchData) => {
    
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastWeatherFetch = fetch(`${WEATHER_API_URL}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,&appid=${WEATHER_API_KEY}&units=metric`);

    //https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

    Promise.all([currentWeatherFetch, forecastWeatherFetch]).then(async (response) => {
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();

      setCurrentWeather({city: searchData.label, ...weatherResponse});
      setForecastWeather({city: searchData.label, ...forecastResponse});
    }).catch(err => console.log(err))

  }

  console.log(currentWeather);
  console.log(forecastWeather);


  return (
    <div className="container">
      <Search onSearchChange={onSearchChangeHandler}/>
      {currentWeather && <CurrentWeather data={currentWeather}/>}
    </div>
  );
}

export default App;
