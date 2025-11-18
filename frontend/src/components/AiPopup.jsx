import { useEffect, useRef, useState } from "react";
import { FaCircleNotch } from "react-icons/fa";

export default function AIPopup({ isOpen, onClose, onSend }) {
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);

  // Close with ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Close when clicking outside
  const overlayRef = useRef();

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const handleSend = async () => {
    const val = inputRef.current.value.trim();
    if (!val || loading) return;

    setLoading(true);

    const response = await onSend(val); //waiting for backend response
    if (response) {
      setLoading(false);
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className={`fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end justify-center z-9999 transition-all 
      ${
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <div
        className={`bg-[#1E1E1E] text-white w-full max-w-xl rounded-t-2xl p-5 shadow-lg transform transition-all duration-300
        ${isOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        <h3 className="text-lg font-semibold mb-3">✨ Ask Syncie AI</h3>

        <textarea
          ref={inputRef}
          placeholder="Ask anything related to your notes..."
          className="w-full p-3 rounded-lg bg-[#2A2A2A] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          rows="3"
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-600 mt-4 w-full py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <span className="loader rounded-full animate-spin">
                <FaCircleNotch size={18} color="white" />
              </span>
              Thinking...
            </div>
          ) : (
            "Ask AI"
          )}
        </button>
      </div>
    </div>
  );
}
