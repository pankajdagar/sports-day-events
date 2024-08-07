import EventList from "components/AllEventList";
import SelectedEvents from "components/SelectedEventList";
import "./EventContainer.css";

const EventContainer = () => {
  return (
    <div className="events-list-container">
      <EventList />
      <SelectedEvents />
    </div>
  );
};

export default EventContainer;
