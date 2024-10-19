import { useState, useEffect, useContext } from 'react';
import SearchComponent from './components/SearchComponent';
import WeatherDisplay from './components/WeatherDisplay';
import FavoriteComponent from './components/FavoriteComponent';
import { Sun, Moon } from 'lucide-react';
import { WeatherData, FavoriteCity } from './types';
import { fetchWeatherData, fetchForecastData } from './api/weatherApi';
import { getFavoriteCities, addFavoriteCity, removeFavoriteCity } from './api/favoritesApi';
import { ThemeContext, ThemeProvider } from './contexts/ThemeContext';

function AppContent() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [favoriteCities, setFavoriteCities] = useState<FavoriteCity[]>([]);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [error, setError] = useState<string | null>(null);
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const lastSearchedCity = localStorage.getItem('lastSearchedCity');
    if (lastSearchedCity) {
      handleSearch(lastSearchedCity);
    }
    loadFavoriteCities();
  }, []);

  const loadFavoriteCities = async () => {
    try {
      const cities = await getFavoriteCities();
      setFavoriteCities(cities);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred while loading favorite cities.');
      }
    }
  };

  const handleSearch = async (city: string) => {
    try {
      setError(null);
      const currentWeather = await fetchWeatherData(city, unit);
      const forecast = await fetchForecastData(city, unit);
      setWeatherData({ current: currentWeather, forecast });
      localStorage.setItem('lastSearchedCity', city);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred while fetching weather data.');
      }
    }
  };

  const handleAddFavorite = async (city: string) => {
    try {
      await addFavoriteCity(city);
      await loadFavoriteCities();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred while adding a favorite city.');
      }
    }
  };

  const handleRemoveFavorite = async (id: number) => {
    try {
      await removeFavoriteCity(id);
      await loadFavoriteCities();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred while removing a favorite city.');
      }
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
    if (weatherData) {
      handleSearch(weatherData.current.name);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <header className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold text-center">Weather Dashboard</h1>
          <div className="flex items-center space-x-4 mt-4">
            <button onClick={toggleUnit} className="px-3 py-1 rounded bg-blue-500 text-white">
              {unit === 'metric' ? '°C' : '°F'}
            </button>
            <button onClick={toggleDarkMode} className="text-2xl">
              {isDarkMode ? <Sun /> : <Moon />}
            </button>
          </div>
        </header>
        <SearchComponent onSearch={handleSearch} />
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {weatherData && (
          <WeatherDisplay
            weatherData={weatherData}
            unit={unit}
            onAddFavorite={() => handleAddFavorite(weatherData.current.name)}
          />
        )}
        <FavoriteComponent
          favoriteCities={favoriteCities}
          onRemoveFavorite={handleRemoveFavorite}
          onSelectFavorite={handleSearch}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;