export const convertTo12HourFormat = (dateString) => {
  const date = new Date(dateString);

  let hours = date.getHours();
  const minutes = date.getMinutes();

  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${formattedMinutes} ${period}`;
};
