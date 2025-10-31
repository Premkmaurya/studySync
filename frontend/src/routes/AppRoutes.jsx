import React from "react";
import { Routes, Route } from "react-router-dom";
import NotesEditor from "../components/NotesEditor";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../pages/MainLayout";
import CreateGroup from "../components/tabs/CreateGroup"

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<NotesEditor />} />
        <Route
          path="/find-groups"
          element={
            <h1 className="text-3xl font-bold">Groups Page Coming Soon!</h1>
          }
        />
        <Route
          path="/create-groups"
          element={
            <CreateGroup />
          }
        />
        <Route
          path="/settings"
          element={
            <h1 className="text-3xl font-bold">Settings Page Coming Soon!</h1>
          }
        />
      </Route>
      {/* <Route path="/create-notes" element={<NotesEditor />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
