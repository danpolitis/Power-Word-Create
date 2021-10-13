import React from 'react';
import ReactDOM from 'react-dom';
import { PageProvider } from './components/PageContext.jsx'

import App from './components/App.jsx';

ReactDOM.render(
  <PageProvider>
    <App />
  </PageProvider>,
  document.getElementById('root'));