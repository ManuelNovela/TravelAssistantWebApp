import { Input } from '@chakra-ui/react';

interface SearchBarProps {
  city: string;
  setCity : (city: string) => void;
  handlerSearch: () => void;
}
const SearchBar: React.FC<SearchBarProps> = ( props: SearchBarProps) => {

  return (
    <div className="container mt-4 mb-5"  style={{minHeight: '150px' }}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-8">
          <div className="input-group ">
            <Input
              type="text"
              value={props.city}
              onChange={(e) => props.setCity(e.target.value)}
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
                style={{ borderTopRightRadius: '25px', borderBottomRightRadius: '25px', minHeight: '50px'  }}
              >
                  Pesquisar  
              </button>
            </div>
          </div>
          <span className='row d-flex text-center justify-content-center mt-2'> Para onde deseja ir?</span>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
