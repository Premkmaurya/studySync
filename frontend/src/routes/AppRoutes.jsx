import React from "react";
import { Routes, Route } from "react-router-dom";
import NotesEditor from "../components/tabs/NotesEditor";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../pages/MainLayout";
import CreateGroup from "../components/tabs/CreateGroup";
import AllGroups from "../components/tabs/AllGroups";
import GroupSettings from "../components/tabs/GroupSettings";
import GroupChat from "../components/tabs/GroupChat";
import SingleGroup from "../components/tabs/SingleGroup";
import GroupNotes from "../components/tabs/GroupNotes";
import Home from "../pages/Home";
import About from "../pages/About";
import GroupMembers from "../components/tabs/GroupMembers";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<MainLayout />}>
          <Route path="/home" element={<NotesEditor />} />
          <Route path="/find-groups" element={<AllGroups />} />
          <Route path="/create-groups" element={<CreateGroup />} />
          <Route path="/group/:groupId" element={<SingleGroup />}>
            {/* Default tab (Column 3) */}
            <Route index element={<GroupNotes />} />

            {/* Other tabs (Column 3) */}
            <Route path="chats" element={<GroupChat />} />
            <Route path="members" element={<GroupMembers />} />
            <Route path="settings" element={<GroupSettings />} />
          </Route>
        </Route>
        {/* <Route path="/create-notes" element={<NotesEditor />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
