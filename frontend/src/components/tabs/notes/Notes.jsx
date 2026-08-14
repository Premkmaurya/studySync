import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectNotesLoading } from "../../../features/notes/notesSelectors";
import { fetchNotes, searchNotes } from "../../../features/notes/notesSlice";
import NoteCard from "./components/NoteCard";
import SearchInput from "../../design-system/Input";
import Pill from "../../design-system/Pill";
import Button from "../../design-system/Button";
import { PageHeader } from "../../design-system/SectionHeader";
import { LoadingState, EmptyState } from "../../design-system/States";
import { FileText } from "lucide-react";

const CATEGORIES = [
  { id: "All", label: "All Notes" },
  { id: "Engineering", label: "Engineering" },
  { id: "dsa", label: "Algorithms" },
  { id: "ai-ml", label: "AI & ML" },
  { id: "cybersecurity", label: "Security" },
  { id: "design", label: "Design" },
  { id: "other", label: "Other" },
];

const SavedNotesContent = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [page, setPage] = useState(1);
  const [visibleNotes, setVisibleNotes] = useState(9);

  const dispatch = useDispatch();
  const loading = useSelector(selectNotesLoading);

  useEffect(() => {
    setPage(1);
    setVisibleNotes(9);
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchAndSet = async () => {
        const query = searchTerm.trim();
        const categoryField = selectedCategory !== "All" ? selectedCategory : null;
        let res;

        if (query) {
          res = await dispatch(
            searchNotes({
              query: query.toLowerCase(),
              groupId: null,
              page,
              limit: 9,
              field: categoryField,
            })
          );
        } else {
          res = await dispatch(fetchNotes({ page, limit: 9, field: categoryField }));
        }

        const notesResponse = res.payload?.notes || res.payload || [];
        if (page === 1) {
          setFilteredNotes(notesResponse);
        } else {
          setFilteredNotes((prev) => [...prev, ...notesResponse]);
        }
      };

      fetchAndSet();
    }, searchTerm.trim() ? 300 : 0);
    return () => clearTimeout(timer);
  }, [dispatch, searchTerm, selectedCategory, page]);

  return (
    <div className="bg-[#f6f5f4] text-[#000000] min-h-screen mt-[6rem] pt-28 sm:pt-36 pb-12 px-6 md:px-12 max-w-[1440px] mx-auto">
      {/* Header */}
      <PageHeader
        title="Your saved notes"
        description="Search, filter, and review study notes saved across your groups."
        badge={<Pill variant="sky" size="sm">Knowledge Library</Pill>}
      />

      {/* Controls & Category Filters */}
      <div className="mt-8 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="w-full md:w-96">
          <SearchInput
            placeholder="Search notes by title or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm("")}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <Pill
              key={cat.id}
              variant={selectedCategory === cat.id ? "blue" : "gray"}
              size="md"
              active={selectedCategory === cat.id}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </Pill>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      {loading && filteredNotes.length === 0 ? (
        <LoadingState message="Loading saved notes..." />
      ) : filteredNotes && filteredNotes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.slice(0, visibleNotes).map((note, i) => (
              <NoteCard key={note._id || note.id || i} note={note} />
            ))}
          </div>

          {filteredNotes.length > visibleNotes && (
            <div className="flex justify-center mt-10">
              <Button
                variant="ghost"
                onClick={() => setVisibleNotes((prev) => prev + 9)}
              >
                Load more notes
              </Button>
            </div>
          )}
        </>
      ) : (
        <EmptyState
          icon={FileText}
          title="No notes found"
          description="Save notes from your group workspaces or adjust your search filters to find content."
          actionLabel="Clear filters"
          onAction={() => {
            setSearchTerm("");
            setSelectedCategory("All");
          }}
        />
      )}
    </div>
  );
};

export default SavedNotesContent;