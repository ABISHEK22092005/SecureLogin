import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './pages/ProtectedRoute'
import Register from './pages/Register'
const App = () => {
  return (
   <BrowserRouter>

      <Routes>
   
    
      <Route
          path="/"
          element={<Login />}
        />

    <Route
     path="/login" 
    element={<Login/>}
    />

    <Route
    path="/register"
    element={<Register/>}
    />

    <Route
     path="/home"
     element={
      <ProtectedRoute>      
        <Home/>
      </ProtectedRoute>

      }/>


      </Routes>
    </BrowserRouter>
  )
}

export default App
