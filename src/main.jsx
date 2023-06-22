import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import "./style.scss";
import { AuthContextProvider } from './context/AuthContext.jsx'
import { ChatContextProvider } from './context/ChatContext.jsx'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
  <ChatContextProvider>
    <React.StrictMode>
      <App />
      <ToastContainer />

    </React.StrictMode>
  </ChatContextProvider>
</AuthContextProvider>
)
