import React, { createContext, useEffect, useState } from 'react';
import { WeatherData } from '../interfaces/WeatherData';
import { WeatherForecast } from '../interfaces/WeatherForecast';
import { useWeatherForecastQuery } from '../api';

const DataContext = createContext();
export const DataProvider = ({ children }) => {


    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [contextWeatherDate, setContextWeatherDate] = useState<WeatherData>(null);
    const [contextForecastDate, setContextForecastDate] = useState<WeatherForecast>(null);

    
    //const {data} = useWeatherForecastQuery(contextWeatherDate.cityId);
    useEffect(() => {
        console.log("mmmmm")
        console.log(contextWeatherDate)
    }, [contextWeatherDate]);


    return (
        <DataContext.Provider value={{ 
                isLoggedIn, 
                setIsLoggedIn,
                contextWeatherDate,
                setContextWeatherDate,     
                contextForecastDate, 
                setContextForecastDate
            }}>
            {children}
        </DataContext.Provider>
  );
};

export default DataContext;
