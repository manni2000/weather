import axios from 'axios';
import { FavoriteCity } from '../types';

const API_URL = 'http://localhost:3001/favorites';

export const getFavoriteCities = async (): Promise<FavoriteCity[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching favorite cities:', error);
    throw new Error('Failed to fetch favorite cities. Please ensure the JSON server is running.');
  }
};

export const addFavoriteCity = async (cityName: string): Promise<FavoriteCity> => {
  try {
    const response = await axios.post(API_URL, { name: cityName });
    return response.data;
  } catch (error) {
    console.error('Error adding favorite city:', error);
    throw new Error('Failed to add favorite city. Please try again.');
  }
};

export const removeFavoriteCity = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error removing favorite city:', error);
    throw new Error('Failed to remove favorite city. Please try again.');
  }
};