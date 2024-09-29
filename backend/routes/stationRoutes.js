import express from 'express';
import { createStation, getRoute, getAllStations,getTrainDetails,
    getTrainInBetweenStations ,getDatabaseStationDetails,getAlltrainsNo,
    deleteStation,getTrainList, updateStation} from '../controllers/stationController.js';

import { isAuthenticatedAccess,isAuthrorizeRoles } from '../middlewares/Authentication.js';
const router = express.Router();

router.route('/admin/station-create').post(isAuthenticatedAccess,isAuthrorizeRoles,createStation);
router.route('/admin/station-delete').delete(isAuthenticatedAccess,isAuthrorizeRoles,deleteStation);


router.route('/get-route').post(isAuthenticatedAccess,getRoute);
router.route('/get-train-details').get(getTrainDetails);
router.route('/get-station-database-details').get(getDatabaseStationDetails);
router.route('/get-all-stations').get(getAllStations);
router.route('/get-train-between').get(getTrainInBetweenStations);
router.route('/get-list-of-trains/:date').get(getTrainList);

// router.route("/temp").get(async (req,res)=>{
//     const station = await Station.findOne({station_name:req.params.station}).explain();
//     res.json({
//         station
//     })
// }) 

export default router;