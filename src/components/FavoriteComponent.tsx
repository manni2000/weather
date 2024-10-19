import React, { useContext } from 'react';
import { FavoriteCity } from '../types';
import { Trash2, MapPin } from 'lucide-react';
import { ThemeContext } from '../contexts/ThemeContext';

interface FavoriteComponentProps {
  favoriteCities: FavoriteCity[];
  onRemoveFavorite: (id: number) => void;
  onSelectFavorite: (city: string) => void;
}

const FavoriteComponent: React.FC<FavoriteComponentProps> = ({
  favoriteCities,
  onRemoveFavorite,
  onSelectFavorite,
}) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`rounded-lg shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Favorite Cities</h2>
      {favoriteCities.length === 0 ? (
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>No favorite cities added yet.</p>
      ) : (
        <ul>
          {favoriteCities.map((city) => (
            <li key={city.id} className={`flex items-center justify-between py-2 border-b last:border-b-0 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <button
                onClick={() => onSelectFavorite(city.name)}
                className={`flex items-center hover:text-blue-600 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`}
              >
                <MapPin size={18} className="mr-2" />
                {city.name}
              </button>
              <button
                onClick={() => onRemoveFavorite(city.id)}
                className={`hover:text-red-600 ${isDarkMode ? 'text-red-400' : 'text-red-500'}`}
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoriteComponent;