import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import { Plus, FileText } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import NotesGrid from "./components/NotesGrid";
import { selectNotesLoading, selectNotes } from "../../../../features/notes/notesSelectors";
import { getNoteById, setLoading, setNotes } from "../../../../features/notes/notesSlice";
import Button from "../../../design-system/Button";
import Pill from "../../../design-system/Pill";
import { PageHeader } from "../../../design-system/SectionHeader";
import { LoadingState } from "../../../design-system/States";

const GroupNotes = () => {
  const [page, setPage] = useState(1);
  const [hasMoreNotes, setHasMoreNotes] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const outletContext = useOutletContext() || {};
  const group = outletContext.group;

  const loading = useSelector(selectNotesLoading);
  const notes = useSelector(selectNotes);
  const notesRef = useRef(notes);

  useEffect(() => {
    notesRef.current = notes;
  }, [notes]);

  useEffect(() => {
    if (!groupId) return;
    let isCancelled = false;

    const loadNotes = async () => {
      dispatch(setLoading(true));
      let res = await dispatch(getNoteById({ noteId: groupId, page, limit: 8 }));

      if (isCancelled) return;
      const fetchedNotes = res.payload?.notes || res.payload?.note || [];
      const nextNotes =
        page === 1
          ? fetchedNotes
          : [...(Array.isArray(notesRef.current) ? notesRef.current : []), ...fetchedNotes];

      dispatch(setNotes(nextNotes));
      setHasMoreNotes(fetchedNotes.length === 8);
      dispatch(setLoading(false));
    };

    const timer = setTimeout(loadNotes, 200);
    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [groupId, page, dispatch]);

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      {/* Workspace Header */}
      <PageHeader
        title={group?.name || "Group Knowledge Base"}
        description={
          group?.description ||
          "Shared notes and study materials curated by members of this group."
        }
        badge={<Pill variant="sky" size="sm">Knowledge Base</Pill>}
        actions={
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => navigate(`/group/${groupId}/note`)}
            className="px-8"
          >
            Create Note
          </Button>
        }
      />

      {/* Main Grid */}
      <div className="mt-8">
        {loading && (!notes || notes.length === 0) ? (
          <LoadingState message="Loading group notes..." />
        ) : (
          <>
            <NotesGrid />
            {hasMoreNotes && !loading && (
              <div className="flex justify-center mt-8">
                <Button variant="ghost" onClick={() => setPage((prev) => prev + 1)}>
                  Load more notes
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GroupNotes;
