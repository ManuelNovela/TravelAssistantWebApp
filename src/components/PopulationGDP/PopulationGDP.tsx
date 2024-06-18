import React from 'react';
import PopulationImage from '../../assets/images/population.png';
import GdpImage from '../../assets/images/gdp.png';



interface PopulationGDPProps {
  data?: {
    population: number;
    gdp: number;
  };
}

const PopulationGDP: React.FC<PopulationGDPProps> = ({ data }) => {
 
    return (
        <div className="card text-body" style={{ borderRadius: '35px' }}>
            <div className="card-body p-4">
                <div className="d-flex">
                    <h6 className="flex-grow-1">Dados Estatisticos do País: </h6>
                    <h6>Moçambique</h6>
                </div>

                <div className="row d-flex text-center justify-content-center mb-4">
                    
                    <div className="col-md-8 col-lg-6 col-xl-5 justify-content-center red-border mt-3 mb-2">
                        <div className="d-flex flex-column justify-content-center align-items-center mt-2 mb-2">
                            <img src={PopulationImage} width="100px" alt="Weather illustration" />
                        </div>
                        <h6 className="display-6 mb-0 font-weight-bold">32,97 milhões</h6>
                        <span className="small" style={{ color: '#868B94' }}>População em 2022</span>
                    </div>

                    <div className="col-md-8 col-lg-6 col-xl-5 justify-content-center red-border mt-3 mb-2">
                        <div className="d-flex flex-column justify-content-center align-items-center mt-2 mb-2">
                            <img src={GdpImage} width="100px" alt="Weather illustration" />
                        </div>
                        <h6 className="display-6 mb-0 font-weight-bold">558,30 USD</h6>
                        <span className="small" style={{ color: '#868B94' }}>PIB per Capita em 2022</span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PopulationGDP;
