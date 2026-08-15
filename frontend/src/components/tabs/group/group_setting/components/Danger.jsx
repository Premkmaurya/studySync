import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Trash2, AlertCircle } from "lucide-react";
import { deleteGroup } from "../../../../../features/groups/groupsSlice";
import Card from "../../../../design-system/Card";
import Button from "../../../../design-system/Button";

const Danger = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useOutletContext();
  const group = context?.group;

  const [deleteError, setDeleteError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteGroup = async () => {
    if (!group?._id) return;
    if (
      !window.confirm(
        `Are you sure you want to delete ${group.name || "this group"}? This action cannot be undone.`
      )
    ) {
      return;
    }

    setIsDeleting(true);
    const res = await dispatch(deleteGroup(group._id));
    if (deleteGroup.fulfilled.match(res)) {
      navigate("/home");
    } else {
      setDeleteError(res.payload || "Failed to delete group");
      setIsDeleting(false);
      setTimeout(() => setDeleteError(null), 3000);
    }
  };

  return (
    <Card variant="white" className="p-6 md:p-8 border-[#e32d14]/20 flex flex-col gap-6">
      <div className="border-b border-black/[0.06] pb-4">
        <h3 className="text-[18px] font-bold text-[#e32d14]">
          Danger Zone
        </h3>
        <p className="text-[14px] text-[#615d59] mt-0.5">
          Permanently delete this group and remove access for all members.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-[#e32d14]/5 rounded-[8px] border border-[#e32d14]/15">
        <div>
          <h4 className="text-[15px] font-bold text-[#e32d14]">
            Delete Study Group
          </h4>
          <p className="text-[13px] text-[#615d59] mt-0.5">
            Once deleted, all notes, messages, and member access will be permanently removed.
          </p>
        </div>

        <Button
          variant="danger"
          size="md"
          icon={Trash2}
          loading={isDeleting}
          onClick={handleDeleteGroup}
          className="px-8"
        >
          Delete Group
        </Button>
      </div>

      {deleteError && (
        <div className="text-[13px] text-[#e32d14] font-medium flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4" /> {deleteError}
        </div>
      )}
    </Card>
  );
};

export default Danger;
