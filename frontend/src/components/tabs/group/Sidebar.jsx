import React from "react";
import { ArrowLeft, FileText, MessageSquare, Settings, Users, X } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import Avatar from "../../design-system/Avatar";
import Pill from "../../design-system/Pill";

const SubNavItem = ({ to, icon: Icon, label, end = false, onNavigate }) => (
  <NavLink
    to={to}
    end={end}
    onClick={onNavigate}
    className={({ isActive }) => `
      flex items-center gap-3 px-3.5 py-2.5 rounded-[8px] text-[14px] font-medium transition-all
      ${isActive
        ? "bg-[#e6f3fe] text-[#0075de]"
        : "text-[#615d59] hover:text-[#000000] hover:bg-black/[0.04]"
      }
    `}
  >
    <Icon className="w-5 h-5 shrink-0" />
    <span>{label}</span>
  </NavLink>
);

const Sidebar = ({ group, groupId, onClose }) => (
  <aside className="fixed md:sticky top-0 left-0 z-50 md:z-auto h-[100dvh] md:h-screen w-[85vw] max-w-[300px] md:w-64 lg:w-72 bg-[#f6f5f4] border-r border-black/[0.08] p-6 flex flex-col justify-between self-start transition-transform duration-200 ease-in-out translate-x-0">
    <div className="flex flex-col gap-6 flex-1 overflow-y-auto min-h-0 pr-1">
      <div className="flex items-center justify-between">
        <Link
          to="/home"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-[#757575] hover:text-[#000000] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>All Groups</span>
        </Link>
        <button
          onClick={onClose}
          className="md:hidden p-1.5 rounded-[6px] text-[#757575] hover:text-[#000000] hover:bg-black/5"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-start gap-3 pb-4 border-b border-black/[0.08]">
        <Avatar
          src={group?.image}
          name={group?.name || "Group"}
          size="md"
          borderColor="#0075de"
        />
        <div className="flex-1 min-w-0">
          <h2 className="text-[16px] font-bold text-[#000000] tracking-[-0.3px] truncate">
            {group?.name || "Group Workspace"}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <Pill variant="gray" size="sm">
              {group?.field || "General"}
            </Pill>
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        <SubNavItem
          to={`/group/${groupId}`}
          end
          icon={FileText}
          label="Knowledge"
          onNavigate={onClose}
        />
        <SubNavItem
          to={`/group/${groupId}/chats`}
          end
          icon={MessageSquare}
          label="Chats"
          onNavigate={onClose}
        />
        <SubNavItem
          to={`/group/${groupId}/members`}
          end
          icon={Users}
          label="Members"
          onNavigate={onClose}
        />
        <SubNavItem
          to={`/group/${groupId}/settings`}
          end
          icon={Settings}
          label="Settings"
          onNavigate={onClose}
        />
      </nav>
    </div>

    <div className="text-[12px] text-[#757575] pt-4 border-t border-black/[0.06] shrink-0">
      StudySync Workspace
    </div>
  </aside>
);

export default Sidebar;
