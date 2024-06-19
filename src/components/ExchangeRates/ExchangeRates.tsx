import { useContext } from 'react';
import ExchangeImage from '../../assets/images/exchange.png';
import DataContext from '../../services/context/DataContext';


export function ExchangeRates(){

    const {contextExchangeDate, baseCurrency, countryCurrency} = useContext(DataContext);
    
    return (    
      <div className="card text-body" style={{ borderRadius: '35px' }}>
      <div className="card-body p-4">
          <div className="d-flex">
              <h6 className="flex-grow-1">Cambio</h6>
              <h6>{contextExchangeDate?.date}</h6>
          </div> 

            <div className="row d-flex text-center justify-content-center mb-4">
                    
                <div className="col-md-8 col-lg-6 col-xl-5 justify-content-center mt-3 mb-2">
                    <h6 className="display-6 mb-0 font-weight-bold"> {contextExchangeDate?.rateAmountBuy.toFixed(2) ?? "-"} </h6>
                    <span className="small" style={{ color: '#868B94' }}>de {contextExchangeDate?.baseCurrency ?? "-"} para {contextExchangeDate?.targetCurrency ?? "-"}</span>
                </div>

                <div className="col-md-8 col-lg-6 col-xl-5 justify-content-center mt-3 mb-2">
                    <h6 className="display-6 mb-0 font-weight-bold"> {contextExchangeDate?.rateAmountSell.toFixed(2) ?? "-"} </h6>
                    <span className="small" style={{ color: '#868B94' }}>de {contextExchangeDate?.targetCurrency ?? "-"} para {contextExchangeDate?.baseCurrency ?? "-"}</span>
                </div>
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

