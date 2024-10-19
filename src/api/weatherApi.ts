import axios from 'axios';

const API_KEY = 'bd1147142f21df8e76b43070a9733bce'; // Replace with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (city: string, unit: 'metric' | 'imperial') => {
  try {
    // Validate unit type
    if (unit !== 'metric' && unit !== 'imperial') {
      throw new Error('Invalid unit type. Use "metric" or "imperial".');
    }

    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        units: unit,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'weather data');
  }
};

export const fetchForecastData = async (city: string, unit: 'metric' | 'imperial') => {
  try {
    // Validate unit type
    if (unit !== 'metric' && unit !== 'imperial') {
      throw new Error('Invalid unit type. Use "metric" or "imperial".');
    }

    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        units: unit,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'forecast data');
  }
};

// Custom error handler function
function handleAxiosError(error: any, dataType: string) {
  if (error.response) {
    // Server responded with a status code outside the 2xx range
    console.error(`Error fetching ${dataType}. Status Code:`, error.response.status);
    console.error('Error details:', error.response.data);

    if (error.response.status === 404) {
      throw new Error(`City not found. Please check the city name and try again.`);
    } else if (error.response.status === 401) {
      throw new Error('Invalid API key. Please check your API key.');
    } else {
      throw new Error(`Failed to fetch ${dataType}. Please try again later.`);
    }
  } else if (error.request) {
    // Request was made but no response was received
    console.error('No response received:', error.request);
    throw new Error('Network error. Please check your connection and try again.');
  } else {
    // Something else happened while setting up the request
    console.error('Error setting up the request:', error.message);
    throw new Error(`An unexpected error occurred while fetching ${dataType}.`);
  }
}
