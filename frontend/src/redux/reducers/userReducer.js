const initialUserState = {
    name:"deep"
};

export const getUserReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case 'GET_USER_REQUEST':
    case 'GET_USER_SUCCESS':
    case 'GET_USER_FAILED':
      return state;
    default:
      return state;
  }
};


export const isUpdatedUserReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case 'IS_UPDATED_USER_REQUEST':
    case 'IS_UPDATED_USER_SUCCESS':
    case 'IS_UPDATED_USER_FAILED':
      return state;
    default:
      return state;
  }
};
