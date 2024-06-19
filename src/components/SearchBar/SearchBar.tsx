import { Input } from '@chakra-ui/react';

interface SearchBarProps {
  city: string;
  setCity : (city: string) => void;
  handlerSearch: () => void;
}
const SearchBar: React.FC<SearchBarProps> = ( props: SearchBarProps) => {

  return (
    <div>
      <Input
        type="text"
        value={props.city}
        onChange={(e) => props.setCity(e.target.value)}
        placeholder="Enter city name"
        className="search-bar"
      />
      <button onClick={() => props.handlerSearch()}>Search</button>
    </div>
  );
};

export default SearchBar;
