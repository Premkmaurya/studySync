import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GroupCard from '../GroupCard';
import { HiSearch } from 'react-icons/hi';

// Yeh categories humne CreateGroup.jsx mein define ki thi
const categories = [
  'All',
  'Web Development',
  'DSA',
  'AI / Machine Learning',
  'Cybersecurity',
  'Other',
];

export default function AllGroups() {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [searchBar,setSearchBar] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Step 1: Backend se saara data fetch karo
  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          'http://localhost:3000/api/groups/all',
          { withCredentials: true }
        );
        setGroups(response.data.groups);
        setFilteredGroups(response.data.groups); // Initially sab dikhao
      } catch (err) {
        console.error('Error fetching groups:', err);
        setError('Could not fetch groups. Please try again later.');
      }
      setLoading(false);
    };

    fetchGroups();
  }, []); // Yeh sirf ek baar chalega

  // Step 2: Filter logic (Abhi ke liye disabled hai)
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredGroups(groups);
    } else {
      // TODO: Backend mein 'field' add karne ke baad is logic ko uncomment karna hai
      // const filtered = groups.filter(group => group.field === selectedCategory);
      // setFilteredGroups(filtered);

      // Abhi ke liye, hum filtering skip kar rahe hain
      setFilteredGroups(groups); 
      console.log(`Filtering by ${selectedCategory} (Logic is pending backend update)`);
    }
  }, [selectedCategory, groups]);

  return (
    <div className="text-white min-h-screen bg-[#1b1b1f]">
      {/* Hero Section */}
      <div className="bg-[#121214] p-8 md:p-12 mb-6 shadow-xl">
        <HiSearch size={25} onClick={()=>setSearchBar(true)} className={`absolute top-5 right-6 ${searchBar ? "hidden":"block"}`} color="white" />
        <input type="text" placeholder='search' className={`absolute top-5 right-6 px-2 py-1 outline-none border-b border-white/30 ${!searchBar ? "hidden":"block"}`} />
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
                  ? 'bg-blue-600 text-white'
                  : 'bg-[#121214] text-gray-300 hover:bg-[#121214ea]'
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
              <GroupCard key={group._id} group={group} />
            ))
          ) : (
            <p>No groups found in this category.</p>
          )}
        </div>
      )}
    </div>
  );
}
