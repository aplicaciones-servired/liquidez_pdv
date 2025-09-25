import ReactDOM from 'react-dom/client'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { AuthProvider } from './auth/AuthContext.tsx';
import { RouterProvider } from 'react-router-dom';
import { BrowserRouters } from './routes/index.tsx';

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider router={BrowserRouters} />
    <ToastContainer position="top-right" autoClose={3000} />
  </AuthProvider>
)
