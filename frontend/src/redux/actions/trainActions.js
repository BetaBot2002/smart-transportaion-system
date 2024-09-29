import axios from "axios";
import {
    GET_SHORTEST_PATH_REQUEST, GET_SHORTEST_PATH_SUCCESS, GET_SHORTEST_PATH_FAILED,
    GET_STATION_REQUEST, GET_STATION_SUCCESS, GET_STATION_FAILED,
    GET_ALL_STATION_REQUEST, GET_ALL_STATION_SUCCESS, GET_ALL_STATION_FAILED,
    GET_TRAIN_STATUS_REQUEST, GET_TRAIN_STATUS_SUCCESS, GET_TRAIN_STATUS_FAILED,
    GET_ALL_AVAILABLE_TRAINS_REQUEST, GET_ALL_AVAILABLE_TRAINS_SUCCESS, GET_ALL_AVAILABLE_TRAINS_FAILED,
    GET_ALL_TRAIN_NO_REQUEST,
    GET_ALL_TRAIN_NO_SUCCESS,
    GET_ALL_TRAIN_NO_FAILED,
    CLEAR_GET_SHORTEST_PATH
} from "../consents/trainConsents.js";
import CustomError from "../../../../backend/utils/customError.js";
import { getToken,setToken } from "./userActions.js";

const backendUrl = "http://localhost:5000/station";

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
        const { data } = await axios.post(`${backendUrl}/get-route`, { source, destination },config);
        console.log(data);
        
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

        const { data } = await axios.get(`${backendUrl}/get-station-database-details?station_name=${stationName}`);
        dispatch({ type: GET_STATION_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: GET_STATION_FAILED, payload: error.response.data.message });
    }
};

export const getAllStations = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_STATION_REQUEST });

        const { data } = await axios.get(`${backendUrl}/get-all-stations`);
        dispatch({ type: GET_ALL_STATION_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: GET_ALL_STATION_FAILED, payload: error.response.data.message });
    }
};

export const getTrainStatus = (trainNo) => async (dispatch) => {
    try {
        dispatch({ type: GET_TRAIN_STATUS_REQUEST });

        const { data } = await axios.get(`${backendUrl}/get-train-details?trainNo=${trainNo}`);
        dispatch({ type: GET_TRAIN_STATUS_SUCCESS, payload: data });
        
    } catch (error) {
        dispatch({ type: GET_TRAIN_STATUS_FAILED, payload: error.response.data.message });
    }
};

export const getAvailableTrainsBetweenStations = (from, to, date) => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_AVAILABLE_TRAINS_REQUEST });

        const { data } = await axios.get(`${backendUrl}/get-list-of-trains/${date}?from=${from}&to=${to}`);
        dispatch({ type: GET_ALL_AVAILABLE_TRAINS_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: GET_ALL_AVAILABLE_TRAINS_FAILED, payload: error.response.data.message });
    }
};

export const getAllTrainNos = ()=>async (dispatch)=> {
    try {
        dispatch({ type: GET_ALL_TRAIN_NO_REQUEST });

        const { data } = await axios.get(`${backendUrl}/get-all-train-no`);
        dispatch({ type: GET_ALL_TRAIN_NO_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: GET_ALL_TRAIN_NO_FAILED, payload: err.response.data.message });
    }
}