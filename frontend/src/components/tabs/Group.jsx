import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const Group = () => {
  const { groupId } = useParams();
  const location = useLocation();
  const groupData = location.state?.groupData;
  if (!groupData) {
    useEffect(() => {
      async function fetchGroupData() {
        // ... (API call to get group details by groupId) ...
      }
      fetchGroupData();
    }, [groupId]);

    return (
      <div className="p-8 text-white">
        <h1 className="text-3xl font-bold mb-4">Group ID: {groupId}</h1>
        <p>Fetching full details...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-blue-400">{groupData.name}</h1>
      <p className="text-gray-300 mt-2">{groupData.description}</p>
      <p className="text-sm text-gray-500 mt-4">Members: {groupData.members}</p>
      {/* ... aur baki group details yahan dikhao ... */}
    </div>
  );
};

export default Group;
