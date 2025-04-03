const storeEvent = async (formData) => {
  try {
    // Send a POST request to your API
    const response = await fetch("http://localhost:3001/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if needed
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create event");
    }

    return ""; // No error, event created successfully
  } catch (error) {
    return error.message; // Return error message if request fails
  }
};

export { storeEvent };
