import { eventsReducer, initialState } from "./reducer";
import {
  SET_EVENTS,
  SET_ERROR,
  SELECT_EVENT,
  DESELECT_EVENT,
  SET_LOADING,
  SET_ALL_SELECTED_EVENTS,
} from "./actions";
import toast from "react-hot-toast";
import { SELECTED_EVENT_ID_LS_KEY } from "constants";

jest.mock("react-hot-toast", () => ({
  error: jest.fn(),
}));

describe("eventsReducer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    jest.spyOn(Storage.prototype, "setItem");
    Storage.prototype.setItem = jest.fn();
  });

  it("should return the initial state", () => {
    expect(eventsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle SET_LOADING", () => {
    const action = { type: SET_LOADING, payload: true };
    const expectedState = { ...initialState, loading: true };
    expect(eventsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle SET_EVENTS", () => {
    const events = [{ id: 1, event_name: "Event 1" }];
    const action = { type: SET_EVENTS, payload: events };
    const expectedState = { ...initialState, events };
    expect(eventsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle SET_ERROR", () => {
    const error = "An error occurred";
    const action = { type: SET_ERROR, payload: error };
    const expectedState = { ...initialState, error };
    expect(eventsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle SELECT_EVENT without conflicts", () => {
    const initialStateWithEvents = {
      ...initialState,
      events: [
        {
          id: 1,
          event_name: "Butterfly 100M",
          event_category: "Swimming",
          start_time: "2022-12-17 13:00:00",
          end_time: "2022-12-17 14:00:00",
        },
      ],
    };
    const action = { type: SELECT_EVENT, payload: 1 };
    const expectedState = {
      ...initialStateWithEvents,
      selectedEvents: [initialStateWithEvents.events[0]],
      selectedEventIds: { 1: true },
    };
    expect(eventsReducer(initialStateWithEvents, action)).toEqual(
      expectedState
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      SELECTED_EVENT_ID_LS_KEY,
      JSON.stringify({ 1: true })
    );
  });

  it("should handle SELECT_EVENT with conflicts", () => {
    const initialStateWithEvents = {
      ...initialState,
      events: [
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
      ],
      selectedEvents: [
        {
          id: 2,
          event_name: "Backstroke 100M",
          event_category: "Swimming",
          start_time: "2022-12-17 13:30:00",
          end_time: "2022-12-17 14:30:00",
        },
      ],
    };
    const action = { type: SELECT_EVENT, payload: 1 };
    const expectedState = initialStateWithEvents;

    expect(eventsReducer(initialStateWithEvents, action)).toEqual(
      expectedState
    );
    expect(toast.error).toHaveBeenCalledWith(
      "This event's time conflicts with an already selected event.",
      {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      }
    );
  });

  it("should handle SELECT_EVENT with maximum selected events", () => {
    const initialStateWithSelectedEvents = {
      ...initialState,
      selectedEvents: [
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
        {
          id: 3,
          event_name: "Freestyle 400M",
          event_category: "Swimming",
          start_time: "2022-12-17 15:00:00",
          end_time: "2022-12-17 16:00:00",
        },
      ],
      selectedEventIds: { 1: true, 2: true, 3: true },
    };
    const action = { type: SELECT_EVENT, payload: 4 };
    const expectedState = initialStateWithSelectedEvents;

    expect(eventsReducer(initialStateWithSelectedEvents, action)).toEqual(
      expectedState
    );
    expect(toast.error).toHaveBeenCalledWith(
      "You can select a maximum of 3 events.",
      {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      }
    );
  });

  it("should handle DESELECT_EVENT", () => {
    const initialStateWithSelectedEvents = {
      ...initialState,
      selectedEvents: [
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
      ],
      selectedEventIds: { 1: true, 2: true },
    };
    const action = { type: DESELECT_EVENT, payload: 1 };
    const expectedState = {
      ...initialStateWithSelectedEvents,
      selectedEvents: [
        {
          id: 2,
          event_name: "Backstroke 100M",
          event_category: "Swimming",
          start_time: "2022-12-17 13:30:00",
          end_time: "2022-12-17 14:30:00",
        },
      ],
      selectedEventIds: { 2: true },
    };
    expect(eventsReducer(initialStateWithSelectedEvents, action)).toEqual(
      expectedState
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      SELECTED_EVENT_ID_LS_KEY,
      JSON.stringify({ 2: true })
    );
  });

  it("should handle SET_ALL_SELECTED_EVENTS", () => {
    const selectedEvents = [
      {
        id: 1,
        event_name: "Butterfly 100M",
        event_category: "Swimming",
        start_time: "2022-12-17 13:00:00",
        end_time: "2022-12-17 14:00:00",
      },
    ];
    const selectedEventIds = { 1: true };
    const action = {
      type: SET_ALL_SELECTED_EVENTS,
      payload: { selectedEvents, selectedEventIds },
    };
    const expectedState = { ...initialState, selectedEvents, selectedEventIds };
    expect(eventsReducer(initialState, action)).toEqual(expectedState);
  });
});
