import { useContext } from "react";
import EventCard from "components/EventCard";
import Shimmer from "components/Shimmer";
import { EventsContext } from "context/EventsContext";
import { checkForTimeConficts } from "utils/appUtils";

const AllEventList = () => {
  const { state, fetchEventsData } = useContext(EventsContext);
  const { events, selectedEvents, error, loading, selectedEventIds } = state;

  const checkConflict = (event) => {
    return checkForTimeConficts(selectedEvents, event);
  };

  return (
    <div className="all-events">
      <h2 className="text-center">All Events</h2>
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
            .filter((event) => !selectedEventIds.hasOwnProperty(event.id))
            .map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isSelected={selectedEvents.some((e) => e.id === event.id)}
                isConflicting={checkConflict(event)}
                showSelectedTag={true}
              />
            ))}
      </div>
    </div>
  );
};

export default AllEventList;
