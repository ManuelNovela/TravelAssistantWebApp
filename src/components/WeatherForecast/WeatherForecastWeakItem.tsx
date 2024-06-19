import React from 'react';
import { WeatherForecastDetails } from '../../services/interfaces/WeatherForecastDetails';
import WeatherIcon from './WeatherIcon';

const WeatherForecastWeakItem = (props: WeatherForecastDetails) => {


  const formattedDateTime = props.dateTime ? new Date(props.dateTime) : null;
  

  function getDayOfWeek(dateTime) {
    const date = new Date(dateTime);
    const options = { weekday: 'long' };
    return date.toLocaleDateString('pt-BR', options);
  }

  return (
    <div className="flex-column col-12 col-md-auto mb-3  item">
      <p className="small mt-2"><strong>{Math.round(props.temperature) ?? "-"} °C</strong></p>
      <span className="fas fa-sun fa-2x mb-3">
        <WeatherIcon  description={props.description} />
      </span>             
      <p className="mb-0 text-muted" style={{ fontSize: '.65rem' }}>{props.description}</p>        
      <p className="mb-0"><strong>{formattedDateTime ? getDayOfWeek(formattedDateTime) : "-"}</strong></p>
 </div>
  );
};

export default WeatherForecastWeakItem;
