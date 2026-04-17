import { useEffect, useState } from "react";
import StartCard from "./StartCard";
import { FileText, Users, Bookmark } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectJoinedGroups } from "../../../../../../features/groups/groupsSelectors";
import {
  selectMyNotes,
  selectSavedNotes,
} from "../../../../../../features/notes/notesSelectors";
import {
  getMyNotes,
  getSavedNotes,
  setMyNotes,
  setSavedNotes,
} from "../../../../../../features/notes/notesSlice";
import {
  joinedGroup,
  setJoinedGroups,
} from "../../../../../../features/groups/groupsSlice";

const ProfileSection = () => {
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const [localJoinedGroups, setLocalJoinedGroups] = useState(
    useSelector(selectJoinedGroups) || [],
  );
  const [notes, setNotes] = useState(useSelector(selectMyNotes) || []);
  const savedNotes = useSelector(selectSavedNotes);

  useEffect(() => {
    // Example: Fetch notes when the "notes" tab is active
    if (notes.length === 0) {
      const fetchMyNotes = async () => {
        const res = await dispatch(getMyNotes());
        setNotes(res.payload?.notes);
        await dispatch(setMyNotes(res.payload?.notes));
      };
      fetchMyNotes();
    }

    if (savedNotes.length === 0) {
      const fetchSavedNotes = async () => {
        const res = await dispatch(getSavedNotes());
        if (res.payload && res.payload.savedNotes) {
          dispatch(setSavedNotes(res.payload.savedNotes));
        }
      };
      fetchSavedNotes();
    }

    if (localJoinedGroups.length === 0) {
      const fetchGroups = async () => {
        const res = await dispatch(joinedGroup());
        setLocalJoinedGroups([...res.payload.groups]);
        await dispatch(setJoinedGroups(res.payload.groups));
      };
      fetchGroups();
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center ">
      <StartCard
        label="Total Notes"
        value={notes.length}
        icon={FileText}
        color="text-cyan-400"
      />
      <StartCard
        label="Active Groups"
        value={localJoinedGroups.length}
        icon={Users}
        color="text-fuchsia-400"
      />
      <StartCard
        label="Saved Items"
        value={savedNotes.length}
        icon={Bookmark}
        color="text-emerald-400"
      />
    </div>
  );
};

export default ProfileSection;
