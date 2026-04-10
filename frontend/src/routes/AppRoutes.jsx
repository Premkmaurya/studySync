import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const NotesEditor = lazy(() => import("../components/tabs/notes/NotesEditor"));
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const MainLayout = lazy(() => import("../components/tabs/common/MainLayout"));
const CreateGroup = lazy(() => import("../components/tabs/group/create_group/CreateGroup"));
const AllGroups = lazy(() => import("../components/tabs/group/all_group/AllGroups"));
const GroupSettings = lazy(() => import("../components/tabs/group/GroupSettings"));
const GroupChat = lazy(() => import("../components/tabs/group/group_chat/GroupChat"));
const SingleGroup = lazy(() => import("../components/tabs/group/SingleGroup"));
const GroupNotes = lazy(() => import("../components/tabs/group/GroupNotes"));
const Profile = lazy(() => import("../components/tabs/profile/Profile"));
const TabHome = lazy(() => import("../components/tabs/home/TabHome"));
const SavedNotesContent = lazy(() => import("../components/tabs/notes/Notes"));
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const Features = lazy(() => import("../pages/Features"));
const NotFound = lazy(() => import("../pages/NotFound"));
const GroupMembers = lazy(() => import("../components/tabs/group/group_member/GroupMembers"));

const AppRoutes = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    }>
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
            <Route path="note" element={<NotesEditor />} />
          </Route>
        </Route>
        {/* <Route path="/create-notes" element={<NotesEditor />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;