import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import {store} from './redux/store'
import { retriveToken } from "./redux/features/authSlice.ts";

import App from "./App.tsx";
import "./index.css";

store.dispatch(retriveToken())

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
