export const SET_EVENTS = "SET_EVENTS";
export const SET_ERROR = "SET_ERROR";
export const SELECT_EVENT = "SELECT_EVENT";
export const DESELECT_EVENT = "DESELECT_EVENT";
export const SET_LOADING = "SET_LOADING";
export const SET_ALL_SELECTED_EVENTS = "SET_ALL_SELECTED_EVENTS";

export const setEvents = (events) => ({
  type: SET_EVENTS,
  payload: events,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const selectEvent = (eventId) => ({
  type: SELECT_EVENT,
  payload: eventId,
});

export const deselectEvent = (eventId) => ({
  type: DESELECT_EVENT,
  payload: eventId,
});

export const setLoading = (loadingState) => ({
  type: SET_LOADING,
  payload: loadingState,
});

export const setAllSelectedEvents = (selectedEventIds) => ({
  type: SET_ALL_SELECTED_EVENTS,
  payload: selectedEventIds,
});
