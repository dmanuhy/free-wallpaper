import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { WallpaperProvider } from "./contexts/WallpaperContext.js"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css"

import './styles/index.scss'
import { UserProvider } from './contexts/UserContext.js';
import { TagProvider } from './contexts/TagContext.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <TagProvider>
        <WallpaperProvider>
          <App />
        </WallpaperProvider>
      </TagProvider>
    </UserProvider>
  </React.StrictMode>
);

