import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MoreVertical, UserMinus } from "lucide-react";
import { selectUser } from "../../../../../features/auth/authSelectors";
import { removeMember } from "../../../../../features/groups/groupsSlice";
import { useOutletContext } from "react-router-dom";
import Avatar from "../../../../design-system/Avatar";
import Pill from "../../../../design-system/Pill";
import Button from "../../../../design-system/Button";

const MemberEntry = ({ member, onRemove }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const context = useOutletContext();
  const group = context?.group;

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const groupOwnerId = group?.owner?._id || group?.owner;
  const isCurrentUserOwner = String(groupOwnerId) === String(currentUser?._id);
  const isMemberAdmin = String(member?.userId?._id) === String(groupOwnerId);

  const firstName = String(member?.userId?.fullname?.firstname || "User");
  const lastName = String(member?.userId?.fullname?.lastname || "");
  const fullName = `${firstName} ${lastName}`.trim();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRemove = async () => {
    if (
      window.confirm(
        `Are you sure you want to remove ${fullName} from this group?`
      )
    ) {
      const res = await dispatch(
        removeMember({ groupId: group._id, userId: member.userId._id })
      );
      if (res.meta.requestStatus === "fulfilled") {
        if (onRemove) onRemove(member.userId._id);
      }
      setShowMenu(false);
    }
  };

  return (
    <div className="flex items-center justify-between py-3.5 px-4 border-b border-black/[0.06] hover:bg-black/[0.02] transition-colors rounded-[8px]">
      <div className="flex items-center gap-3">
        <Avatar name={fullName} size="md" borderColor="#0075de" />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-bold text-[#000000]">
              {fullName}
            </span>
            {isMemberAdmin ? (
              <Pill variant="marigold" size="sm">
                Admin
              </Pill>
            ) : (
              <Pill variant="gray" size="sm">
                Member
              </Pill>
            )}
          </div>
          <span className="text-[12px] text-[#757575]">
            Joined group member
          </span>
        </div>
      </div>

      <div className="relative" ref={menuRef}>
        {isCurrentUserOwner && member.userId?._id !== currentUser?._id && (
          <>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 rounded-[6px] text-[#757575] hover:text-[#000000] hover:bg-black/5"
            >
              <MoreVertical className="w-16 h-16" />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-black/[0.12] rounded-[8px] p-1 shadow-none z-20">
                <button
                  onClick={handleRemove}
                  className="flex items-center gap-2 w-full px-3 py-2 text-[13px] font-medium text-[#e32d14] hover:bg-[#e32d14]/10 rounded-[6px]"
                >
                  <UserMinus className="w-16 h-16" />
                  Remove Member
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MemberEntry;
