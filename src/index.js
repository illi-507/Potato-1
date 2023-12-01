import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/main.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createRoot } from 'react-dom/client';

import { Auth0ProviderWithNavigate } from "./MyProvider"; 

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const callback = process.env.REACT_APP_AUTH0_CALLBACK_URL;
const onRedirectCallback = (appState) => {
  console.log("called 1",appState,appState.returnTo);
  if (appState && appState.returnTo) {
    console.log("called 3");
    window.location.pathname = appState.returnTo;
  }
};

const root = createRoot(document.getElementById('root'));

root.render(
   <Auth0ProviderWithNavigate >
    <App />
    </Auth0ProviderWithNavigate>

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
