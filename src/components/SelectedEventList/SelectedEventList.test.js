import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { EventsContext } from "context/EventsContext";
import SelectedEvents from ".";

const mockSelectedEvents = [
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

const renderComponent = (selectedEvents = []) => {
  const state = { selectedEvents };

  return render(
    <EventsContext.Provider value={{ state }}>
      <SelectedEvents />
    </EventsContext.Provider>
  );
};

test('displays "Selected Events" heading', () => {
  renderComponent();
  expect(screen.getByText(/selected events/i)).toBeInTheDocument();
});

test("displays no events when selectedEvents is empty", () => {
  renderComponent();
  expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
});

test("displays selected events", () => {
  renderComponent(mockSelectedEvents);

  mockSelectedEvents.forEach((event) => {
    expect(screen.getByText(event.event_name)).toBeInTheDocument();
  });
});
