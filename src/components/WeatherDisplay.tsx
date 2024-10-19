import React, { useContext } from 'react';
import { WeatherData } from '../types';
import { Heart } from 'lucide-react';
import { ThemeContext } from '../contexts/ThemeContext';

interface WeatherDisplayProps {
  weatherData: WeatherData;
  unit: 'metric' | 'imperial';
  onAddFavorite: () => void;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData, unit, onAddFavorite }) => {
  const { current, forecast } = weatherData;
  const { isDarkMode } = useContext(ThemeContext);

  const getWeatherIcon = (iconCode: string) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(date);
  };

  return (
    <div className={`rounded-lg shadow-lg p-6 mb-8 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{current.name}</h2>
        <button onClick={onAddFavorite} className={`${isDarkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-600'}`}>
          <Heart size={24} />
        </button>
      </div>
      <div className="flex items-center mb-4">
        <img src={getWeatherIcon(current.weather[0].icon)} alt={current.weather[0].description} className="w-16 h-16" />
        <div className="ml-4">
          <p className="text-4xl font-bold">{Math.round(current.main.temp)}°{unit === 'metric' ? 'C' : 'F'}</p>
          <p className="text-xl">{current.weather[0].description}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p>Humidity: {current.main.humidity}%</p>
          <p>Wind: {current.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
        </div>
        <div>
          <p>Feels like: {Math.round(current.main.feels_like)}°{unit === 'metric' ? 'C' : 'F'}</p>
          <p>Pressure: {current.main.pressure} hPa</p>
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">5-Day Forecast</h3>
      <div className="grid grid-cols-5 gap-2">
        {forecast.list.filter((item, index) => index % 8 === 0).map((item, index) => (
          <div key={index} className="text-center">
            <p className="font-semibold">{formatDate(new Date(item.dt * 1000))}</p>
            <img src={getWeatherIcon(item.weather[0].icon)} alt={item.weather[0].description} className="w-10 h-10 mx-auto" />
            <p>{Math.round(item.main.temp)}°{unit === 'metric' ? 'C' : 'F'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDisplay;