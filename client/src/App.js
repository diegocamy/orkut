import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Dashboard from './containers/Dashboard';
import Buscar from './containers/Buscar';
import CrearPerfil from './containers/CrearPerfil';
import Perfil from './containers/Perfil';
import Scrapbook from './containers/Scrapbook';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/buscar' component={Buscar} />
          <Route exact path='/crearPerfil' component={CrearPerfil} />
          <Route exact path='/perfil/:id_perfil' component={Perfil} />
          <Route exact path='/scrapbook/:id_perfil' component={Scrapbook} />
          <Route path='*' component={Home} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
