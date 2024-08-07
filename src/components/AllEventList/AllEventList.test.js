import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { EventsContext } from "context/EventsContext";
import AllEventList from ".";

const mockEvents = [
  {
    id: 1,
    event_name: "Butterfly 100M",
    event_category: "Swimming",
    start_time: "2022-12-17 13:00:00",
    end_time: "2022-12-17 14:00:00",
  },
  {
    id: 2,
    event_name: "Backstroke 100M",
    event_category: "Swimming",
    start_time: "2022-12-17 13:30:00",
    end_time: "2022-12-17 14:30:00",
  },
];

const mockFetchEventsData = jest.fn();

const renderComponent = (stateOverrides = {}) => {
  const state = {
    events: mockEvents,
    selectedEvents: [],
    error: null,
    loading: false,
    selectedEventIds: {},
    ...stateOverrides,
  };

  render(
    <EventsContext.Provider
      value={{ state, fetchEventsData: mockFetchEventsData }}
    >
      <AllEventList />
    </EventsContext.Provider>
  );
};

test("displays loading shimmers when loading", () => {
  renderComponent({ loading: true });

  const shimmers = screen.getAllByTestId("shimmer");
  expect(shimmers).toHaveLength(3);
});

test("displays error message and retry button on error", () => {
  renderComponent({ error: "Error fetching events" });

  expect(screen.getByText(/error fetching events/i)).toBeInTheDocument();
  expect(screen.getByText(/retry/i)).toBeInTheDocument();
});

test("calls fetchEventsData when retry button is clicked", () => {
  renderComponent({ error: "Error fetching events" });

  fireEvent.click(screen.getByText(/retry/i));
  expect(mockFetchEventsData).toHaveBeenCalledTimes(1);
});

test("displays events when not loading and no error", () => {
  renderComponent();

  expect(screen.getByText(/Butterfly 100M/i)).toBeInTheDocument();
  expect(screen.getByText(/Backstroke 100M/i)).toBeInTheDocument();
});

test("does not display selected events", () => {
  renderComponent({
    selectedEventIds: { 1: true },
  });

  expect(screen.queryByText(/Butterfly 100M/i)).not.toBeInTheDocument();
  expect(screen.getByText(/Backstroke 100M/i)).toBeInTheDocument();
});
