// src/components/Sidebar.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMenuData } from '../services/apiService';

const Sidebar = () => {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [expandedCompetitions, setExpandedCompetitions] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getMenuData = async () => {
      const data = await fetchMenuData();
      const structuredData = structureMenuData(data);
      setMenuData(structuredData);
      setLoading(false);
    };

    getMenuData();
  }, []);

  const structureMenuData = (data) => {
    const structuredData = {};
    const eventIds = new Set();
    data.forEach(item => {
      if (!eventIds.has(item.eventid)) {
        eventIds.add(item.eventid);
        if (!structuredData[item.eventTypeName]) {
          structuredData[item.eventTypeName] = {};
        }
        if (!structuredData[item.eventTypeName][item.competitionName]) {
          structuredData[item.eventTypeName][item.competitionName] = [];
        }
        structuredData[item.eventTypeName][item.competitionName].push(item);
      }
    });
    return structuredData;
  };

  const toggleMenu = (menuName) => {
    setExpandedMenus(prevState => ({
      ...prevState,
      [menuName]: !prevState[menuName]
    }));
  };

  const toggleCompetition = (eventTypeName, competitionName) => {
    setExpandedCompetitions(prevState => ({
      ...prevState,
      [eventTypeName]: {
        ...prevState[eventTypeName],
        [competitionName]: !prevState[eventTypeName]?.[competitionName]
      }
    }));
  };

  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  if (loading) {
    return <div className="bg-gray-800 text-white w-64 p-4 h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-800 text-white w-64 p-4 h-screen overflow-auto">
      <nav>
        <ul>
          {Object.keys(menuData).map(eventTypeName => (
            <li key={eventTypeName}>
              <div className="p-2 text-sm hover:bg-gray-700 cursor-pointer" onClick={() => toggleMenu(eventTypeName)}>
                {eventTypeName}
              </div>
              {expandedMenus[eventTypeName] && (
                <ul className="pl-4 text-sm">
                  {Object.keys(menuData[eventTypeName]).map(competitionName => (
                    <li key={competitionName}>
                      <div className="p-2 pl-6 hover:bg-gray-700 cursor-pointer" onClick={() => toggleCompetition(eventTypeName, competitionName)}>
                        {competitionName}
                      </div>
                      {expandedCompetitions[eventTypeName]?.[competitionName] && (
                        <ul className="pl-8 text-sm">
                          {menuData[eventTypeName][competitionName].map(event => (
                            <li key={event.eventid} className="p-2 pl-10 hover:bg-gray-700 flex items-center text-sm cursor-pointer" onClick={() => handleEventClick(event.eventid)}>
                              {event.eventname}
                              {event.inPlay && <span className="bg-green-500 h-2 w-2 rounded-full ml-2"></span>}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
