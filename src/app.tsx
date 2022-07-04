import React from "react";
import { ThemeProvider } from "@mui/system";
import { HashRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import defaultTheme from "./style/light-theme";
import { LocalesContextProvider } from "./context/locales.context";
import Routes from "./routes/routes";
import CenteredWrapper from "./components/centered-wrapper/centered-wrapper.component";

const App = () => (
  <HashRouter>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <React.StrictMode>
        <LocalesContextProvider>
          <CenteredWrapper>
            <Routes />
          </CenteredWrapper>
        </LocalesContextProvider>
      </React.StrictMode>
    </ThemeProvider>
  </HashRouter>
);

export default App;
