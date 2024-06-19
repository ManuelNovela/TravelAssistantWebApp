import React, { createContext, useEffect, useState } from 'react';
import { WeatherData } from '../interfaces/WeatherData';
import { WeatherForecast } from '../interfaces/WeatherForecast';
import { fetchExchangeRate, fetchWeatherForecast, useWeatherForecastQuery } from '../api';
import { ExchangeRateData } from '../interfaces/ExchangeRateData';

const DataContext = createContext();
export const DataProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
    const [baseCurrency, setBaseCurrency] = useState<string>("USD");
    const [countryCurrency, setCountryCurrency] = useState<string>("MZN");
    const [contextWeatherDate, setContextWeatherDate] = useState<WeatherData>(null);
    const [contextForecastDate, setContextForecastDate] = useState<WeatherForecast>(null);
    const [contextExchangeDate, setContextExchangeDate] = useState<ExchangeRateData>(null);


    const handleCityChange = async (data: WeatherData) => {
        setContextWeatherDate(data)
        const response = await fetchWeatherForecast(data.cityId);
        console.log(response);
        setContextForecastDate(response);
        //pegar a moeda do pais
        const currency = await fetchExchangeRate(baseCurrency,countryCurrency);
        setContextExchangeDate(currency);
    };


    return (
        <DataContext.Provider value={{ 
                isLoggedIn, 
                setIsLoggedIn,
                baseCurrency,
                setBaseCurrency,
                countryCurrency, 
                setCountryCurrency,
                contextWeatherDate,
                setContextWeatherDate,     
                contextForecastDate, 
                setContextForecastDate,
                contextExchangeDate,
                setContextExchangeDate,
                handleCityChange
            }}>
            {children}
        </DataContext.Provider>
  );
};

export default DataContext;
