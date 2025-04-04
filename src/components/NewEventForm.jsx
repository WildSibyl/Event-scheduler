import { useState } from "react";
import { storeEvent } from "../modules/store";
import { Link, useNavigate } from "react-router";

const NewEventForm = () => {
  const navigate = useNavigate();
  const [warning, setWarning] = useState(""); //used to popup warning to avoid the same date
  const [eventFormData, setEventFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // prevents emptying fields

    let checkWarning = storeEvent(eventFormData); // call store function
    if (checkWarning) {
      setWarning(checkWarning);
      return;
    }
    // reset fields to empty after successfully storing
    setEventFormData({ title: "", date: "", location: "", description: "" });
    navigate("/"); // Redirect to home page after successful event creation
    checkWarning = "";
    setWarning(checkWarning);
    // console.log(`warning ${warning}`);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-blue-200">
      <div className="bg-gradient-to-r from-blue-200 to-blue-500 shadow-blue-800/80 shadow-2xl p-4 sm:p-6 rounded-lg w-full max-w-lg sm:max-w-xl md:max-w-2xl">
        {/* Komunikat ostrzegawczy */}
        {warning && (
          <div className="bg-gradient-to-r from-red-500 to-red-300 text-red-900 p-3 sm:p-4 mb-4 rounded">
            <p className="font-semibold text-sm sm:text-base">Warning:</p>
            <p className="text-sm sm:text-base">{warning}</p>
          </div>
        )}

        {/* Nagłówek */}
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">
          Your Event
        </h1>

        {/* Formularz */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
            <label className="w-full sm:w-24 text-base sm:text-lg font-medium text-black">
              Title
            </label>
            <input
              type="text"
              className="flex-1 p-2  text-black border border-gray-300 rounded bg-gray-200 text-sm sm:text-base"
              placeholder="Enter title"
              required
              name="title"
              onChange={handleChange}
              value={eventFormData.title}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
            <label className="w-full sm:w-24 text-base sm:text-lg font-medium text-black">
              Date
            </label>
            <input
              type="date"
              className="flex-1 p-2 text-black  border border-gray-300 rounded bg-gray-200 text-sm sm:text-base"
              required
              name="date"
              onChange={handleChange}
              value={eventFormData.date}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
            <label className="w-full sm:w-24 text-base sm:text-lg font-medium text-black">
              Location
            </label>
            <input
              type="text"
              className="flex-1 p-2 text-black border border-gray-300 rounded bg-gray-200 text-sm sm:text-base"
              placeholder="Enter the event's location"
              required
              name="location"
              onChange={handleChange}
              value={eventFormData.location}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
            <label className="w-full sm:w-24 text-base sm:text-lg font-medium text-black">
              Latitude
            </label>
            <input
              type="text"
              className="flex-1 p-2 text-black border border-gray-300 rounded bg-gray-200 text-sm sm:text-base"
              placeholder="Enter the event's latitude"
              required
              name="latitude"
              onChange={handleChange}
              value={eventFormData.latitude}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
            <label className="w-full sm:w-24 text-base sm:text-lg font-medium text-black">
              Longitude
            </label>
            <input
              type="text"
              className="flex-1 p-2 text-black border border-gray-300 rounded bg-gray-200 text-sm sm:text-base"
              placeholder="Enter the event's longitude"
              required
              name="longitude"
              onChange={handleChange}
              value={eventFormData.longitude}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4 space-y-2 sm:space-y-0">
            <label className="w-full sm:w-24 text-base sm:text-lg font-medium text-black">
              Content
            </label>
            <textarea
              className="flex-1 p-2 text-black border border-gray-300 rounded bg-gray-200 h-24 sm:h-32 resize-none text-sm sm:text-base"
              placeholder="Enter description"
              required
              name="description"
              onChange={handleChange}
              value={eventFormData.description}
            />
          </div>

          <div className="flex flex-col justify-center">
            <button
              type="submit"
              onClick={() => {
                if (
                  eventFormData.title &&
                  eventFormData.date &&
                  eventFormData.location &&
                  eventFormData.longitude &&
                  eventFormData.latitude &&
                  eventFormData.description
                ) {
                  navigate("/");
                }
              }}
              className="bg-blue-600 shadow-md hover:bg-blue-300 hover:shadow-lg transition duration-300 text-white font-medium py-2 mx-auto sm:px-6 text-sm sm:text-base rounded-full"
            >
              Submit
            </button>
            <div>
              <Link
                to="/"
                className="text-blue-700 hover:text-blue-100 mb-4 inline-block font-semibold"
              >
                ← Back to home page
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default NewEventForm;
