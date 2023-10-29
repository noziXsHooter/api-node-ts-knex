export interface IClimaTempoData {
    date: string;
    date_br: string;
    humidity: { humidity: number };
    pressure: { pressure: number };
    rain: { precipitation: number };
    wind: {
      velocity: number;
      direction: string;
      directiondegrees: number;
      gust: number;
    };
    temperature: { temperature: number };
  }
  
export interface IWeatherLocaleCityData {
    id: number;
    name: string;
    state: string;
    country: string;
    data: {
        temperature: number;
        wind_direction: string;
        wind_velocity: number;
        humidity: number;
        condition: string;
        pressure: number;
        icon: string;
        sensation: number;
        date: string;
    };
}