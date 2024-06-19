import React from 'react';

const weatherIcons: { [key: string]: string } = {
  'clear sky': '☀️',
  'few clouds': '🌤️',
  'scattered clouds': '🌥️',
  'broken clouds': '☁️',
  'shower rain': '🌧️',
  'rain': '🌦️',
  'thunderstorm': '⛈️',
  'snow': '❄️',
  'mist': '🌫️',
  'overcast clouds': '☁️',
  'light rain': '🌦️',
  'heavy rain': '🌧️',
  'storm': '⛈️',
  'fog': '🌫️',
};

interface WeatherIconProps {
  description: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ description }) => {
  const icon = description
  ? weatherIcons[description.toLowerCase()] || '🌤️'
  : '🌦️';

  return (
    <div>
      <p>{description}</p>
      <p style={{ fontSize: '2rem' }}>{icon}</p>
    </div>
  );
};

export default WeatherIcon;
