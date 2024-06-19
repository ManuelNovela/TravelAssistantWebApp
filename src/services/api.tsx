import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1', // Ajuste conforme necessário
});

export interface WeatherData {
  cityId: number;
  city: string;
  currentTemperature: number;
  currentDescription: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data: WeatherData;
}

export const fetchWeather = async (city: string): Promise<WeatherData> => {
  const response = await api.get<ApiResponse>(`/weather/current/${city}`);
  return response.data.data;
};

export const useWeatherQuery = (city: string): UseQueryResult<WeatherData, Error> => {
  return useQuery(['weather', city], () => fetchWeather(city));
};
