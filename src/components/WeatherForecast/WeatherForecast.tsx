import React, { useContext, useEffect, useState } from 'react';
import DataContext from '../../services/context/DataContext';
import { WeatherForecastDetails } from '../../services/interfaces/WeatherForecastDetails';
import WeatherForecastItem from './WeatherForecastItem';
import WeatherForecastWeakItem from './WeatherForecastWeakItem';

const WeatherForecast = () => {

    const {contextWeatherDate, contextForecastDate, countryName} = useContext(DataContext);

    const [activeIndex, setActiveIndex] = useState(0);
    const handleButtonClick = (index: number) => {
      setActiveIndex(index);
    };

    const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>('');
    useEffect(() => {
        const fetchImage = async () => {
          const apiKey = '44462409-d3a04b0fdc12a2b59ce324aae';
          const country = contextWeatherDate?.city ?? 'weather';
          const url = `https://pixabay.com/api/?key=${apiKey}&q=${country}&image_type=photo`;
          
          try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.hits.length > 0) {
              const imageUrl = data.hits[0].largeImageURL;
              setBackgroundImageUrl(imageUrl);
            } else {
              console.error('Nenhuma imagem encontrada.');
            }
          } catch (error) {
            console.error('Erro ao buscar imagem:', error);
          }
        };
    
        fetchImage();
      }, [contextWeatherDate?.city]);

      const iconUrl = contextWeatherDate ? `https://openweathermap.org/img/wn/${contextWeatherDate.icon}@4x.png` : 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu3.webp';

    return (
        <div>
            <div id="weatherCarousel" className="carousel">

                

                <div className="carousel-inner rounded-5">
                    {activeIndex === 0 && (
                        <div className="carousel-item active">
                        <div
                          className="d-flex justify-content-between align-items-center px-5 gradient-custom"
                          style={{
                            minHeight: '250px',
                            position: 'relative',
                            overflow: 'hidden'
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              backgroundImage: `url(${backgroundImageUrl})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              opacity: 0.7,
                              zIndex: -1
                            }}
                          ></div>
                          <div>
                            <h2 className="text-dark display-2"><strong>
                              {contextWeatherDate?.currentTemperature ? (
                                <>{Math.round(contextWeatherDate?.currentTemperature)+" °C"}</>
                              ) : (
                                <>-</>
                              )} </strong></h2>
                            <p className="text-dark mb-0">{contextWeatherDate?.city+ contextWeatherDate?.city? ", " : ""} {countryName}</p>
                            <p className="text-dark mb-0">{contextWeatherDate?.description}</p>
                          </div>
                          <div>
                            <img src={iconUrl} width="150px" alt="Weather icon"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {activeIndex === 1 && (
                    <div className="carousel-item active">
                    <div className="d-flex flex-wrap justify-content-around text-center align-items-center px-5 bg-body-tertiary" style={{ minHeight: '250px' }}>
                        
                    {contextForecastDate?.forecastToday?.map((detail: WeatherForecastDetails, index: number) => (
                        <WeatherForecastItem {...detail} key={index}/>
                    ))}

                    </div>
                </div>
                
                    )}
                    {activeIndex === 2 && (
                        <div className="carousel-item active">
                            <div className="d-flex flex-wrap justify-content-around text-center align-items-center px-5 bg-body-tertiary" style={{ minHeight: '250px' }}>
                                
                                {contextForecastDate?.forecastWeek?.map((detail: WeatherForecastDetails, index: number) => (
                                    <WeatherForecastWeakItem {...detail} key={index}/>
                                ))}

                            </div>
                        </div>
                    )}
                </div>

                <div className="weather-indicators d-flex flex-column flex-md-row justify-content-center align-items-center mt-4">
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