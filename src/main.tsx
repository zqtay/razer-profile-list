import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './App.tsx'
import profileReducer from './reducers/profile';
import './assets/css/main.css'
import './assets/fonts/razerf5.css'
import './assets/fonts/roboto.css'

const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>,
  </React.StrictMode>,
)