
import React, { useContext, useEffect, useState } from "react";
import {ExchangeRates} from '../components/ExchangeRates/ExchangeRates';
import SearchBar from '../components/SearchBar/SearchBar';
import {PopulationGDP} from '../components/PopulationGDP/PopulationGDP';
import WeatherForecast from '../components/WeatherForecast/WeatherForecast';
import {Button} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetchWeather} from "../services/api";
import DataContext from "../services/context/DataContext";
import AuthModal from "../components/AuthModal/AuthModal";

const Home = () => {
    const {isLoggedIn, handleCityChange} = useContext(DataContext);
    const [city, setCity] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showLogin, setShowLogin] = useState<boolean>(false);

    const handlerShowLogin = (toLogin:boolean) =>{
        setShowLogin(toLogin);
        setShowModal(true);
    }
    
    const {data, isLoading, isError, refetch } = useQuery(['weather', city], () => fetchWeather(city), {
        enabled: false,
    });

    const handleSearch = async () => {
        await refetch();
        console.log(data);
        //setContextWeatherDate(data);
    };

    useEffect(() => {
        if (data) {
          //setContextWeatherDate(data);
          handleCityChange(data);
        }
      }, [data, isLoading, isError]);
      

   
    return (
        <div className="row">
            <div className="col-md-12">
                <AuthModal showLogin={showLogin} showModal={showModal} setShowModal={setShowModal}/>
                <div className="row">
                    <div className="col-md-12">
                     </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <SearchBar setCity={setCity} city={city} handlerSearch={handleSearch}  isLoading={isLoading} isError={isError}/>
                    </div>
                </div>


                <div className="row">
                    <div className="col-md-12 mb-5">
                        <WeatherForecast/>
                        
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
                                className="btn btn-secondary"
                                colorScheme="blue"
                                onClick={() => handlerShowLogin(true)}
                                mb={3}
                                w="150px"
                            >
                               Entrar
                            </Button>
                            <Button
                                className="btn btn-secondary"
                                colorScheme="teal"
                                onClick={() => handlerShowLogin(false)}
                                w="150px"
                            >
                                Registar-se
                            </Button>
                        </div>
                    )}

                    <div className="col-md-6 mb-5">
                        <PopulationGDP/>
                    </div>
                    <div className="col-md-6 mb-5">
                        <ExchangeRates/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;