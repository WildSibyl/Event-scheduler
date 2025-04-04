import React, { useState } from "react";
import deleteIcon from "../assets/trash.png";
import { Link } from "react-router";

const EventEntries = ({ eventEntries, deleteCard, setBin }) => {
  const [selectedEntry, setSelectedEntry] = useState(null);

  const handleCardClick = (entry) => {
    setSelectedEntry(entry);
  };

  return (
    <>
      <div className="mt-8 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {eventEntries.map((entry) => (
            <div
              key={entry.id}
              className="relative bg-gradient-to-b from-blue-100 to-blue-200 p-4 rounded-lg shadow-md flex flex-col items-center justify-between h-50 w-50 mx-auto cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl hover:from-blue-200 hover:to-blue-300"
              onClick={() => handleCardClick(entry)}
            >
              <div className="text-center space-y-2">
                <h2 className="font-bold text-lg text-gray-800 line-clamp-2 w-[75%] mx-auto">
                  {entry.title}
                </h2>
                <p className="font-semibold text-sm text-gray-600">
                  {entry.date.split("T")[0]}
                </p>
                <p className="text-xs text-gray-700 line-clamp-3">
                  {entry.description}
                </p>
              </div>
              <div className="">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteCard(entry.id);
                    setBin((prev) => !prev);
                  }}
                  className="bg-gray-100 rounded-full p-2 mt-2 hover:bg-red-300 transition duration-300 ease-in-out cursor-pointer absolute top-0 right-2"
                >
                  <img
                    src={deleteIcon}
                    alt="Delete button"
                    className="w-[15px] self-start"
                  />
                </button>
              </div>
              <div>
                <Link
                  to={`/${entry.id}`}
                  className="text-blue-700 hover:text-blue-100 font-medium "
                >
                  More details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EventEntries;
