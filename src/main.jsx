import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './index.css';
import { RouterProvider, BrowserRouter } from "react-router-dom";
import { routes } from "./router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// import { store } from './app/store';
import { store } from "./app/store";

ReactDOM.createRoot(document.getElementById("root")).render(

    <Provider store={store}>
     
    <BrowserRouter>
        <App />
      </BrowserRouter>
    
      {/* <PersistGate loading={null} persistor={persistor}> */}
      {/* <RouterProvider router={routes}></RouterProvider> */}
      {/* </PersistGate> */}
    </Provider>
   
 
);
