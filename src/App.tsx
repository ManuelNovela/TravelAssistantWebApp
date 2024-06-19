import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import Home from './pages/Home';
import GlobalStyles from './styles/GlobalStyles';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  
  return (
    <Router>
      <GlobalStyles />
      <div className="container-fluid page-content ">
        <Home/>
      </div>
    </Router>
  );
};

export default App;

