import React, { useContext } from 'react';
import PopulationImage from '../../assets/images/population.png';
import GdpImage from '../../assets/images/gdp.png';
import DataContext from '../../services/context/DataContext';


export function PopulationGDP(){

    const {contextPopulation, contextGDP, country} = useContext(DataContext);

    const formatPopulation = (value: number | null | undefined): string => {
        if (value == null || value === undefined) {
          return "-";
        }
      
        if (value >= 1000000000) {
          return (value / 1000000000).toFixed(2).replace(".", ",") + " bilhões";
        } else if (value >= 1000000) {
          return (value / 1000000).toFixed(2).replace(".", ",") + " milhões";
        } else if (value >= 1000) {
          return (value / 1000).toFixed(2).replace(".", ",") + " mil";
        }
      
        return value.toString().replace(".", ",");
    };


    return (
        <div className="card text-body" style={{ borderRadius: '35px' }}>
            <div className="card-body p-4">
                <div className="d-flex">
                    <h6 className="flex-grow-1">Dados Estatisticos do País: </h6>
                    <h6>{country}, Moçambique</h6>
                </div>

                <div className="row d-flex text-center justify-content-center mb-4">
                    
                    <div className="col-md-8 col-lg-6 col-xl-5 justify-content-center red-border mt-3 mb-2">
                        <div className="d-flex flex-column justify-content-center align-items-center mt-2 mb-2">
                            <img src={PopulationImage} width="100px" alt="Weather illustration" />
                        </div>
                        <h6 className="display-6 mb-0 font-weight-bold">{formatPopulation(contextPopulation?.value)?? "-"}</h6>
                        <span className="small" style={{ color: '#868B94' }}>População em {contextPopulation?.year}</span>
                    </div>

                    <div className="col-md-8 col-lg-6 col-xl-5 justify-content-center red-border mt-3 mb-2">
                        <div className="d-flex flex-column justify-content-center align-items-center mt-2 mb-2">
                            <img src={GdpImage} width="100px" alt="Weather illustration" />
                        </div>
                        <h6 className="display-6 mb-0 font-weight-bold">{formatPopulation(contextGDP?.value)?? "-"}</h6>
                        <span className="small" style={{ color: '#868B94' }}>PIB de {contextGDP?.year} em USD</span>
                    </div>

                </div>
            </div>
        </div>
    );
}
