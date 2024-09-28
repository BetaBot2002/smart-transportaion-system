import {
  GET_SHORTEST_PATH_REQUEST, GET_SHORTEST_PATH_SUCCESS, GET_SHORTEST_PATH_FAILED,
  GET_STATION_REQUEST, GET_STATION_SUCCESS, GET_STATION_FAILED,
  GET_ALL_STATION_REQUEST, GET_ALL_STATION_SUCCESS, GET_ALL_STATION_FAILED,
  GET_TRAIN_STATUS_REQUEST, GET_TRAIN_STATUS_SUCCESS, GET_TRAIN_STATUS_FAILED,
  GET_ALL_AVAILABLE_TRAINS_REQUEST, GET_ALL_AVAILABLE_TRAINS_SUCCESS, GET_ALL_AVAILABLE_TRAINS_FAILED
} from "../consents/trainConsents.js";

const initialTrainState = {
  data: null,
  loading: false,
  error: null,
};

// Shortest Path Reducer
export const getShortestPathReducer = (state = initialTrainState, action) => {
  switch (action.type) {
      case GET_SHORTEST_PATH_REQUEST:
          return { ...state, loading: true };
      case GET_SHORTEST_PATH_SUCCESS:
          return { ...state, loading: false, data: action.payload };
      case GET_SHORTEST_PATH_FAILED:
          return { ...state, loading: false, error: action.payload };
      default:
          return state;
  }
};

// Get Station Reducer
export const getStationReducer = (state = initialTrainState, action) => {
  switch (action.type) {
      case GET_STATION_REQUEST:
          return { ...state, loading: true };
      case GET_STATION_SUCCESS:
          return { ...state, loading: false, data: action.payload };
      case GET_STATION_FAILED:
          return { ...state, loading: false, error: action.payload };
      default:
          return state;
  }
};

// Get All Stations Reducer
export const getAllStationReducer = (state = initialTrainState, action) => {
  switch (action.type) {
      case GET_ALL_STATION_REQUEST:
          return { ...state, loading: true };
      case GET_ALL_STATION_SUCCESS:
          return { ...state, loading: false, data: action.payload.stations };
      case GET_ALL_STATION_FAILED:
          return { ...state, loading: false, error: action.payload };
      default:
          return state;
  }
};

export const getTrainStatusReducer = (state = initialTrainState, action) => {
  switch (action.type) {
      case GET_TRAIN_STATUS_REQUEST:
          return { ...state, loading: true };
      case GET_TRAIN_STATUS_SUCCESS:
          return { ...state, loading: false, data: action.payload };
      case GET_TRAIN_STATUS_FAILED:
          return { ...state, loading: false, error: action.payload };
      default:
          return state;
  }
};

export const getAllAvailableTrainsReducer = (state = initialTrainState, action) => {
  switch (action.type) {
      case GET_ALL_AVAILABLE_TRAINS_REQUEST:
          return { ...state, loading: true };
      case GET_ALL_AVAILABLE_TRAINS_SUCCESS:
          return { ...state, loading: false, data: action.payload.trainList };
      case GET_ALL_AVAILABLE_TRAINS_FAILED:
          return { ...state, loading: false, error: action.payload };
      default:
          return state;
  }
};
