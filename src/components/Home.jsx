import EventEntries from "../components/EventEntries";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext"; // Import the AuthContext
import { getEvents } from "../utils/getEvents.js";

export const Home = () => {
  const { user, login, logout } = useContext(AuthContext); // Get user and logout from context
  const [eventEntries, setEventEntries] = useState([]);
  // use navigate for login

  const navigate = useNavigate();

  // Function to fetch event entries from API
  const fetchEventEntries = async () => {
    // Sort entries by date (assuming date is in "YYYY-MM-DD" format)
    //storedEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
    const events = await getEvents();
    console.log("events in home fetching", events);

    setEventEntries(events);
  };

  const deleteCard = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      // Update UI after successful deletion
      setEventEntries((prevEntries) =>
        prevEntries.filter((entry) => entry._id !== id)
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchEventEntries();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-400 to-purple-200">
      {/* Header */}
      <header className="text-white bg-purple-400 py-4 text-3xl font-bold shadow-md flex justify-around items-center sticky top-0 md:flex-row sm:flex-col">
        <span>My Event App</span>
        {user ? (
          <>
            <button
              className="bg-white text-gray-800 rounded-2xl shadow-md px-8 py-2 flex items-center cursor-pointer hover:bg-purple-200 hover:shadow-lg transition duration-300 ease-in-out md:mt-0 sm:mt-4"
              onClick={() => navigate("/new-event")}
            >
              <span className="font-bold text-xxl">Create Event</span>
            </button>
            <button
              className="bg-white text-gray-800 rounded-2xl shadow-md px-8 py-2 cursor-pointer hover:bg-red-200 transition duration-300"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-gray-800 rounded-2xl shadow-md px-8 py-2 flex items-center cursor-pointer hover:bg-purple-200 hover:shadow-lg transition duration-300 ease-in-out md:mt-0 sm:mt-4"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-white text-gray-800 rounded-2xl shadow-md px-8 py-2 flex items-center cursor-pointer hover:bg-purple-200 hover:shadow-lg transition duration-300 ease-in-out md:mt-0 sm:mt-4"
            >
              Signup
            </button>
          </>
        )}
      </header>

      <main className="flex-grow ">
        <div className="mt-4 h-[900px] overflow-y-scroll rounded-lg shadow-inner p-4 scrollbar scrollbar-thumb-purple-500 scrollbar-track-purple-200">
          <EventEntries eventEntries={eventEntries} deleteCard={deleteCard} />
        </div>
      </main>

      {/* Footer */}
      <footer className="text-gray-800 py-2 mt-4 shadow-md text-center">
        © 2025 My Event App. All rights reserved.
      </footer>
    </div>
  );
};
