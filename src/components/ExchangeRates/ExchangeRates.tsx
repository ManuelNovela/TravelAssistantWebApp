import React, { useContext, useState } from 'react';
import ExchangeImage from '../../assets/images/exchange.png';
import DataContext from '../../services/context/DataContext';

export function ExchangeRates() {
    const { contextExchangeDate } = useContext(DataContext);

    const [amountBuy, setAmountBuy] = useState(0);
    const [amountBuyResult, setAmountBuyResult] = useState(0);

    const [amountSell, setAmountSell] = useState(0);
    const [amountSellResult, setAmountSellResult] = useState(0);

    const handleBuyChange = (e) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setAmountBuy(value);
            setAmountBuyResult((value * contextExchangeDate.rateAmountBuy).toFixed(2));
        }
    };

    const handleSellChange = (e) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setAmountSell(value);
            setAmountSellResult((value * contextExchangeDate.rateAmountSell).toFixed(2));
        }
    };

    return (
        <div className="card text-body" style={{ borderRadius: '35px' }}>
            <div className="card-body p-4">
                <div className="d-flex">
                    <h6 className="flex-grow-1">Câmbio</h6>
                    <h6>{contextExchangeDate?.date}</h6>
                </div>

                <div className="row d-flex text-center justify-content-center mb-3 mt-3">
                    <div className="col-md-8 col-lg-6 col-xl-5 justify-content-center mt-3 mb-2">
                        <h6 className="display-4 mb-0 font-weight-bold"> {contextExchangeDate?.rateAmountBuy.toFixed(2) ?? "-"} </h6>
                        <span className="small" style={{ color: '#868B94' }}>de {contextExchangeDate?.baseCurrency ?? "-"} para {contextExchangeDate?.targetCurrency ?? "-"}</span>
                    </div>

                    <div className="col-md-8 col-lg-6 col-xl-5 justify-content-center mt-3 mb-2">
                        <h6 className="display-4 mb-0 font-weight-bold"> {contextExchangeDate?.rateAmountSell.toFixed(2) ?? "-"} </h6>
                        <span className="small" style={{ color: '#868B94' }}>de {contextExchangeDate?.targetCurrency ?? "-"} para {contextExchangeDate?.baseCurrency ?? "-"}</span>
                    </div>
                </div>

                <div className="d-flex align-items-center">
                    <div className="flex-grow-1" style={{ fontSize: '1rem' }}>
                        <h6 className="flex-grow-1">Simulador</h6>
                        <div className='mt-2'>
                            <div> 
                                <input 
                                    style={{marginRight: '10px',
                                        width: '60px',
                                        textAlign: 'center',
                                        borderRadius: '5px',
                                        border: '1px solid #ccc'}}
                                    type='number' 
                                    min={0} 
                                    value={amountBuy} 
                                    onChange={handleBuyChange} 
                                /> 
                                {contextExchangeDate?.baseCurrency ?? "-"} 
                                {" = "}
                                {amountBuyResult} {contextExchangeDate?.targetCurrency ?? "-"}
                            </div>
                        </div>
                        <div className='mt-2'>
                            <div> 
                                <input 
                                    style={{marginRight: '10px',
                                        width: '60px',
                                        textAlign: 'center',
                                        borderRadius: '5px',
                                        border: '1px solid #ccc' }}
                                    type='number' 
                                    min={0} 
                                    value={amountSell} 
                                    onChange={handleSellChange} 
                                />
                                {contextExchangeDate?.targetCurrency ?? "-"} 
                                {" = "}
                                {amountSellResult} {contextExchangeDate?.baseCurrency ?? "-"}
                            </div>
                        </div>
                        <div className='mt-2'>
                            <span className="small" style={{ color: '#868B94' }}>{contextExchangeDate?.targetCurrency} X * {contextExchangeDate?.rateAmountSell.toFixed(2) ?? "rate"}  = Y {contextExchangeDate?.baseCurrency ?? "-"} </span>
                        </div>
                    </div>
                    <div>
                        <img src={ExchangeImage} width="90px" alt="Exchange illustration" />
                    </div>
                </div>
            </div>
        </div>
    );
}
