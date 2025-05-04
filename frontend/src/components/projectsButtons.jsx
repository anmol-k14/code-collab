import React, { useState, useEffect, useRef, use } from "react";
import { useLocation } from "react-router-dom";
import axios from "../config/axios";

const ProjectButtons = ({ setCode, code, project }) => {
  // State to track dropdown visibility
  const location = useLocation();

  const [showChats, setShowChats] = useState(false);
  const [showCollaborators, setShowCollaborators] = useState(false);
  const [showNewPeople, setShowNewPeople] = useState(false);
  const [users, setUsers] = useState([])
  const [collaborators, setCollaborators] = useState([]);
  const [nonCollaborators, setNonCollaborators] = useState([]);
  // Refs for dropdowns to handle positioning
  const chatsDropdownRef = useRef(null);
  const collaboratorsDropdownRef = useRef(null);
  const newPeopleDropdownRef = useRef(null);
  
  // Mock data - would come from your backend in real implementation
  const chats = [
    { id: 1, name: "Discussion on features", unread: 3 },
    { id: 2, name: "Bug fixes", unread: 0 },
    { id: 3, name: "Project planning", unread: 2 }
  ];
  

  
  // const nonCollaborators = [
  //   { id: 4, name: "Michael Brown", avatar: "MB" },
  //   { id: 5, name: "Sarah Wilson", avatar: "SW" },
  //   { id: 6, name: "Robert Davis", avatar: "RD" }
  // ];


  
  // Total unread message count
  const totalUnread = chats.reduce((acc, chat) => acc + chat.unread, 0);
  
  function addCollaborators(person) {
    const user=[person._id]
    console.log(user);
    console.log(location.state?.project?._id);
    axios
      .put("/projects/add-user", {
        projectId: location.state?.project?._id,
        users: user,
      })
      .then((res) => {
        console.log(res.data);
        setNonCollaborators((prev) =>
          prev.filter((person) => !user.includes(person._id))
        );
        setCollaborators((prev) => [...prev, person]);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        chatsDropdownRef.current && !chatsDropdownRef.current.contains(event.target) &&
        collaboratorsDropdownRef.current && !collaboratorsDropdownRef.current.contains(event.target) &&
        newPeopleDropdownRef.current && !newPeopleDropdownRef.current.contains(event.target)
      ) {
        closeAllDropdowns();
      }
    };

    axios
    .get("/users/all")
    .then((res) => {
      const fetchedUsers = res.data.users;
      setUsers(fetchedUsers);;
      const nonCollaborators = fetchedUsers.filter( user => !project.users.includes(user._id)
      );
      console.log("nonCollaborators", nonCollaborators)
      setNonCollaborators(nonCollaborators);
      console.log(project.users)
      console.log(fetchedUsers)
      const selectedUsers = fetchedUsers.filter(user => project.users.includes(user._id))
      setCollaborators(selectedUsers);
      console.log("heello", selectedUsers)

    })
    .catch((err) => {
      console.log(err);
    });

    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    console.log(project); 
    console.log(users)
    console.log(nonCollaborators)
    console.log("dddd",collaborators)
  }, [users, nonCollaborators,collaborators]);

  
  const closeAllDropdowns = () => {
    setShowChats(false);
    setShowCollaborators(false);
    setShowNewPeople(false);
  };
  
  // Toggle dropdown and close others
  const toggleDropdown = (dropdown) => {
    closeAllDropdowns();
    switch(dropdown) {
      case 'chats':
        setShowChats(!showChats);
        break;
      case 'collaborators':
        setShowCollaborators(!showCollaborators);
        break;
      case 'newPeople':
        setShowNewPeople(!showNewPeople);
        break;
      default:
        break;
    }
  };
  
  return (
    <div className="flex items-center space-x-2 mr-2">
      {/* Chats Button */}
      <div className="relative" ref={chatsDropdownRef}>
        <button 
          onClick={() => toggleDropdown('chats')}
          className="flex items-center justify-center w-8 h-8 text-white rounded-full hover:bg-[#3D3D3D] focus:outline-none bg-[#2D2D2D]"
          title="Chats"
        >
          <i className="ri-message-3-line"></i>
          {totalUnread > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {totalUnread}
            </span>
          )}
        </button>
        
        {/* Chats Dropdown */}
        {showChats && (
          <div className="absolute top-full right-0 mt-1 w-64 bg-[#1F1F1F] border border-[#5D5D5D] rounded-md shadow-lg z-50">
            <div className="p-2 border-b border-[#5D5D5D]">
              <h3 className="text-white font-medium">Messages</h3>
            </div>
            {/* <ul className="max-h-60 overflow-y-auto">
              {chats.map(chat => (
                <li key={chat.id} className="p-2 hover:bg-[#293957] border-b border-[#5D5D5D] last:border-b-0">
                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm">{chat.name}</span>
                    {chat.unread > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul> */}
            <div className="p-2 text-[#9CA3AF] text-sm">
              Coming Soon as version 2 currently under development.
            </div>
          </div>
        )}
      </div>
      
      {/* Collaborators Button */}
      <div className="relative" ref={collaboratorsDropdownRef}>
        <button 
          onClick={() => toggleDropdown('collaborators')}
          className="flex items-center justify-center w-8 h-8 text-white rounded-full hover:bg-[#3D3D3D] focus:outline-none bg-[#2D2D2D]"
          title="Collaborators"
        >
          <i className="ri-group-line"></i>
        </button>
        
        {/* Collaborators Dropdown */}
        {showCollaborators && (
          <div className="absolute top-full right-0 mt-1 w-64 bg-[#1F1F1F] border border-[#5D5D5D] rounded-md shadow-lg z-50">
            <div className="p-2 border-b border-[#5D5D5D]">
              <h3 className="text-white font-medium">Current Collaborators</h3>
            </div>
            <ul className="max-h-60 overflow-y-auto">
              {collaborators.map(person => (
                <li key={person.id} className="p-2 hover:bg-[#293957] border-b border-[#5D5D5D] last:border-b-0">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-white text-sm mr-2">
                      {person.avatar}
                    </div>
                    <span className="text-white text-sm">{person.email}</span>
                    <div className={`ml-auto w-2 h-2 rounded-full ${person.online ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Add People Button */}
      <div className="relative" ref={newPeopleDropdownRef}>
        <button 
          onClick={() => toggleDropdown('newPeople')}
          className="flex items-center justify-center w-8 h-8 text-white rounded-full hover:bg-[#3D3D3D] focus:outline-none bg-[#2D2D2D]"
          title="Add People"
        >
          <i className="ri-user-add-line"></i>
        </button>
        
        {/* Add People Dropdown - positioned to prevent overflow */}
        {showNewPeople && (
          <div className="absolute top-full right-0 mt-1 w-64 bg-[#1F1F1F] border border-[#5D5D5D] rounded-md shadow-lg z-50">
            <div className="p-2 border-b border-[#5D5D5D]">
              <h3 className="text-white font-medium">Add to Project</h3>
            </div>
            {/* <div className="p-2 border-b border-[#5D5D5D]">
              <input
                type="text"
                placeholder="Search people..."
                className="w-full p-2 bg-[#111927] text-white rounded border border-[#5D5D5D] focus:outline-none focus:border-[#6e54b5]"
              />
            </div> */}
            <ul className="max-h-48 overflow-y-auto">
              {nonCollaborators.map(person => (
                <li key={person.id} className="p-2 hover:bg-[#293957] border-b border-[#5D5D5D] last:border-b-0">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-white text-sm mr-2">
                      {person.avatar}
                    </div>
                    <span className="text-white text-sm">{person.email}</span>
                    <button onClick={() => addCollaborators(person)} className="ml-auto text-xs bg-[#C84F19] text-white px-2 py-1 rounded hover:bg-[#5d47a1]">
                      Add
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectButtons;