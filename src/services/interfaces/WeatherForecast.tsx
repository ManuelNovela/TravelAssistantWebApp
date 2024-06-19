export interface WeatherForecast{
    city: string;
    forecast: {
      dateTime: string;
      temperature: number;
      description: string;
    }[];
}
  