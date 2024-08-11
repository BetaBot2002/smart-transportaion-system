import express from 'express';
import { createStation, getRoute, getAllStations,getTrainDetails,
    getTrainInBetweenStations ,getDatabaseStationDetails,
    deleteStation,
    updateStation} from '../controllers/stationController.js';

import { isAuthenticatedAccess,isAuthrorizeRoles } from '../middlewares/Authentication.js';
import Station from '../models/stationModel.js';
const router = express.Router();

router.route('/admin/station-create').post(isAuthenticatedAccess,isAuthrorizeRoles,createStation);
router.route('/admin/get-all-stations').get(isAuthenticatedAccess,isAuthrorizeRoles,getAllStations);
router.route('/admin/station-delete').delete(isAuthenticatedAccess,isAuthrorizeRoles,deleteStation);


router.route('/get-route').post(isAuthenticatedAccess,getRoute);
router.route('/get-train-details').get(isAuthenticatedAccess,getTrainDetails);
router.route('/get-station-database-details').get(isAuthenticatedAccess,getDatabaseStationDetails);
router.route('/get-train-between').get(isAuthenticatedAccess,getTrainInBetweenStations);

// router.route("/temp").get(async (req,res)=>{
//     const station = await Station.findOne({station_name:req.params.station}).explain();
//     res.json({
//         station
//     })
// }) 

export default router;