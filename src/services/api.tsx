import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import { ApiResponse } from './interfaces/ApiResponse';
import { WeatherData } from './interfaces/WeatherData';
import { WeatherForecast } from './interfaces/WeatherForecast';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

export const fetchWeather = async (city: string): Promise<WeatherData> => {
  const response = await api.get<ApiResponse<WeatherData>>(`/weather/current/${city}`);
  return response.data.data;
};

export const fetchWeatherForecast = async (cityId: number): Promise<WeatherForecast> => {
  const response = await api.get<ApiResponse<WeatherForecast>>(`/weather/forecast/${cityId}`);
  return response.data.data;
};

export const useWeatherQuery = (city: string): UseQueryResult<WeatherData, Error> => {
  return useQuery(['weather', city], () => fetchWeather(city));
};

export const useWeatherForecastQuery = (cityId: number): UseQueryResult<WeatherForecast, Error> => {
  return useQuery(['weatherForecast', cityId], () => fetchWeatherForecast(cityId), {enabled: !!cityId});
};
