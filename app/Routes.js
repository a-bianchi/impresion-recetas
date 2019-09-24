import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import ConfigPage from './containers/ConfigPage';
import CargarPage from './containers/CargarPage';
import UserContextProvider from './context/UserContext';
import RecetasContextProvider from './context/RecetasContext';
import AlertContextProvider from './context/AlertContext';
import ModalContextProvider from './context/ModalContext';
import AlertMessage from './components/AlertMessage';

export default () => (
  <App>
    <UserContextProvider>
      <RecetasContextProvider>
        <AlertContextProvider>
          <ModalContextProvider>
            <AlertMessage />
            <Switch>
              <Route path={routes.CARGAR} component={CargarPage} />
              <Route path={routes.CONFIG} component={ConfigPage} />
              <Route path={routes.HOME} component={HomePage} />
            </Switch>
          </ModalContextProvider>
        </AlertContextProvider>
      </RecetasContextProvider>
    </UserContextProvider>
  </App>
);
