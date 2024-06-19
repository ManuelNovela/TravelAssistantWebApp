import React, { useContext } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import Home from './pages/Home';
import GlobalStyles from './styles/GlobalStyles';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataContext from './services/context/DataContext';
import { logout } from './services/api';

const App = () => {
  
  const { isLoggedIn, setIsLoggedIn } = useContext(DataContext);

  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  return (
    <Router>
      <GlobalStyles />
      <div className="col-md-12 mb-5 logout">
        <div className="d-flex justify-content-end align-items-center">
          {isLoggedIn && (<button type="button" className="btn btn-secundary" onClick={handleLogout}>Sair</button>)}
        </div>
      </div>
            
      <div className="container-fluid page-content ">
        <Home/>
      </div>
    </Router>
  );
};

export default App;

