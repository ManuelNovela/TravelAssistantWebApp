
import React, { useState } from "react";
import {ExchangeRates} from '../components/ExchangeRates/ExchangeRates';
import SearchBar from '../components/SearchBar/SearchBar';
import PopulationGDP from '../components/PopulationGDP/PopulationGDP';
import WeatherForecast from '../components/WeatherForecast/WeatherForecast';
import { Box, Flex, Grid, GridItem, border } from "@chakra-ui/react";

const Home = () => {
    const [cityData, setCityData] = useState<unknown>(null);

    const mockCityData = {
        populationGDP: {
        population: 1000000,
        gdp: 50000,
        },
        weather: {
        temp: 25,
        condition: 'Sunny',
        },
        exchangeRates: {
        base: 'USD',
        rate: 1.2,
        target: 'EUR',
        },
    };

    const handleSearch = () => {
        setCityData(mockCityData);
    };
   
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Travel Assistant</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 red-border">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 mb-5 red-border">
                        <WeatherForecast data={cityData?.weather} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 red-border mb-5">
                        <PopulationGDP data={cityData?.populationGDP} />
                    </div>
                    <div className="col-md-6 red-border mb-5">
                        <ExchangeRates data={cityData?.exchangeRates} />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Home;