import React from "react";
import { Routes, Route } from "react-router-dom";
import NotesEditor from "../components/NotesEditor";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../pages/MainLayout";
import CreateGroup from "../components/tabs/CreateGroup";
import AllGroups from "../components/tabs/AllGroups";
import Group from "../components/tabs/Group";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<NotesEditor />} />
        <Route
          path="/find-groups"
          element={
            <AllGroups />
          }
        />
        <Route
          path="/create-groups"
          element={
            <CreateGroup />
          }
        />
        <Route
          path="/group/:id"
          element={
            <Group />
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
