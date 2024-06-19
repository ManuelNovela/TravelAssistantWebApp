import React, { createContext, useState } from 'react';
import { WeatherData } from '../interfaces/WeatherData';
import { WeatherForecast } from '../interfaces/WeatherForecast';
import { fetchPopulation, fetchPopulationGDP, fetchWeatherForecast} from '../api';
import { ExchangeRateData } from '../interfaces/ExchangeRateData';
import { PopulationData } from '../interfaces/PopulationData';

const DataContext = createContext();
export const DataProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
    const [baseCurrency, setBaseCurrency] = useState<string>("USD");
    const [countryCurrency, setCountryCurrency] = useState<string>("MZN");
    const [country, setCountry] = useState<string>("MZ");
    const [contextWeatherDate, setContextWeatherDate] = useState<WeatherData>(null);
    const [contextForecastDate, setContextForecastDate] = useState<WeatherForecast>(null);
    const [contextExchangeDate, setContextExchangeDate] = useState<ExchangeRateData>(null);
    const [contextPopulation, setContextPopulationDate] = useState<PopulationData>(null);
    const [contextGDP, setContextGDP] = useState<PopulationData>(null);


    const handleCityChange = async (data: WeatherData) => {
        setContextWeatherDate(data)
        const response = await fetchWeatherForecast(data.cityId);
        console.log(response);
        setContextForecastDate(response);
        const population = await fetchPopulation(country);
        setContextPopulationDate(population);
        const gdp = await fetchPopulationGDP(country);
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
