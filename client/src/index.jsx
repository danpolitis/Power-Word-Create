import React from 'react';
import ReactDOM from 'react-dom';
import { PageProvider } from './components/PageContext.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './components/App.jsx';

ReactDOM.render(
  <PageProvider>
    <App />
  </PageProvider>,
  document.getElementById('root'));