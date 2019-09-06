import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import ConfigPage from './containers/ConfigPage';
import CargarPage from './containers/CargarPage';
import UserContextProvider from './context/UserContext';
import RecetasContextProvider from './context/RecetasContext';

export default () => (
  <App>
    <UserContextProvider>
      <RecetasContextProvider>
        <Switch>
          <Route path={routes.CARGAR} component={CargarPage} />
          <Route path={routes.CONFIG} component={ConfigPage} />
          <Route path={routes.HOME} component={HomePage} />
        </Switch>
      </RecetasContextProvider>
    </UserContextProvider>
  </App>
);
