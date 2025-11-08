import React from "react";
import { Routes, Route } from "react-router-dom";
import NotesEditor from "../components/NotesEditor";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../pages/MainLayout";
import CreateGroup from "../components/tabs/CreateGroup";
import AllGroups from "../components/tabs/AllGroups";
import SingleGroup from "../pages/SingleGroup";
import GroupNotes from "../pages/GroupNotes"; 
import GroupMembers from "../pages/GroupMembers";

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
        <Route path="/group/:groupId" element={<SingleGroup />}>
          
          {/* Default tab (Column 3) */}
          <Route index element={<GroupNotes />} /> 
          
          {/* Other tabs (Column 3) */}
          <Route path="members" element={<GroupMembers />} />
          <Route path="settings" element={
              <h1 className="p-8 text-white text-2xl">Group Settings (TODO)</h1>
            } 
          />
        </Route>
      </Route>
      {/* <Route path="/create-notes" element={<NotesEditor />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
