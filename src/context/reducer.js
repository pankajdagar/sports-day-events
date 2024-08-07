import toast from "react-hot-toast";
import {
  SET_EVENTS,
  SET_ERROR,
  SELECT_EVENT,
  DESELECT_EVENT,
  SET_LOADING,
  SET_ALL_SELECTED_EVENTS,
} from "./actions";
import { SELECTED_EVENT_ID_LS_KEY } from "constants";
import { checkForTimeConficts } from "utils/appUtils";

const toastOptions = {
  style: {
    borderRadius: "10px",
    background: "#333",
    color: "#fff",
  },
};

const initialState = {
  events: [],
  selectedEvents: [],
  selectedEventIds: {},
  error: null,
  loading: false,
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };

    case SET_EVENTS:
      return { ...state, events: action.payload };

    case SET_ERROR:
      return { ...state, error: action.payload };

    case SELECT_EVENT:
      if (state.selectedEvents.length >= 3) {
        toast.error("You can select a maximum of 3 events.", toastOptions);
        return state;
      }
      const eventToSelect = state.events.find((e) => e.id === action.payload);
      const hasConflict = checkForTimeConficts(
        state.selectedEvents,
        eventToSelect
      );
      if (hasConflict) {
        toast.error(
          "This event's time conflicts with an already selected event.",
          toastOptions
        );
        return state;
      }
      const newSelectedEventIds = {
        ...state.selectedEventIds,
        [eventToSelect["id"]]: true,
      };
      localStorage.setItem(
        SELECTED_EVENT_ID_LS_KEY,
        JSON.stringify(newSelectedEventIds)
      );
      return {
        ...state,
        selectedEvents: [...state.selectedEvents, eventToSelect],
        selectedEventIds: newSelectedEventIds,
      };

    case DESELECT_EVENT:
      const updatedSelectedEventIds = { ...state.selectedEventIds };
      delete updatedSelectedEventIds[action.payload];
      localStorage.setItem(
        SELECTED_EVENT_ID_LS_KEY,
        JSON.stringify(updatedSelectedEventIds)
      );
      return {
        ...state,
        selectedEvents: state.selectedEvents.filter(
          (event) => event.id !== action.payload
        ),
        selectedEventIds: { ...updatedSelectedEventIds },
      };

    case SET_ALL_SELECTED_EVENTS:
      return {
        ...state,
        selectedEvents: action.payload.selectedEvents,
        selectedEventIds: action.payload.selectedEventIds,
      };

    default:
      return state;
  }
};

export { eventsReducer, initialState };
