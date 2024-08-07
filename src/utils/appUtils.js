export const checkForTimeConficts = (selectedEvents, eventToCheck) => {
  return selectedEvents.some(
    (currEvent) =>
      (eventToCheck.start_time >= currEvent.start_time &&
        eventToCheck.start_time < currEvent.end_time) ||
      (eventToCheck.end_time > currEvent.start_time &&
        eventToCheck.end_time <= currEvent.end_time)
  );
};
