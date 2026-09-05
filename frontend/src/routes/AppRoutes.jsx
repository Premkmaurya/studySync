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

// Route-level skeleton fallbacks (eagerly imported — tiny, no network cost)
import GroupContentSkeleton from "../components/tabs/group/GroupContentSkeleton";
import NotesEditorSkeleton from "../components/tabs/notes/NotesEditorSkeleton";
import GroupNotesSkeleton from "../components/tabs/group/group_notes/GroupNotesSkeleton";
import GroupChatSkeleton from "../components/tabs/group/group_chat/GroupChatSkeleton";
import GroupMembersSkeleton from "../components/tabs/group/group_member/GroupMembersSkeleton";
import GroupSettingsSkeleton from "../components/tabs/group/group_setting/GroupSettingsSkeleton";

const AppRoutes = () => {
  return (
    // Top-level Suspense catches any lazy boundary that is not caught by a
    // narrower boundary further down (e.g. Login, Register, LandingPage).
    <Suspense fallback={<PageLoader />}>
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
          {/*
            Group routes: SingleGroup owns the persistent layout (join button,
            outlet context). A per-tab Suspense boundary lives *inside*
            SingleGroup around <Outlet /> so the sidebar in App.jsx never
            disappears while child chunks load — only the main content area
            shows the skeleton.
          */}
          <Route path="/group/:groupId" element={<SingleGroup />}>
            <Route
              index
              element={
                <Suspense fallback={<GroupNotesSkeleton />}>
                  <GroupNotes />
                </Suspense>
              }
            />
            <Route
              path="chats"
              element={
                <Suspense fallback={<GroupChatSkeleton />}>
                  <GroupChat />
                </Suspense>
              }
            />
            <Route
              path="members"
              element={
                <Suspense fallback={<GroupMembersSkeleton />}>
                  <GroupMembers />
                </Suspense>
              }
            />
            <Route
              path="note"
              element={
                <Suspense fallback={<NotesEditorSkeleton />}>
                  <NotesEditor />
                </Suspense>
              }
            />
            <Route
              path="settings"
              element={
                <Suspense fallback={<GroupSettingsSkeleton />}>
                  <GroupSettings />
                </Suspense>
              }
            />
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;