import { fetchMockData } from "mockdata";
import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import { eventsReducer, initialState } from "./reducer";
import {
  setAllSelectedEvents,
  setError,
  setEvents,
  setLoading,
} from "./actions";
import { SELECTED_EVENT_ID_LS_KEY } from "constants";

const EventsContext = createContext();

const EventsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventsReducer, initialState);

  const setSelectedEventIdsFromLocalStorage = useCallback((allEventsData) => {
    const savedSelectedEventIds = localStorage.getItem(
      SELECTED_EVENT_ID_LS_KEY
    );
    if (savedSelectedEventIds) {
      const parsedSelectedEventIds = JSON.parse(savedSelectedEventIds);
      if (Object.keys(parsedSelectedEventIds).length) {
        const selectedEvents = allEventsData.filter((event) =>
          parsedSelectedEventIds.hasOwnProperty(event.id)
        );
        dispatch(
          setAllSelectedEvents({
            selectedEvents,
            selectedEventIds: parsedSelectedEventIds,
          })
        );
      }
    }
  }, []);

  const fetchEventsData = useCallback(
    async (shouldSetFromLocalStorage = false) => {
      dispatch(setLoading(true));
      try {
        const allEventsData = await fetchMockData();
        dispatch(setEvents(allEventsData));
        if (shouldSetFromLocalStorage) {
          setSelectedEventIdsFromLocalStorage(allEventsData);
        }
        dispatch(setError(null));
      } catch (e) {
        dispatch(setError(e.message));
        dispatch(setEvents([]));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [setSelectedEventIdsFromLocalStorage]
  );

  useEffect(() => {
    fetchEventsData(true);
  }, [fetchEventsData]);

  return (
    <EventsContext.Provider value={{ state, dispatch, fetchEventsData }}>
      {children}
    </EventsContext.Provider>
  );
};

export { EventsContext, EventsProvider };
