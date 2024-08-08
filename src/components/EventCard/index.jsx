import React, { useContext } from "react";
import "./EventCard.css";
import { EventsContext } from "context/EventsContext";
import { deselectEvent, selectEvent } from "context/actions";
import { convertTo12HourFormat } from "utils/dateUtils";

const EventCard = ({
  event,
  isSelected = false,
  isConflicting = false,
  showSelectedTag = false,
}) => {
  const { dispatch } = useContext(EventsContext);

  return (
    <div
      className={`event-card-container ${isSelected ? "selected" : ""} ${
        !isSelected && isConflicting ? "conflicting" : ""
      }`}
    >
      <div className="event-category-identifier">
        {event.event_category.charAt(0)}
      </div>
      <div className="vertical-divider"></div>
      <div className="event-info">
        <div className="event-details">
          <div className="event-name">{event.event_name}</div>
          <div className="event-category">({event.event_category})</div>
          <div className="event-timing">
            {`${convertTo12HourFormat(
              event.start_time
            )} - ${convertTo12HourFormat(event.end_time)}`}
          </div>
        </div>
        <div>
          {isSelected ? (
            <button
              className="remove"
              onClick={() => dispatch(deselectEvent(event.id))}
            >
              Remove
            </button>
          ) : (
            <button
              className={isConflicting ? "disabled" : ""}
              onClick={() => dispatch(selectEvent(event.id))}
            >
              Select
            </button>
          )}
        </div>
      </div>
      {showSelectedTag && isSelected && (
        <div className="selected-tag">Selected</div>
      )}
    </div>
  );
};

export default EventCard;
