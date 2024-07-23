import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "modern-normalize/modern-normalize.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster position="top-right" autoClose={1500} reverseOrder={false} />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
