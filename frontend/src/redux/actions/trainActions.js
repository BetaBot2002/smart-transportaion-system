import axios from "axios";
import {
    GET_SHORTEST_PATH_REQUEST, GET_SHORTEST_PATH_SUCCESS, GET_SHORTEST_PATH_FAILED,
    GET_STATION_REQUEST, GET_STATION_SUCCESS, GET_STATION_FAILED,
    GET_ALL_STATION_REQUEST, GET_ALL_STATION_SUCCESS, GET_ALL_STATION_FAILED,
    GET_TRAIN_STATUS_REQUEST, GET_TRAIN_STATUS_SUCCESS, GET_TRAIN_STATUS_FAILED,
    GET_ALL_AVAILABLE_TRAINS_REQUEST, GET_ALL_AVAILABLE_TRAINS_SUCCESS, GET_ALL_AVAILABLE_TRAINS_FAILED,
    CLEAR_GET_SHORTEST_PATH,
    GET_LRU_TRAINS_REQUEST,
    GET_LRU_TRAINS_SUCCESS,
    GET_LRU_TRAINS_FAILED,
    SET_LRU_TRAINS_REQUEST,
    SET_LRU_TRAINS_SUCCESS,
    SET_LRU_TRAINS_FAILED
} from "../consents/trainConsents.js";
import CustomError from "../../customError.js";
import { getToken,setToken, userBackendUrl } from "./userActions.js";

export const stationBackendUrl = "http://localhost:5000/station";

export const getShortestPath = (source, destination) => async (dispatch) => {
    try {
        dispatch({ type: GET_SHORTEST_PATH_REQUEST });
        const { accessToken, refreshToken } = getToken();
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const { data } = await axios.post(`${stationBackendUrl}/get-route`, { source, destination },config);
        
        if(!data.success) {
            throw new CustomError(data.message);
        }
        dispatch({ type: GET_SHORTEST_PATH_SUCCESS, payload: data.route });

    } catch (error) {
        dispatch({ type: GET_SHORTEST_PATH_FAILED, payload: error.response.data.message});
    }
};
export const clearGetshortestPath = ()=> async(dispatch)=> {
    dispatch({
        type:CLEAR_GET_SHORTEST_PATH
    })
}
export const getStation = (stationName) => async (dispatch) => {
    try {
        dispatch({ type: GET_STATION_REQUEST });
        
        const { data } = await axios.get(`${stationBackendUrl}/get-station-database-details/${stationName.station_name}`);
        
        dispatch({ type: GET_STATION_SUCCESS, payload: data.station });

    } catch (error) {
        dispatch({ type: GET_STATION_FAILED, payload: error.response.data.message });
    }
};

export const getAllStations = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_STATION_REQUEST });

        const { data } = await axios.get(`${stationBackendUrl}/get-all-stations`);
        dispatch({ type: GET_ALL_STATION_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: GET_ALL_STATION_FAILED, payload: error.response.data });
    }
};
export const getLRUtrains = () => async (dispatch) => {
    try {
        dispatch({ type: GET_LRU_TRAINS_REQUEST });
        const {accessToken,refreshToken} = getToken();
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const { data } = await axios.get(`${userBackendUrl}/get-lru-trains`,config);
        dispatch({ type: GET_LRU_TRAINS_SUCCESS, payload: data.trains });

    } catch (error) {
        dispatch({ type: GET_LRU_TRAINS_FAILED, payload: error.response.data });
    }
};
export const setLRUtrains = (train) => async (dispatch) => {
    try {
        dispatch({ type: SET_LRU_TRAINS_REQUEST });
        const {accessToken,refreshToken} = getToken();
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const { data } = await axios.post(`${userBackendUrl}/set-lru-trains`,{train},config);
        dispatch({ type: SET_LRU_TRAINS_SUCCESS, payload: data.trains });

    } catch (error) {
        dispatch({ type: SET_LRU_TRAINS_FAILED, payload: error.response.data });
    }
};


export const getTrainStatus = (trainNo) => async (dispatch) => {
    try {
        dispatch({ type: GET_TRAIN_STATUS_REQUEST });
        
        const { data } = await axios.get(`${stationBackendUrl}/get-train-details?trainNo=${trainNo}`);
        dispatch({ type: GET_TRAIN_STATUS_SUCCESS, payload: data.train });
        
    } catch (error) {
        dispatch({ type: GET_TRAIN_STATUS_FAILED, payload: error.response.data.message });
    }
};

export const getAvailableTrainsBetweenStations = (from, to, date) => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_AVAILABLE_TRAINS_REQUEST });

        const { data } = await axios.get(`${stationBackendUrl}/get-list-of-trains/${date}?from=${from}&to=${to}`);
        dispatch({ type: GET_ALL_AVAILABLE_TRAINS_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: GET_ALL_AVAILABLE_TRAINS_FAILED, payload: error.response.data.message });
    }
};

