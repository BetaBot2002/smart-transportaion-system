import axios from 'axios';
import {
  ROLE_USER_REQUEST,
  ROLE_USER_SUCCESS,
  ROLE_USER_FAILED,
  IS_DELETED_USER_REQUEST,
  IS_DELETED_USER_SUCCESS,
  IS_DELETED_USER_FAILED,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FAILED,
  IS_DELETED_STATION_REQUEST,
  IS_DELETED_STATION_SUCCESS,
  IS_DELETED_STATION_FAILED,
  IS_UPDATED_STATION_REQUEST,
  IS_UPDATED_STATION_SUCCESS,
  IS_UPDATED_STATION_FAILED,
  IS_CREATED_STATION_REQUEST,
  IS_CREATED_STATION_SUCCESS,
  IS_CREATED_STATION_FAILED,
  CLEAR
} from './adminConsents';

const backendUrlUser = "http://localhost:5000/user";
const backendUrlStation = "http://localhost:5000/station";

export const getUserRole = (id) => async (dispatch) => {
  try {
    dispatch({ type: ROLE_USER_REQUEST });

    const { data } = await axios.get(`${backendUrlUser}/admin/getuser/${id}`);
    dispatch({ type: ROLE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ROLE_USER_FAILED, payload: error.response.data.message });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: IS_DELETED_USER_REQUEST });

    const { data } = await axios.delete(`${backendUrlUser}/admin/delete/${id}`);
    dispatch({ type: IS_DELETED_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: IS_DELETED_USER_FAILED, payload: error.response.data.message });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_USER_REQUEST });

    const { data } = await axios.get(`${backendUrlUser}/admin/get-all-user`);
    dispatch({ type: GET_ALL_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_USER_FAILED, payload: error.response.data.message });
  }
};

export const deleteStation = (id) => async (dispatch) => {
  try {
    dispatch({ type: IS_DELETED_STATION_REQUEST });

    const { data } = await axios.delete(`${backendUrlStation}/admin/station-delete/${id}`);
    dispatch({ type: IS_DELETED_STATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: IS_DELETED_STATION_FAILED, payload: error.response.data.message });
  }
};

export const updateStation = (id, stationData) => async (dispatch) => {
  try {
    dispatch({ type: IS_UPDATED_STATION_REQUEST });

    const { data } = await axios.put(`${backendUrlStation}/admin/station-update/${id}`, stationData);
    dispatch({ type: IS_UPDATED_STATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: IS_UPDATED_STATION_FAILED, payload: error.response.data.message });
  }
};

export const createStation = (stationData) => async (dispatch) => {
  try {
    dispatch({ type: IS_CREATED_STATION_REQUEST });

    const { data } = await axios.post(`${backendUrlStation}/admin/station-create`, stationData);
    dispatch({ type: IS_CREATED_STATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: IS_CREATED_STATION_FAILED, payload: error.response.data.message });
  }
};

export const getAllStations = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_USER_REQUEST });

    const { data } = await axios.get(`${backendUrlStation}/admin/get-all-stations`);
    dispatch({ type: GET_ALL_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_USER_FAILED, payload: error.response.data.message });
  }
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR });
};
