import React from 'react'
import './App.css';
import Header from "./components/header";
import Main from "./components/main";
import Sidebar from "./components/sidebar";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme"
import{ BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";

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
        </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
