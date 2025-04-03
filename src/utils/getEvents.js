import { useState, useEffect } from "react";

const server = "http://localhost:3001";
const pass =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ1c2VyQGV4YW1wbGUxMi5jb20iLCJpYXQiOjE3NDM1MTk1OTMsImV4cCI6MTc0NzExOTU5M30.yBtTbn30BH4ItApmhBgOAVvm7fUod_77fhWdc_kWrss";

const getEvents = async () => {
  try {
    const response = await fetch(`${server}/api/events?page=1&limit=150`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Error status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Success:", data.results);
    return data.results;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

const useEvent = (eventId) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId) {
        setLoading(false);
        setError("No event ID provided");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${server}/api/events/${eventId}`, {
          method: "GET",
          // headers: {
          //   "Content-Type": "application/json",
          //   Authorization: `Bearer ${pass}`,
          // },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
        setError("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  return { event, loading, error };
};

export { getEvents, useEvent };
