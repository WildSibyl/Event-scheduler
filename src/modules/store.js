const storeEvent = (formData) => {
  const retrieveEvent = JSON.parse(localStorage.getItem("eventItems")) || [];
  const checkDate = formData.date;
  let checkFlag = false;
  retrieveEvent.forEach((item) => {
    if (item.date === checkDate) checkFlag = true; //checking if post with such date already axists
  });
  if (!checkFlag) {
    const updatedEvent = [...retrieveEvent, formData];
    localStorage.setItem("eventItems", JSON.stringify(updatedEvent));
    return "";
  } else {
    return `Post with such date ${checkDate} already exists`; //warning popup message
  }
};
export { storeEvent };
