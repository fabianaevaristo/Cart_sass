import React from "react";
import ReactDOM from "react-dom/client";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')
);
root.render(
  <React.StrictMode>
    <app />
  </React.StrictMode>
)

/* import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <div> Hello World </div>,
  },
  {
    path: '/carrinho',
    element: <App/>,
  },
  {
    path: '*',
    element: <>Página não encontrada </>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
); */

