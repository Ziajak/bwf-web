import React from 'react'
import './App.css';
import Header from "./components/layout/header";
import Main from "./components/layout/main";
import Sidebar from "./components/layout/sidebar";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme"
import{ BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

     const user = JSON.parse(localStorage.getItem('btw-user'));

    return (
    <ThemeProvider theme={theme}>
        <AuthProvider user={user}>
            <div className="App">
                  <Router>
                  <Header/>
                  <div className="general-content">
                      <Sidebar/>
                      <Main/>

                  </div>
                  </Router>
            </div>
            <ToastContainer position="top-center" autoClose={3000}   style={{
    top: '50%'}}/>
        </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
