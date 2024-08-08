import { useContext, useState } from "react";
import EventCard from "components/EventCard";
import Shimmer from "components/Shimmer";
import { EventsContext } from "context/EventsContext";
import { checkForTimeConficts } from "utils/appUtils";
import "./AllEventList.css";

const AllEventList = () => {
  const { state, fetchEventsData } = useContext(EventsContext);
  const { events, selectedEvents, error, loading, selectedEventIds } = state;
  const [hideSelected, setHideSelected] = useState(true);

  const checkConflict = (event) => {
    return checkForTimeConficts(selectedEvents, event);
  };

  const handleCheckboxChange = () => {
    setHideSelected((prev) => !prev);
  };

  return (
    <div className="all-events">
      <h2 className="text-center">All Events</h2>
      <div className="hide-selected-checkbox">
        <input
          type="checkbox"
          checked={hideSelected}
          onChange={handleCheckboxChange}
          data-testid="hide-selected-checkbox"
        />
        <span>Hide selected events</span>
      </div>
      {error && (
        <div className="error text-center">
          <p>{error}</p>
          <button onClick={fetchEventsData}>
            {!loading ? "Retry" : "Retrying..."}
          </button>
        </div>
      )}
      <div className="events-container">
        {loading && (
          <>
            <Shimmer />
            <Shimmer />
            <Shimmer />
          </>
        )}
        {!error &&
          !loading &&
          events
            .filter((event) =>
              hideSelected ? !selectedEventIds.hasOwnProperty(event.id) : true
            )
            .map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isSelected={
                  !hideSelected
                    ? selectedEventIds.hasOwnProperty(event.id)
                    : false
                }
                isConflicting={checkConflict(event)}
                showSelectedTag={true}
              />
            ))}
      </div>
    </div>
  );
};

export default AllEventList;
