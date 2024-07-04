import ReactDOM from 'react-dom/client';
import router from "./app/routes/router"
import { RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './app/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
