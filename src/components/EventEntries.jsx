import React, { useState } from "react";
import deleteIcon from "../assets/trash.png";

const EventEntries = ({ eventEntries, deleteCard }) => {
  console.log(eventEntries);
  const [selectedEntry, setSelectedEntry] = useState("");

  const handleCardClick = (entry) => {
    setSelectedEntry(entry);
  };

  const closeModal = () => {
    setSelectedEntry("");
  };

  return (
    <>
      <div className="mt-8 text-left space-y-4 mx-auto">
        {eventEntries.length > 0 ? (
          eventEntries.map((entry, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-lg flex items-center cursor-pointer transition duration-300 ease-in-out hover:shadow-xl hover:bg-purple-200 lg:flex-row sm:flex-col ml-[10%] mr-[9%]"
              onClick={() => handleCardClick(entry)} /* Open modal on click*/
            >
              <img
                src={entry.imageUrl}
                alt="Entry"
                className="max-w-72 h-40 rounded-lg md:mr-10 sm:mr-0"
              />
              <div className="flex justify-between w-full">
                <div className="flex flex-col">
                  <h2 className="font-bold text-3xl">{entry.title}</h2>
                  <p className="font-semibold text-2xl mt-2">{entry.date}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); /* Prevent modal from opening*/
                    deleteCard(entry.date);
                  }}
                  className="bg-gray-100 rounded-lg p-2 mt-4 hover:bg-red-300 transition duration-300 ease-in-out cursor-pointer"
                >
                  <img
                    src={deleteIcon}
                    alt="Delete button"
                    className="w-[30px] self-start"
                  />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No event entries yet.</p>
        )}
      </div>

      {selectedEntry && (
        <div
          className="fixed inset-0 bg-gradient-to-b from-purple-400 to-purple-200 p-4 bg-opacity-50 flex justify-center items-center" /* Modal*/
          onClick={closeModal} /*Close modal when clicking on the purple area*/
        >
          <div
            className="bg-white p-6 rounded shadow-lg w-[70%] relative"
            onClick={
              (e) =>
                e.stopPropagation() /*Prevent closing when clicking inside the modal*/
            }
          >
            <p className="text-sm text-gray-600 text-center mb-4">
              {selectedEntry.date}
            </p>
            <img
              src={selectedEntry.imageUrl}
              alt={selectedEntry.title}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-xl font-bold mt-4 text-center">
              {selectedEntry.title}
            </h2>
            <p className="mt-4 text-justify">{selectedEntry.content}</p>
            <div className="flex justify-around">
              <button
                className="bg-purple-500 text-white px-4 py-2 rounded mt-6 hover:bg-purple-600 transition duration-300" /* Save Button at the Bottom */
                onClick={closeModal}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventEntries;
