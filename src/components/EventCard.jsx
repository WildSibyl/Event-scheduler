const EventCard = ({ entry, onClick }) => {
  return (
    <div
      className="card bg-purple-100 p-4 rounded shadow-md cursor-pointer "
      onClick={() => onClick(entry)}
    >
      <img
        src={entry.formData.imageUrl}
        alt={entry.formData.title}
        className="w-full h-32 object-cover rounded"
      />
      <h3 className="text-lg font-bold mt-2">{entry.formData.title}</h3>
      <p className="text-sm text-gray-600">{entry.formData.date}</p>
    </div>
  );
};

export default EventCard;
