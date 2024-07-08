import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import useScrollToTop from "./Components/hook/useScrollToTop";
 

ReactDOM.createRoot(document.getElementById("root")).render(
 
  <React.StrictMode>

    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
