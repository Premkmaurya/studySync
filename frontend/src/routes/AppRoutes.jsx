import React from 'react'
import { Routes,Route } from "react-router-dom";
import NotesEditor from "../components/NotesEditor"
import Login from "../pages/Login"
import Register from "../pages/Register"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<NotesEditor />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default AppRoutes