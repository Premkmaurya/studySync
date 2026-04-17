import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import GroupSection from "./components/GroupSection";
import ProfileSection from "./components/ProfileSection";
import NoteSection from "./components/NoteSection";
import SavedNote from "./components/SavedNote";


dayjs.extend(relativeTime);


const MainContent = ({ activeTab }) => {
  const theme = useSelector((state) => state.theme.mode);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: "opacity, transform" }}
      >
        {activeTab === "profile" && (
          <ProfileSection activeTab={activeTab} />
        )}

        {activeTab === "groups" && (
          <GroupSection />
        )}

        {activeTab === "notes" && (
          <NoteSection />
        )}

        {activeTab === "saved" && (
          <SavedNote />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default MainContent;
