import image from "../assets/images.jpeg";
import Modal from "../components/Modal";
import EventEntries from "../components/EventEntries";
import React, { useState, useEffect } from "react";
import pencilIcon from "../assets/pencil.png"; // Import the pencil icon

export const Home = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [eventEntries, setEventEntries] = useState([]);

  // Function to fetch event entries from localStorage
  const fetchEventEntries = () => {
    const storedEntries = JSON.parse(localStorage.getItem("eventItems")) || [];
    // Sort entries by date (assuming date is in "YYYY-MM-DD" format)
    storedEntries.sort((a, b) => new Date(b.date) - new Date(a.date));

    setEventEntries(storedEntries);
  };

  const deleteCard = (date) => {
    const updatedEvent = eventEntries.filter((entry) => entry.date !== date);
    localStorage.setItem("eventItems", JSON.stringify(updatedEvent));
    setEventEntries(updatedEvent);
  };

  // Fetch entries when the component mounts
  useEffect(() => {
    fetchEventEntries();
  }, [addOpen]); //whenever addOpen changes, fetchEventEntries will run

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-400 to-purple-200">
      {/* Header */}
      <header className="text-white bg-purple-400 py-4 text-3xl font-bold shadow-md flex justify-around items-center sticky top-0 md:flex-row sm:flex-col">
        <span>My Event App</span>

        <button
          className="bg-white text-gray-800 rounded-2xl shadow-md px-8 py-2 flex items-center gap-4 cursor-pointer hover:bg-purple-200 hover:shadow-lg transition duration-300 ease-in-out md:mt-0 sm:mt-4"
          onClick={() => setAddOpen((prev) => !prev)}
        >
          <img src={pencilIcon} alt="Pencil Icon" className="w-15 h-15" />
          <span className="font-bold text-xxl"> Add New</span>
        </button>
        <Modal add={addOpen} changeAdd={setAddOpen} />
      </header>

      <main className="flex-grow ">
        <div className="mt-4 rounded-lg px-[10%]">
          <img
            src={image}
            alt="image"
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>

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
