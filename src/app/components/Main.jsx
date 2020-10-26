import React from 'react';
import { Container } from 'semantic-ui-react'
import { Provider } from 'react-redux';
import { store } from '../store';


import { FinancePage } from './FinancePage';

export const Main = () => (
  <Provider store={store}>
    <Container>
      <FinancePage />
    </Container>
  </Provider>
)
