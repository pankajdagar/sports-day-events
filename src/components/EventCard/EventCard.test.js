import React from "react";
import { screen, fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { EventsContext } from "context/EventsContext";
import { selectEvent, deselectEvent } from "context/actions";
import EventCard from ".";

jest.mock("context/actions");

const mockEvent = {
  id: 1,
  event_name: "Butterfly 100M",
  event_category: "Swimming",
  start_time: "2022-12-17 13:00:00",
  end_time: "2022-12-17 14:00:00",
};

const renderComponent = (props = {}) => {
  const dispatch = jest.fn();

  render(
    <EventsContext.Provider value={{ dispatch }}>
      <EventCard
        event={mockEvent}
        isSelected={false}
        isConflicting={false}
        showSelectedTag={false}
        {...props}
      />
    </EventsContext.Provider>
  );

  return { dispatch };
};

test("displays event details", () => {
  renderComponent();

  expect(screen.getByText(/Butterfly 100M/i)).toBeInTheDocument();
  expect(screen.getByText(/Swimming/i)).toBeInTheDocument();
  expect(screen.getByText(/1 PM - 2 PM/i)).toBeInTheDocument();
});

test("displays select button when event is not selected", () => {
  renderComponent();

  expect(screen.getByText(/select/i)).toBeInTheDocument();
});

test("calls selectEvent when select button is clicked", () => {
  const { dispatch } = renderComponent();

  fireEvent.click(screen.getByText(/select/i));
  expect(dispatch).toHaveBeenCalledWith(selectEvent(mockEvent.id));
});

test("displays remove button when event is selected", () => {
  renderComponent({ isSelected: true });

  expect(screen.getByText(/remove/i)).toBeInTheDocument();
});

test("calls deselectEvent when remove button is clicked", () => {
  const { dispatch } = renderComponent({ isSelected: true });

  fireEvent.click(screen.getByText(/remove/i));
  expect(dispatch).toHaveBeenCalledWith(deselectEvent(mockEvent.id));
});

test("displays selected tag when showSelectedTag and isSelected are true", () => {
  renderComponent({ isSelected: true, showSelectedTag: true });

  expect(screen.getByText(/selected/i)).toBeInTheDocument();
});

test("adds disabled class to select button when event is conflicting", () => {
  renderComponent({ isConflicting: true });

  const selectButton = screen.getByText(/select/i);
  expect(selectButton).toHaveClass("disabled");
});
