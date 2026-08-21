/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  useParams,
  useLocation,
  NavLink,
  Outlet,
  Link,
} from "react-router-dom";
import api from "../../../services/api";
import {
  FileText,
  MessageSquare,
  Users,
  Settings,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import Avatar from "../../design-system/Avatar";
import Pill from "../../design-system/Pill";

const SubNavItem = ({ to, icon: Icon, label, end = false }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => `
        flex items-center gap-3 px-3.5 py-2.5 rounded-[8px] text-[14px] font-medium transition-all
        ${
          isActive
            ? "bg-[#e6f3fe] text-[#0075de]"
            : "text-[#615d59] hover:text-[#000000] hover:bg-black/[0.04]"
        }
      `}
    >
      <Icon className="w-16 h-16 shrink-0" />
      <span>{label}</span>
    </NavLink>
  );
};

const SingleGroupPage = () => {
  const { groupId } = useParams();
  const location = useLocation();
  const [group, setGroup] = useState(location.state?.groupData || null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    if (!group && groupId) {
      const fetchGroupData = async () => {
        try {
          const response = await api.get(`/groups/search/${groupId}`);
          if (response.data?.group) {
            setGroup(response.data.group);
          }
        } catch {
          setGroup({
            name: "Study Group",
            members: 1,
            field: "General",
            description: "Collaborative study workspace.",
          });
        }
      };
      fetchGroupData();
    }
  }, [groupId, group]);

  return (
    <div className="min-h-screen w-full bg-[#f6f5f4] text-[#000000] flex flex-col md:flex-row antialiased">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between px-6 py-3 bg-[#f6f5f4] border-b border-black/[0.08] sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <Link to="/home">
            <ArrowLeft className="w-5 h-5 text-[#757575]" />
          </Link>
          <span className="font-bold text-[16px] text-[#000000] truncate max-w-[200px]">
            {group?.name || "Workspace"}
          </span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-[6px] text-[#111111] hover:bg-black/5"
          aria-label="Toggle navigation menu"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Backdrop Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Navigation Drawer */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 md:z-auto h-[100dvh] md:h-screen w-[85vw] max-w-[300px] md:w-64 lg:w-72 bg-[#f6f5f4] border-r border-black/[0.08] p-6 flex flex-col justify-between self-start transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col gap-6 flex-1 overflow-y-auto min-h-0 pr-1">
          {/* Top Bar: Back link & Mobile Close */}
          <div className="flex items-center justify-between">
            <Link
              to="/home"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-[#757575] hover:text-[#000000] transition-colors"
            >
              <ArrowLeft className="w-16 h-16" />
              <span>All Groups</span>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-[6px] text-[#757575] hover:text-[#000000] hover:bg-black/5"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Group Identity */}
          <div className="flex items-start gap-3 pb-4 border-b border-black/[0.08]">
            <Avatar
              src={group?.image}
              name={group?.name || "Group"}
              size="md"
              borderColor="#0075de"
            />
            <div className="flex-1 min-w-0">
              <h2 className="text-[16px] font-bold text-[#000000] tracking-[-0.3px] truncate">
                {group?.name || "Study Group"}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <Pill variant="gray" size="sm">
                  {group?.field || "General"}
                </Pill>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <nav className="flex flex-col gap-1">
            <SubNavItem
              to={`/group/${groupId}`}
              end
              icon={FileText}
              label="Knowledge"
            />
            <SubNavItem
              to={`/group/${groupId}/chats`}
              icon={MessageSquare}
              label="Chat"
            />
            <SubNavItem
              to={`/group/${groupId}/members`}
              icon={Users}
              label="Members"
            />
            <SubNavItem
              to={`/group/${groupId}/settings`}
              icon={Settings}
              label="Settings"
            />
          </nav>
        </div>

        {/* Footer info */}
        <div className="text-[12px] text-[#757575] pt-4 border-t border-black/[0.06] shrink-0">
          StudySync Workspace
        </div>
      </aside>

      {/* Main Workspace Stage */}
      <main className="flex-1 min-h-screen overflow-y-auto">
        <Outlet context={{ group, setGroup }} />
      </main>
    </div>
  );
};

export default SingleGroupPage;