import express from 'express';
import { createStation, getRoute, getAllStations } from '../controllers/stationController.js';

const router = express.Router();

router.route('/station-create').post(createStation);
router.route('/get-route').post(getRoute);
router.route('/get-all-stations').get(getAllStations);
export default router;