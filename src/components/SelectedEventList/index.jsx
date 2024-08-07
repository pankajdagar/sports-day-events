import React, { useContext } from "react";
import { EventsContext } from "context/EventsContext";
import EventCard from "components/EventCard";

const SelectedEvents = () => {
  const { state } = useContext(EventsContext);
  const { selectedEvents } = state;

  return (
    <div className="selected-events">
      <h2 className="text-center">Selected Events</h2>
      <div className="events-container">
        {selectedEvents.map((event) => (
          <EventCard key={event.id} event={event} isSelected />
        ))}
      </div>
    </div>
  );
};

export default SelectedEvents;
