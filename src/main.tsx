import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import theme from "./theme";
import {ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import {BrowserRouter} from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
              <Provider store={store}>
                  <App />
              </Provider>
          </BrowserRouter>
      </ThemeProvider>
  </React.StrictMode>
)
