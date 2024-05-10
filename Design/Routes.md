```javascript
router.route('/station-create').post(createStation);
router.route('/get-route').post(getRoute);
router.route('/get-all-stations').get(getAllStations);
router.route('/get-single-station').get(getSingleStations); 
    // Patricular station details including platform details
router.route('/get-single-train-details').get(getSingleTrainDetails);
router.route('/get-list-of-trains/:date').get(getTrainList);


```