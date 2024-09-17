const initialTrainState = {
    name:'Sealdah'
};

export const getShortestPathReducer = (state = initialTrainState, action) => {
  switch (action.type) {
    case 'GET_SHORTEST_PATH_REQUEST':
    case 'GET_SHORTEST_PATH_SUCCESS':
    case 'GET_SHORTEST_PATH_FAILED':
      return state;
    default:
      return state;
  }
};

export const getStationReducer = (state = initialTrainState, action) => {
  switch (action.type) {
    case 'GET_STATION_REQUEST':
    case 'GET_STATION_SUCCESS':
    case 'GET_STATION_FAILED':
      return state;
    default:
      return state;
  }
};

export const getAllStationReducer = (state = initialTrainState, action) => {
  switch (action.type) {
    case 'GET_ALL_STATION_REQUEST':
    case 'GET_ALL_STATION_SUCCESS':
    case 'GET_ALL_STATION_FAILED':
      return state;
    default:
      return state;
  }
};

export const getTrainStatusReducer = (state = initialTrainState, action) => {
  switch (action.type) {
    case 'GET_TRAIN_STATUS_REQUEST':
    case 'GET_TRAIN_STATUS_SUCCESS':
    case 'GET_TRAIN_STATUS_FAILED':
      return state;
    default:
      return state;
  }
};

export const getAllAvailableTrainsReducer = (state = initialTrainState, action) => {
  switch (action.type) {
    case 'GET_ALL_AVAILABLE_TRAINS_REQUEST':
    case 'GET_ALL_AVAILABLE_TRAINS_SUCCESS':
    case 'GET_ALL_AVAILABLE_TRAINS_FAILED':
      return state;
    default:
      return state;
  }
};
