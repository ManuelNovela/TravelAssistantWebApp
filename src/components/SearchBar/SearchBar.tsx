import React, { useState } from 'react';
import { Input } from '@chakra-ui/react';
import { fetchCityAutocomplete } from '../../services/api';

interface SearchBarProps {
  city: string;
  setCity: (city: string) => void;
  handlerSearch: () => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = async (inputValue: string) => {
    if (inputValue.length > 2) {
      const predictions = await fetchCityAutocomplete(inputValue);
      setSuggestions(predictions);
    } else {
      setSuggestions([]);
    }
  };
  const handlerSugestion = async (suggestion: string) => {
    await props.setCity(suggestion);
    setSuggestions([]);
    props.handlerSearch();
  }

  console.log(props?.isLoading);

  return (
    <div className="container mt-4 mb-5" style={{ minHeight: '150px' }}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-8">
          <span className='row d-flex text-center justify-content-center mb-4'> Para onde deseja ir?</span>
          
          <div className="input-group">
            <Input
              type="text"
              value={props.city}
              onChange={(e) => {
                props.setCity(e.target.value);
                handleInputChange(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  props.handlerSearch();
                }
              }}
              placeholder="Maputo, Moçambique"
              className="form-control"
              style={{ borderTopLeftRadius: '25px', borderBottomLeftRadius: '25px', minHeight: '50px' }}
            />
            <div className="input-group-append">
              <button
                className="btn btn-secondary"
                onClick={() => props.handlerSearch()}
                style={{ borderTopRightRadius: '25px', borderBottomRightRadius: '25px', minHeight: '50px' }}
              >
                Pesquisar
              </button>
            </div>
          </div>
          
          {props.isLoading && (
            <div className="d-flex justify-content-center mt-3">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
            </div>
          )}

          <ul className="list-group">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="list-group-item list-group-item-action"
                onClick={() => handlerSugestion(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
