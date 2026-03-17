import React, { useState } from "react";

const NoteTitleModal = ({ isOpen, onClose, onCreateNote }) => {
  const [title, setTitle] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the title is not empty before creating
    if (title.trim()) {
      onCreateNote(title.trim());
    }
    setTitle(""); // Clear the input
    onClose()
  };

  // Modal card color is the card color: #121214
  const CARD_COLOR = "#121214";

  return (
    // Modal Overlay (Semi-transparent background)
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-70 transition-opacity duration-300"
    >
      {/* Modal Content Card */}
      <div
        className="w-full max-w-md mx-4 p-6 rounded-xl shadow-2xl transform scale-100 transition-transform duration-300"
        style={{ backgroundColor: CARD_COLOR, color: "white" }}
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the card
      >
        {/* Header */}
        <div className="flex justify-between items-start border-b border-gray-700 pb-4 mb-6">
          <h2 className="text-2xl font-semibold text-white">
            Create a new Note
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <label
              htmlFor="note-title"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Note Title
            </label>
            <input
              id="note-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., QMK Study Notes"
              required
              className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white transition duration-200"
              style={{
                backgroundColor: "transparent",
                border: "1px solid #333",
              }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-300 rounded-lg hover:bg-white hover:text-black transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="px-6 py-2 font-medium rounded-lg transition duration-200 disabled:opacity-50"
              style={{
                backgroundColor: title.trim() ? "#4f46e5" : "#1b1b1f", // Use a purple/blue accent for the primary button
                color: "white",
                border: title.trim() ? "none" : "1px solid #333",
              }}
            >
              Create Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteTitleModal;
