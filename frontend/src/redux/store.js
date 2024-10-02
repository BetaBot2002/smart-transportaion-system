import { configureStore } from '@reduxjs/toolkit'

import { 
getShortestPathReducer, getStationReducer, getAllStationReducer,
getTrainStatusReducer, getAllAvailableTrainsReducer, getSearchHistoryReducer
 } from './reducers/trainReducer.js'

 import { 
  isDeletedUserReducer, getAllUserReducer, isDeletedStationReducer, isCreatedStationReducer
 } from './reducers/adminReducer.js'

import { getUserReducer, isUpdatedUserReducer } from './reducers/userReducer.js'

const store = configureStore({
  reducer: {
    GetUser: getUserReducer,
    GetAllUser: getAllUserReducer,
    GetShortestPath: getShortestPathReducer,
    GetStation: getStationReducer,
    GetAllStation: getAllStationReducer,
    GetSearchHistory:getSearchHistoryReducer,
    GetTrainStatus: getTrainStatusReducer,
    GetAllAvailableTrains: getAllAvailableTrainsReducer,

    IsUpdatedUser: isUpdatedUserReducer,
    IsDeletedUser: isDeletedUserReducer,
    IsDeletedStation: isDeletedStationReducer,
    IsUpdatedStation: isDeletedStationReducer,
    IsCreatedStation: isCreatedStationReducer
  }
})

export default store