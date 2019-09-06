/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import WebFont from 'webfontloader';
import Root from './containers/Root';
import connect from '../mongo/index';
import User from '../mongo/models/usersModel';
import Receta from '../mongo/models/recetasModel';

const db = connect();

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

WebFont.load({
  google: {
    families: ['Roboto:300,500,700']
  }
});

render(
  <AppContainer>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </AppContainer>,
  document.getElementById('root')
);
