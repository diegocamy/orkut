import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './containers/Home';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/dashboard' render={() => <h1>LOGEADO</h1>} />
          <Route
            exact
            path='/crearPerfil'
            render={() => <h1>CREAR PERFIL</h1>}
          />
          <Route path='*' component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
