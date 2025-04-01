import { useState } from "react";
import { storeEvent } from "../modules/store";
const Modal = ({ add, changeAdd }) => {
  const [warning, setWarning] = useState(""); //used to popup warning to avoid the same date
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    imageUrl: "",
    content: "",
  });

  if (!add) {
    return null;
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // prevents emptying fields

    let checkWarning = storeEvent(formData); // call store function
    if (checkWarning) {
      setWarning(checkWarning);
      return;
    }
    // reset fields to empty after successfully storing
    setFormData({ title: "", date: "", imageUrl: "", content: "" });
    changeAdd(false); // close modal after submit
    checkWarning = "";
    setWarning(checkWarning);
    // console.log(`warning ${warning}`);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-r from-[#ffffff] to-[#f1c0ff] shadow-purple-800/80 shadow-2xl p-4 sm:p-6 rounded-lg w-full max-w-lg sm:max-w-xl md:max-w-2xl">
        {/* Komunikat ostrzegawczy */}
        {warning && (
          <div className="bg-gradient-to-r from-[#f1c0ff] to-[#ffffff] text-purple-900 p-3 sm:p-4 mb-4 rounded">
            <p className="font-semibold text-sm sm:text-base">Warning:</p>
            <p className="text-sm sm:text-base">{warning}</p>
          </div>
        )}

        {/* Nagłówek */}
        <h1 className="text-xl sm:text-2xl font-bold text-yellow-800 mb-4 text-center">
          CREATE NEW EVENT
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
              value={formData.title}
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
              value={formData.date}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
            <label className="w-full sm:w-24 text-base sm:text-lg font-medium text-black">
              Image URL
            </label>
            <input
              type="url"
              className="flex-1 p-2 text-black border border-gray-300 rounded bg-gray-200 text-sm sm:text-base"
              placeholder="Enter image URL "
              name="imageUrl"
              onChange={handleChange}
              value={formData.imageUrl}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4 space-y-2 sm:space-y-0">
            <label className="w-full sm:w-24 text-base sm:text-lg font-medium text-black">
              Content
            </label>
            <textarea
              className="flex-1 p-2 text-black border border-gray-300 rounded bg-gray-200 h-24 sm:h-32 resize-none text-sm sm:text-base"
              placeholder="Enter content"
              required
              name="content"
              onChange={handleChange}
              value={formData.content}
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-purple-600 shadow-md hover:bg-purple-300 hover:shadow-lg transition duration-300 text-white font-medium py-2 px-4 sm:px-6 rounded text-sm sm:text-base"
            >
              Submit
            </button>
          </div>
        </form>
        <button
          onClick={() => {
            changeAdd((prev) => !prev);
          }}
          className="bg-purple-600 shadow-md hover:bg-purple-300 hover:shadow-lg transition duration-300 text-white font-medium my-4 py-1 px-3 sm:px-3 rounded text-sm sm:text-base"
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default Modal;
