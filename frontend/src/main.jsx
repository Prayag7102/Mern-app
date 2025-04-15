import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' 
import App from './App.jsx'
import { UserProvider } from './context/user.context'
import { AdminProvider } from './context/admin.context.jsx'


createRoot(document.getElementById("root")).render(
  <AdminProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </AdminProvider>
);
