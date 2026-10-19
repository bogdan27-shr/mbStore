import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App.jsx';
import {store} from './app/store';
import './styles/index.scss';

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/mbStore">
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
