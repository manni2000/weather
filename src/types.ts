export interface WeatherData {
    current: {
      name: string;
      main: {
        temp: number;
        feels_like: number;
        humidity: number;
        pressure: number;
      };
      weather: {
        description: string;
        icon: string;
      }[];
      wind: {
        speed: number;
      };
    };
    forecast: {
      list: {
        dt: number;
        main: {
          temp: number;
        };
        weather: {
          description: string;
          icon: string;
        }[];
      }[];
    };
  }
  
  export interface FavoriteCity {
    id: number;
    name: string;
  }