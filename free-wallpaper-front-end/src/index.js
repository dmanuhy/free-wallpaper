import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { WallpaperProvider } from "./contexts/WallpaperContext.js"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";

import './styles/index.scss'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WallpaperProvider>
      <App />
    </WallpaperProvider>
  </React.StrictMode>
);

