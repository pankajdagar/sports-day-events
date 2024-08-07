import EventContainer from "components/EventContainer";
import "./App.css";
import { EventsProvider } from "context/EventsContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <EventsProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <main className="main-container">
        <header>
          <h1 className="text-center">Welcome to Sports Day</h1>
          <h3 className="text-center">
            Please select the event you'd like to participate in.
          </h3>
        </header>
        <section>
          <EventContainer />
        </section>
      </main>
    </EventsProvider>
  );
}

export default App;
