import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import GroupCard from "../GroupCard";
import { HiSearch } from "react-icons/hi";
import { io } from "socket.io-client";

// Yeh categories humne CreateGroup.jsx mein define ki thi
const categories = [
  "All",
  "Web Development",
  "DSA",
  "AI / Machine Learning",
  "Cybersecurity",
  "Other",
];

export default function AllGroups() {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  

  const searchRef = useRef()

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/groups/all",
          { withCredentials: true }
        );
        setGroups(response.data.groups);
        setFilteredGroups(response.data.groups); // Initially sab dikhao
      } catch (err) {
        console.error("Error fetching groups:", err);
        setError("Could not fetch groups. Please try again later.");
      }
      setLoading(false);
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // 1. Waiter ka Timer set karo (500ms)
    const timerId = setTimeout(() => {
      // 2. Timer khatam hone ke baad, API call karo
      const fetchGroups = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3000/api/groups/search", // Hum /all route ko hi call karenge
            {
              params: {
                q: searchTerm, // Search query bhejenge
              },
              withCredentials: true,
            }
          );
          setGroups(response.data.groups); // Groups ko set karo
        } catch (err) {
          console.error("Error fetching groups:", err);
          setError("Could not fetch groups. Please try again later.");
        }
        setLoading(false);
      };

      fetchGroups();
    }, 300); // 300ms ka delay (thoda fast)

    // 3. Cleanup: Agar user dobara type kare, toh purana timer cancel kar do
    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredGroups(groups);
    } else {
      // TODO: Backend mein 'field' add karne ke baad is logic ko uncomment karna hai
      // const filtered = groups.filter(group => group.field === selectedCategory);
      // setFilteredGroups(filtered);

      // Abhi ke liye, hum filtering skip kar rahe hain
      setFilteredGroups(groups);
      console.log(
        `Filtering by ${selectedCategory} (Logic is pending backend update)`
      );
    }
  }, [selectedCategory, groups]);

  useEffect(() => {
    // Yeh function har click par check karega
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        // Agar click 'searchRef' ke bahar hua hai...
        setIsSearchVisible(false); // ...toh search bar ko hide kar do
      }
    }

    // Listener ko add karo
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup: Component hatne par listener ko bhi hata do
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  const handleGroupUpdate = (updatedGroup) => {
    setGroups((currentGroups) =>
      currentGroups.map((g) =>
        g._id === updatedGroup._id ? updatedGroup : g
      )
    );
  };
  useEffect(() => {
    const socket = io("http://localhost:3000");
    socket.on("groupUpdated", (updatedGroup) => {
      handleGroupUpdate(updatedGroup);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="text-white min-h-screen bg-[#1b1b1f]">
      {/* Hero Section */}
      <div className="bg-[#121214] p-8 md:p-12 mb-6 shadow-xl">
        <HiSearch
          size={25}
          onClick={() => setIsSearchVisible(true)} // Click karne par show hoga
          className={`absolute top-5 right-6 cursor-pointer ${
            isSearchVisible ? "hidden" : "block"
          }`}
          color="white"
        />
        <div ref={searchRef}>
          <input
            type="text"
            placeholder="search"
            className={`absolute top-5 right-6 px-2 py-1 outline-none border-b border-white/30 transition-all duration-300 ${
              !isSearchVisible ? "hidden" : "block"
            }`} // 'isSearchVisible' se show/hide
            value={searchTerm} // 'searchTerm' se value control
            onChange={(e) => setSearchTerm(e.target.value)} // 'searchTerm' ko update
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          Find Your Study Group
        </h1>
        <p className="text-lg text-gray-300">
          From Web Dev, to DSA, to AI/ML, there's a place for you.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center px-6 space-x-2 overflow-x-auto pb-4 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
              transition-colors
              ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-[#121214] text-gray-300 hover:bg-[#121214ea]"
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Groups Grid */}
      <h2 className="text-2xl font-bold mb-4 px-6">Featured Groups</h2>

      {loading && <p>Loading groups...</p>}

      {error && <p className="text-red-400">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 px-10 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.length > 0 ? (
            filteredGroups.map((group) => (
              <GroupCard key={group._id} group={group} onGroupJoined={handleGroupUpdate} />
            ))
          ) : (
            <p>No groups found in this category.</p>
          )}
        </div>
      )}
    </div>
  );
}
