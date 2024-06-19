import React, { createContext, useEffect, useState } from 'react';
import { WeatherData } from '../interfaces/WeatherData';
import { WeatherForecast } from '../interfaces/WeatherForecast';
import { fetchExchangeRate, fetchPopulation, fetchPopulationGDP, fetchWeatherForecast, isTokenValid} from '../api';
import { ExchangeRateData } from '../interfaces/ExchangeRateData';
import { PopulationData } from '../interfaces/PopulationData';
import { getCountryNameByCode, getCurrencyByCountryCode } from '../helpers/Mapper';

const DataContext = createContext();
export const DataProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [countryName, setCountryName] = useState<string>("");
    const [baseCurrency, setBaseCurrency] = useState<string>("MZN");
    const [countryCurrency, setCountryCurrency] = useState<string>("USD");
    const [country, setCountry] = useState<string>("");
    const [contextWeatherDate, setContextWeatherDate] = useState<WeatherData>(null);
    const [contextForecastDate, setContextForecastDate] = useState<WeatherForecast>(null);
    const [contextExchangeDate, setContextExchangeDate] = useState<ExchangeRateData>(null);
    const [contextPopulation, setContextPopulationDate] = useState<PopulationData>(null);
    const [contextGDP, setContextGDP] = useState<PopulationData>(null);

    useEffect(() => {
      if (isTokenValid()) {
          setIsLoggedIn(true);
          if(isLoggedIn && contextWeatherDate?.city!=null){
            handleCityChange(contextWeatherDate);
          }
        }
    }, []);

    useEffect(() => {
      if(isLoggedIn && contextWeatherDate?.city!=null){
        handleCityChange(contextWeatherDate);
      }
    }, [isLoggedIn]);

    const handleCityChange = async (data: WeatherData) => {
        setContextWeatherDate(data)
        setCountry(data.country);
        setCountryName(getCountryNameByCode(data.country)?? "");
        const currency = getCurrencyByCountryCode(data.country)?? "USD";
        

        setContextPopulationDate(null);
        setContextForecastDate(null);
        setContextGDP(null);

        const response = await fetchWeatherForecast(data.cityId);
        setContextForecastDate(response);

        console.log(currency)
        console.log(data.city)
        console.log(data.cityId)
        console.log(data.country)
        console.log(country);
        console.log(response);

        if(isLoggedIn){
          const population = await fetchPopulation(data.country);
          console.log(population)
          setContextPopulationDate(population);
          
          
          const gdp = await fetchPopulationGDP(data.country);
          console.log(gdp)
          setContextGDP(gdp);
          
          const exchange = await fetchExchangeRate(currency, baseCurrency);
          setContextExchangeDate(exchange);
        } 
    };

    return (
        <DataContext.Provider value={{ 
                isLoggedIn, 
                setIsLoggedIn,
                baseCurrency,
                country, 
                setCountry,
                setBaseCurrency,
                countryCurrency, 
                setCountryCurrency,
                contextWeatherDate,
                setContextWeatherDate,     
                contextForecastDate, 
                setContextForecastDate,
                contextExchangeDate,
                setContextExchangeDate,
                handleCityChange,
                contextPopulation,
                setContextPopulationDate,
                countryName, 
                setCountryName,
                contextGDP, 
                setContextGDP
            }}>
            {children}
        </DataContext.Provider>
  );
};

export default DataContext;
