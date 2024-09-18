import { GET_USER_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS, USER_LOGIN_FAILED, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_REGISTER_FAILED, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../consents/userConsents";

const initialUserState = {
	loading:false,
	isAuthenticated:false,
	user:null
}

export const getUserReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
		case USER_LOGIN_REQUEST:
		case GET_USER_REQUEST:
			return {
				loading:true,
				isAuthenticated:false,
				user:null
			}
		case USER_REGISTER_SUCCESS:
		case USER_LOGIN_SUCCESS:
		case GET_USER_SUCCESS:
			return {
				loading:false,
				isAuthenticated:true,
				user:action.payload
			}
		case USER_REGISTER_FAILED:
		case USER_LOGIN_FAILED:
		case GET_USER_FAILED:
			return {
				...state,
				loading:false,
				error:action.payload
			}
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
