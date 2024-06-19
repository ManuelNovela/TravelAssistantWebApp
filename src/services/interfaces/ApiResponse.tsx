import { WeatherData } from "./WeatherData";

export interface ApiResponse {
    status: string;
    message: string;
    data: WeatherData;
  }