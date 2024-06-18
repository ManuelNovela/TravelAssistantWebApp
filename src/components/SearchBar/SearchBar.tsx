import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from '@chakra-ui/react';

const SearchContainer = styled.div`
  margin: 2rem 0;
  text-align: center;
`;

interface SearchBarProps {
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [city, setCity] = useState<string>('');

  const handleSearch = () => {
    // Chama a função de pesquisa passada como propriedade
    onSearch();
  };

  return (
    <SearchContainer>
      <Input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="search-bar"
      />
      <button onClick={handleSearch}>Search</button>
    </SearchContainer>
  );
};

export default SearchBar;
