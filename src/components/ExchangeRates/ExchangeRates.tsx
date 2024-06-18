import ExchangeImage from '../../assets/images/exchange.png';

interface ExchangeRatesProps {
    base: string;
    rate: number;
    target: string;
}

export function ExchangeRates(props :  ExchangeRatesProps ){
    return (    
      <div className="card text-body" style={{ borderRadius: '35px' }}>
      <div className="card-body p-4">
          <div className="d-flex">
              <h6 className="flex-grow-1">Cambio</h6>
              <h6>2024/06/18</h6>
          </div>
          <div className="d-flex flex-column text-center mt-5 mb-4">
              <h6 className="display-6 mb-0 font-weight-bold"> 64.02 </h6>
              <span className="small" style={{ color: '#868B94' }}>MZN to 1 USD</span>
          </div>
          <div className="d-flex align-items-center">
          <div className="flex-grow-1" style={{ fontSize: '1rem' }}>
              <div>
                  <i className="fas fa-wind fa-fw" style={{ color: '#868B94' }}>
                  </i> <span className="ms-1"> Metical</span></div>
              <div>
                  <i className="fas fa-tint fa-fw" style={{ color: '#868B94' }}></i> 
                  <span className="ms-1"> 1</span>
              </div>
              <div>
                  <i className="fas fa-sun fa-fw" style={{ color: '#868B94' }}></i> 
                  <span className="ms-1"> 1</span>
              </div>
          </div>
          <div>
              <img src={ExchangeImage} width="100px" alt="Exchange illustration" />
          </div>
          </div>
      </div>
  </div>
    );
}

