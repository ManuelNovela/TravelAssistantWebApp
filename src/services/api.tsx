import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import { ApiResponse } from './interfaces/ApiResponse';
import { WeatherData } from './interfaces/WeatherData';
import { WeatherForecast } from './interfaces/WeatherForecast';
import { ExchangeRateData } from './interfaces/ExchangeRateData';
import { PopulationData } from './interfaces/PopulationData';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const fetchExchangeRate = async (baseCurrency: string, targetCurrency: string): Promise<ExchangeRateData> => {
  const response = await api.get<ApiResponse<ExchangeRateData>>(`/exchangerate/${baseCurrency}/${targetCurrency}`);
  return response.data.data;
};

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

export const fetchPopulation = async (countryCode: string): Promise<PopulationData> => {
  const response = await api.get<ApiResponse<PopulationData[]>>(`/population/${countryCode}`);

  const validData = response.data.data.filter(entry => entry.value !== null);

  if (validData.length === 0) {
    throw new Error('No valid population data available');
    }
    const mostRecentData = validData.reduce((latest, entry) =>
    latest.year > entry.year ? latest : entry
  );

return mostRecentData;
};

export const fetchPopulationGDP = async (countryCode: string): Promise<PopulationData> => {
    const response = await api.get<ApiResponse<PopulationData[]>>(`/gdp/${countryCode}`);

    const validData = response.data.data.filter(entry => entry.value !== null);

    if (validData.length === 0) {
      throw new Error('No valid population data available');
      }
      const mostRecentData = validData.reduce((latest, entry) =>
      latest.year > entry.year ? latest : entry
    );

  return mostRecentData;
};

export const saveToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};


export const logout = async (): Promise<string> => {
  try {
    removeToken()
    return "successo";
  } catch (error) {
     throw new Error('Login failed: ' + error.message);
  }
};

export const login = async (email: string, password: string): Promise<string> => {
  try {
    const response = await api.post<{ status: string, message: string | null, data: { name: string, token: string } }>('/auth/login', {
      email,
      password,
    });


    console.log(response);
    
    const { status, message, data } = response.data;

    if (status !== 'SUCCESS') {

      throw new Error(message || 'Login failed');
    }

    const { token } = data;
    saveToken(token);
    return token;
  } catch (error) {
     throw new Error('Login failed: ' + error.response?.data?.message ?? error.message);
  }
};

export const isTokenValid = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime;
  } catch (e) {
    return false;
  }
};

export const register = async (username: string, email: string, password: string): Promise<string> => {
  try {
    const response = await api.post<{ status: string, message: string | null, data: { name: string, token: string } }>('/auth/register', {
      username,
      email,
      password,
    });

    const { status, message, data } = response.data;

    if (status !== 'SUCCESS') {
      throw new Error(message || 'Registration failed');
    }

    const { token } = data;
    saveToken(token);

    return token;
  } catch (error) {
    throw new Error('Registration failed: ' + error.response?.data?.message ?? error.message);
  }
};
