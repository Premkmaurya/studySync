import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <App className="hide-scrollbar" />
      </MantineProvider>
    </Provider>
  </BrowserRouter>,
);
