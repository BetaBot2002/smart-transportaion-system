import { configureStore } from '@reduxjs/toolkit'

import { 
getShortestPathReducer, getStationReducer, getAllStationReducer,
getTrainStatusReducer, getAllAvailableTrainsReducer
 } from './reducers/trainReducer.js'

 import { 
  getUserRoleReducer, isDeletedUserReducer, getAllUserReducer, isDeletedStationReducer,
isUpdatedStationReducer, IsCreatedStationReducer
 } from './reducers/adminReducer.js'

import { getUserReducer,
  isUpdatedUserReducer,
} from './reducers/userReducer.js'

const store = configureStore({
  reducer: {
    GetUser: getUserReducer,
    GetAllUser: getAllUserReducer,
    GetShortestPath: getShortestPathReducer,
    GetStation: getStationReducer,
    GetAllStation: getAllStationReducer,
    GetTrainStatus: getTrainStatusReducer,
    GetAllAvailableTrains: getAllAvailableTrainsReducer,
    GetUserRole: getUserRoleReducer,

    IsUpdatedUser: isUpdatedUserReducer,
    IsDeletedUser: isDeletedUserReducer,
    IsDeletedStation: isDeletedStationReducer,
    IsUpdatedStation: isUpdatedStationReducer,
    IsCreatedStation: IsCreatedStationReducer
  }
})

export default store