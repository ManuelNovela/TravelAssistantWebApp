import React, { createContext, useEffect, useState } from 'react';
import { WeatherData } from '../interfaces/WeatherData';
import { WeatherForecast } from '../interfaces/WeatherForecast';
import { fetchExchangeRate, fetchPopulation, fetchPopulationGDP, fetchWeatherForecast, isTokenValid} from '../api';
import { ExchangeRateData } from '../interfaces/ExchangeRateData';
import { PopulationData } from '../interfaces/PopulationData';
import { getCurrencyByCountryCode } from '../helpers/Mapper';

const DataContext = createContext();
export const DataProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
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
        }
      }, []);

    const handleCityChange = async (data: WeatherData) => {
        setContextWeatherDate(data)
        setCountry(data.country);

        setContextPopulationDate(null);
        setContextForecastDate(null);
        setContextGDP(null);

        const response = await fetchWeatherForecast(data.cityId);
        const population = await fetchPopulation(data.country);
        const gdp = await fetchPopulationGDP(data.country);

        const currency = getCurrencyByCountryCode(data.country)?? "USD";
        const exchange = await fetchExchangeRate(currency, baseCurrency);
        
        console.log(currency)
        console.log(data.city)
        console.log(data.cityId)
        console.log(data.country)
        console.log(country);
        console.log(gdp)
        console.log(response);
        console.log(population)

        setContextPopulationDate(population);
        setContextForecastDate(response);
        setContextExchangeDate(exchange);
        setContextGDP(gdp);
        
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
                contextGDP, 
                setContextGDP
            }}>
            {children}
        </DataContext.Provider>
  );
};

export default DataContext;
