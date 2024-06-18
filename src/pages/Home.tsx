
import React, { useState } from "react";
import {ExchangeRates} from '../components/ExchangeRates/ExchangeRates';
import SearchBar from '../components/SearchBar/SearchBar';
import PopulationGDP from '../components/PopulationGDP/PopulationGDP';
import WeatherForecast from '../components/WeatherForecast/WeatherForecast';
import { Box, Button, Flex, Grid, GridItem, border } from "@chakra-ui/react";

const Home = () => {
    const [cityData, setCityData] = useState<unknown>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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

                

                
                <div className="row" style={{ position: 'relative' }}>
                {!isLoggedIn && (
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(5px)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            zIndex: 1
                        }}>
                            <p style={{ marginBottom: '10px' }}>Faça login para visualizar essas informações</p>
                            <Button
                                colorScheme="blue"
                                onClick={() => setIsLoggedIn(true)}
                                mb={3}
                                w="150px"
                            >
                               Entrar
                            </Button>
                            <Button
                                colorScheme="teal"
                                onClick={() => setIsLoggedIn(true)}
                                w="150px"
                            >
                                Registar-se
                            </Button>
                        </div>
                    )}

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