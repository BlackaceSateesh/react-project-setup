import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import './index.css'
import App from './App.jsx'
import { ProSidebarProvider } from 'react-pro-sidebar';

createRoot(document.getElementById('root')).render(
    <ProSidebarProvider>
    <App />
  </ProSidebarProvider>
)
