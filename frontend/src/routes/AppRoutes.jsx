import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const NotesEditor = lazy(() => import("../components/tabs/notes/NotesEditor"));
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const MainLayout = lazy(() => import("../pages/dashboard/MainLayout"));
const CreateGroup = lazy(() => import("../components/tabs/group/create_group/CreateGroup"));
const FindGroup = lazy(() => import("../pages/dashboard/FindGroup"));
const GroupSettings = lazy(() => import("../components/tabs/group/group_setting/GroupSettings"));
const GroupChat = lazy(() => import("../components/tabs/group/group_chat/GroupChat"));
const SingleGroup = lazy(() => import("../components/tabs/group/SingleGroup"));
const GroupNotes = lazy(() => import("../components/tabs/group/group_notes/GroupNotes"));
const Profile = lazy(() => import("../components/tabs/profile/Profile"));
const Home = lazy(() => import("../pages/dashboard/Home"));
const SavedNotesContent = lazy(() => import("../components/tabs/notes/Notes"));
const LandingPage = lazy(() => import("../pages/LandingPage"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const Features = lazy(() => import("../pages/Features"));
const NotFound = lazy(() => import("../pages/NotFound"));
const GroupMembers = lazy(() => import("../components/tabs/group/group_member/GroupMembers"));

import ProtectedRoute from "../components/common/ProtectedRoute";
import PageLoader from "../components/common/PageLoader";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/features" element={<Features />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard/home" element={<Home />} />
          <Route path="/dashboard/find-groups" element={<FindGroup />} />
          <Route path="/dashboard/create-group" element={<CreateGroup />} />
          <Route path="/dashboard/notes" element={<SavedNotesContent />} />
          <Route path="/dashboard/profile" element={<Profile />} />
        </Route>
        <Route path="/group/:groupId" element={<SingleGroup />} >
          <Route index element={<GroupNotes />} />
          <Route path="chats" element={<GroupChat />} />
          <Route path="members" element={<GroupMembers />} />
          <Route path="notes" element={<NotesEditor />} />
          <Route path="settings" element={<GroupSettings />} />
        </Route>
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;