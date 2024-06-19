import { UseQueryResult, useQuery } from "react-query";
import { WeatherData } from "../interfaces/WeatherData";
import axios from "axios";
import { ApiResponse } from "../interfaces/ApiResponse";


const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    
});
  
export const fetchWeather = async (city: string): Promise<ApiResponse> => {
  const response = await api.get<ApiResponse>(`/weather/current/${city}`);
  return response.data
};

export const useWeatherQuery = (city: string): UseQueryResult<WeatherData, Error> => {
    return useQuery(['weather', city], () => fetchWeather(city));
  };