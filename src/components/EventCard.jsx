import { useParams, Link } from "react-router";
import { useEvent } from "../utils/getEvents";

const EventCard = () => {
  const { eventId } = useParams();
  const { event, loading, error } = useEvent(eventId);

  if (loading) {
    return <div className="p-4 text-white">Loading event data...</div>;
  }

  if (error || !event) {
    return (
      <div className="p-4">
        <div className="mt-4 bg-gradient-to-r from-red-500 to-red-300 text-red-900 p-3 sm:p-4 mb-4 rounded font-semibold">
          <Link to="/" className="mb-4 inline-block">
            ← Back to home page error occured
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-400 to-blue-200">
      <div className="p-4">
        <div>
          <Link
            to="/"
            className="text-blue-700 hover:text-blue-100 mb-4 inline-block font-semibold"
          >
            ← Back to home page
          </Link>
        </div>
        <div className="flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-blue-200 to-blue-300 p-8 rounded-xl shadow-2xl max-w-md w-full text-center transform transition-all duration-300 hover:scale-105">
            <h3 className="text-3xl font-extrabold text-gray-800 mb-4 tracking-wide">
              {event.title}
            </h3>
            <p className="text-lg text-gray-700 font-semibold mb-3">
              {event.date.split("T")[0]}
            </p>
            <p className="text-md text-gray-600 italic mb-4">
              {event.description}
            </p>
            <p className="text-md text-gray-600 font-medium mb-2">
              Location: {event.location}
            </p>
            <p className="text-md text-gray-600 font-medium">
              Coordinates: {event.latitude}, {event.longitude}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
