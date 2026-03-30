import React from "react";
import { Routes, Route } from "react-router-dom";
import NotesEditor from "../components/tabs/notes/NotesEditor";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import MainLayout from "../components/tabs/common/MainLayout";
import CreateGroup from "../components/tabs/group/CreateGroup";
import AllGroups from "../components/tabs/group/AllGroups";
import GroupSettings from "../components/tabs/group/GroupSettings";
import GroupChat from "../components/tabs/group/GroupChat";
import SingleGroup from "../components/tabs/group/SingleGroup";
import GroupNotes from "../components/tabs/group/GroupNotes";
import Profile from "../components/tabs/profile/Profile";
import TabHome from "../components/tabs/home/TabHome";
import SavedNotesContent from "../components/tabs/notes/Notes";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Features from "../pages/Features";
import NotFound from "../pages/NotFound";
import GroupMembers from "../components/tabs/group/GroupMembers";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/features" element={<Features />} />
        <Route element={<MainLayout />}>
          <Route path="/home" element={<TabHome />} />
          <Route path="/find-groups" element={<AllGroups />} />
          <Route path="/create-group" element={<CreateGroup />} />
          <Route path="/saved-notes" element={<SavedNotesContent />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/group/:groupId" element={<SingleGroup />}>
            {/* Default tab (Column 3) */}
            <Route index element={<GroupNotes />} />

            {/* Other tabs (Column 3) */}
            <Route path="chats" element={<GroupChat />} />
            <Route path="members" element={<GroupMembers />} />
            <Route path="settings" element={<GroupSettings />} />
            <Route path="create-notes" element={<NotesEditor />} />
          </Route>
        </Route>
        {/* <Route path="/create-notes" element={<NotesEditor />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;