const initialAdminState = {
    name:"Deep"
};

export const getUserRoleReducer = (state = initialAdminState, action) => {
  switch (action.type) {
    case 'ROLE_USER_REQUEST':
    case 'ROLE_USER_SUCCESS':
    case 'ROLE_USER_FAILED':
      return state;
    default:
      return state;
  }
};

export const isDeletedUserReducer = (state = initialAdminState, action) => {
  switch (action.type) {
    case 'IS_DELETED_USER_REQUEST':
    case 'IS_DELETED_USER_SUCCESS':
    case 'IS_DELETED_USER_FAILED':
      return state;
    default:
      return state;
  }
};

export const getAllUserReducer = (state = initialAdminState, action) => {
  switch (action.type) {
    case 'GET_ALL_USER_REQUEST':
    case 'GET_ALL_USER_SUCCESS':
    case 'GET_ALL_USER_FAILED':
      return state;
    default:
      return state;
  }
};

export const isDeletedStationReducer = (state = initialAdminState, action) => {
  switch (action.type) {
    case 'IS_DELETED_STATION_REQUEST':
    case 'IS_DELETED_STATION_SUCCESS':
    case 'IS_DELETED_STATION_FAILED':
      return state;
    default:
      return state;
  }
};

export const isUpdatedStationReducer = (state = initialAdminState, action) => {
  switch (action.type) {
    case 'IS_UPDATED_STATION_REQUEST':
    case 'IS_UPDATED_STATION_SUCCESS':
    case 'IS_UPDATED_STATION_FAILED':
      return state;
    default:
      return state;
  }
};

export const IsCreatedStationReducer = (state = initialAdminState, action) => {
  switch (action.type) {
    case 'IS_CREATED_STATION_REQUEST':
    case 'IS_CREATED_STATION_SUCCESS':
    case 'IS_CREATED_STATION_FAILED':
      return state;
    default:
      return state;
  }
};
