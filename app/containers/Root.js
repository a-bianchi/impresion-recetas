// @flow
import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Routes from '../Routes';
import MenuBar from '../components/MenuBar';

type Props = {};

export default class Root extends Component<Props> {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <MenuBar />
        <main>
          <div>
            <Container maxWidth="xl">
              <Routes />
            </Container>
          </div>
        </main>
      </React.Fragment>
    );
  }
}
