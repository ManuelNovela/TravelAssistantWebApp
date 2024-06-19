import React, { useContext, useState } from 'react';
import DataContext from '../../services/context/DataContext';
import { WeatherForecastDetails } from '../../services/interfaces/WeatherForecastDetails';
import WeatherForecastItem from './WeatherForecastItem';

const WeatherForecast = () => {

    const {contextWeatherDate, contextForecastDate} = useContext(DataContext);

    const [activeIndex, setActiveIndex] = useState(0);
    const handleButtonClick = (index: number) => {
      setActiveIndex(index);
    };
    return (
        <div>
            <div id="weatherCarousel" className="carousel">

                <div className="d-flex">
                    <h6 className="flex-grow-1">Temperatura</h6>
                </div>

                <div className="carousel-inner rounded-5">
                    {activeIndex === 0 && (
                        <div className="carousel-item active">
                            <div className="d-flex justify-content-between align-items-center px-5 gradient-custom" style={{ minHeight: '230px' }}>
                                <div>
                                    <h2 className="text-dark display-2"><strong>
                                        {contextWeatherDate?.currentTemperature ? (
                                            <>{Math.round(contextWeatherDate.currentTemperature)}</>
                                            ) : (
                                            <>-</>
                                            )} °C</strong></h2>
                                    <p className="text-dark mb-0">{contextWeatherDate?.city}, </p>
                                </div>
                                <div>
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu3.webp"
                                        width="150px"
                                        alt="Weather icon"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    {activeIndex === 1 && (
                    <div className="carousel-item active">
                    <div className="d-flex flex-wrap justify-content-around text-center align-items-center px-5 bg-body-tertiary" style={{ minHeight: '230px' }}>
                        
                    {contextForecastDate?.forecastToday?.map((detail: WeatherForecastDetails, index: number) => (
                        <WeatherForecastItem {...detail} key={index}/>
                    ))}

                    </div>
                </div>
                
                    )}
                    {activeIndex === 2 && (
                        <div className="carousel-item active">
                            <div className="d-flex flex-wrap justify-content-around text-center align-items-center px-5 bg-body-tertiary" style={{ minHeight: '230px' }}>
                                <div className="flex-column col-12 col-md-auto mb-3 item red-border">
                                    <p className="small"><strong>21°C</strong></p>
                                    <i className="fas fa-sun fa-2x mb-3" style={{ color: '#ddd' }}></i>
                                    <p className="mb-0"><strong>Segunda</strong></p>
                                </div>
                                <div className="flex-column col-12 col-md-auto mb-3 item">
                                    <p className="small"><strong>20°C</strong></p>
                                    <i className="fas fa-sun fa-2x mb-3" style={{ color: '#ddd' }}></i>
                                    <p className="mb-0"><strong>Terça</strong></p>
                                </div>
                                <div className="flex-column col-12 col-md-auto mb-3 item">
                                    <p className="small"><strong>16°C</strong></p>
                                    <i className="fas fa-cloud fa-2x mb-3" style={{ color: '#ddd' }}></i>
                                    <p className="mb-0"><strong>Quarta</strong></p>
                                </div>
                                <div className="flex-column col-12 col-md-auto mb-3 item">
                                    <p className="small"><strong>17°C</strong></p>
                                    <i className="fas fa-cloud fa-2x mb-3" style={{ color: '#ddd' }}></i>
                                    <p className="mb-0"><strong>Thu</strong></p>
                                </div>
                                <div className="flex-column col-12 col-md-auto mb-3 item">
                                    <p className="small"><strong>18°C</strong></p>
                                    <i className="fas fa-cloud-showers-heavy fa-2x mb-3" style={{ color: '#ddd' }}></i>
                                    <p className="mb-0"><strong>Fri</strong></p>
                                </div>
                                <div className="flex-column col-12 col-md-auto mb-3 item">
                                    <p className="small"><strong>18°C</strong></p>
                                    <i className="fas fa-cloud-showers-heavy fa-2x mb-3" style={{ color: '#ddd' }}></i>
                                    <p className="mb-0"><strong>Sat</strong></p>
                                </div>
                                <div className="flex-column col-12 col-md-auto mb-3 item">
                                    <p className="small"><strong>18°C</strong></p>
                                    <i className="fas fa-cloud-showers-heavy fa-2x mb-3" style={{ color: '#ddd' }}></i>
                                    <p className="mb-0"><strong>Sun</strong></p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="weather-indicators d-flex flex-column flex-md-row justify-content-center align-items-center">
                    <span
                        className={`indicator-text m-2 ${activeIndex === 0 ? "active" : ""}`}
                        onClick={() => handleButtonClick(0)}
                        aria-current={activeIndex === 0 ? "true" : undefined}
                        aria-label="Slide 1"
                    >
                        Temperatura Actual
                    </span>

                    <span
                        className={`indicator-text m-2 ${activeIndex === 1 ? "active" : ""}`}
                        onClick={() => handleButtonClick(1)}
                        aria-current={activeIndex === 1 ? "true" : undefined}
                        aria-label="Slide 2"
                    >
                        Previsao do dia
                    </span>

                    <span
                        className={`indicator-text m-2 ${activeIndex === 2 ? "active" : ""}`}
                        onClick={() => handleButtonClick(2)}
                        aria-current={activeIndex === 2 ? "true" : undefined}
                        aria-label="Slide 3"
                    >
                        Previsao da semana
                    </span>
                </div>
            </div>
        </div>
    );
};

export default WeatherForecast;