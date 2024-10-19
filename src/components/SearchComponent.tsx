import React, { useState, useContext } from 'react';
import { Search } from 'lucide-react';
import { ThemeContext } from '../contexts/ThemeContext';

interface SearchComponentProps {
  onSearch: (city: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const { isDarkMode } = useContext(ThemeContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex items-center">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className={`flex-grow px-4 py-2 rounded-l-lg border-2 border-blue-500 focus:outline-none focus:border-blue-600 ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-300"
        >
          <Search size={24} />
        </button>
      </div>
    </form>
  );
};

export default SearchComponent;