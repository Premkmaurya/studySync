import React, { useEffect } from "react";
import StartCard from "./StartCard";
import { FileText, Users, Bookmark } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectJoinedGroups } from "../../../../../../features/groups/groupsSelectors";
import {
  selectMyNotes,
  selectSavedNotes,
} from "../../../../../../features/notes/notesSelectors";
import { getMyNotes, getSavedNotes } from "../../../../../../features/notes/notesSlice";
import { joinedGroup } from "../../../../../../features/groups/groupsSlice";

const ProfileSection = () => {
  const dispatch = useDispatch();
  const joinedGroups = useSelector(selectJoinedGroups) || [];
  const notes = useSelector(selectMyNotes) || [];
  const savedNotes = useSelector(selectSavedNotes) || [];

  useEffect(() => {
    dispatch(getMyNotes());
    dispatch(getSavedNotes());
    dispatch(joinedGroup());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
      <StartCard
        label="Created Notes"
        value={notes.length}
        icon={FileText}
      />
      <StartCard
        label="Joined Groups"
        value={joinedGroups.length}
        icon={Users}
      />
      <StartCard
        label="Saved Library"
        value={savedNotes.length}
        icon={Bookmark}
      />
    </div>
  );
};

export default ProfileSection;
