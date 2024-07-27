import express from 'express';
import { createStation, getRoute, getAllStations,getTrainDetails,
    getTrainInBetweenStations ,getDatabaseStationDetails,
    deleteStation,
    updateStation} from '../controllers/stationController.js';

const router = express.Router();

router.route('/station-create').post(createStation);
router.route('/get-route').post(getRoute);
router.route('/get-all-stations').get(getAllStations);
router.route('/get-train-details').get(getTrainDetails);
router.route('/get-station-database-details').get(getDatabaseStationDetails);
router.route('/get-train-between').get(getTrainInBetweenStations);

router.route('/admin/station-delete').delete(deleteStation);
export default router;