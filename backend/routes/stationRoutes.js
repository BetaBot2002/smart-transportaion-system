import express from 'express';
import { createStation, getRoute, getAllStations,getTrainDetails,
    getTrainInBetweenStations ,getDatabaseTrainDetails,
    deleteStation} from '../controllers/stationController.js';

const router = express.Router();

router.route('/station-create').post(createStation);
router.route('/get-route').post(getRoute);
router.route('/get-all-stations').get(getAllStations);
router.route('/get-station-details').get(getTrainDetails);
router.route('/get-station-database-details').get(getDatabaseTrainDetails);
router.route('/get-train-between').get(getTrainInBetweenStations);
router.route('/station-delete').delete(deleteStation);
export default router;