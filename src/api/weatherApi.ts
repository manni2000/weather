import axios from 'axios';

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (city: string, unit: 'metric' | 'imperial') => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        units: unit,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data. Please check the city name and try again.');
  }
};

export const fetchForecastData = async (city: string, unit: 'metric' | 'imperial') => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        units: unit,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw new Error('Failed to fetch forecast data. Please check the city name and try again.');
  }
};