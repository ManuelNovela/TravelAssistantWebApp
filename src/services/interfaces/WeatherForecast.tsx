import { WeatherForecastDetails } from "./WeatherForecastDetails";

export interface WeatherForecast{
    city: string;
    forecastToday: WeatherForecastDetails[];
    forecastWeek: WeatherForecastDetails[];
}
  