import { Input } from '@chakra-ui/react';

interface SearchBarProps {
  city: string;
  setCity : (city: string) => void;
  handlerSearch: () => void;
}
const SearchBar: React.FC<SearchBarProps> = ( props: SearchBarProps) => {

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="input-group mb-3">
            <Input
              type="text"
              value={props.city}
              onChange={(e) => props.setCity(e.target.value)}
              placeholder="Enter city name"
              className="form-control"
              style={{ borderTopLeftRadius: '25px', borderBottomLeftRadius: '25px' }}
            />
            <div className="input-group-append">
              <button
                className="btn btn-secondary"
                onClick={() => props.handlerSearch()}
                style={{ borderTopRightRadius: '25px', borderBottomRightRadius: '25px' }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
