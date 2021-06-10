import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ capital }) => {
    const [weather, setWeather] = useState();
    const api_key = process.env.REACT_APP_API_KEY;
    
    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
            .then(response => {
                setWeather(response.data);
            });
    }, [api_key, capital]);

    if (weather) {
        return (
            <div>
                <h3>Weather in {weather.location.name}</h3>
                <div>
                    <p><b>temperature: </b>{weather.current.temperature} Celcius</p>
                    <img src={weather.current.weather_icons} alt='weather_icon' width='100' height='100' />
                    <p><b>wind: </b>{weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
                </div>
            </div>
        );
    } else {
        return null;
    }
}

export default Weather;