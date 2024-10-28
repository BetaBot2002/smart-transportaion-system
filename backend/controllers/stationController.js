import Station from "../models/stationModel.js";
import { constructAdjacencyList, constructAnswer, findShortestPath, PriorityQueue } from "../utils/findShortestPath.js";
import CustomError from "../utils/customError.js";
import axios from "axios";
import { redisClient } from "../server.js"
import { constructLineColorAnswer, zip } from "../utils/helper.js";
import { alloydb } from "googleapis/build/src/apis/alloydb/index.js";
const createStation = async (req, res) => {
	try {
		const requestStations = req.body;
		const errors = [];
		const successes = [];

		if (Array.isArray(requestStations)) {
			for (const stn of requestStations) {
				try {
					const station = await Station.findOne({ station_name: stn.station_name });
					if (station) {
						errors.push(`${stn.station_name} Station already exists`);
					} else {
						try {
							await Station.create(stn);
							successes.push(`${stn.station_name} Station created successfully`);
						} catch (e) {
							errors.push(`${stn.station_name} is not created due to ${e.message}`)
						}
					}
				} catch (e) {
					errors.push(e.message);
				}
			}
		} else {
			try {
				const station = await Station.findOne({ station_name: requestStations.station_name });
				if (station) {
					throw new CustomError("Station already exists");
				} else {
					try {
						await Station.create(requestStations);
						successes.push(`${requestStations.station_name} Station created successfully`);
					} catch (e) {
						errors.push(`${requestStations.station_name} is not created due to ${e.message}`)
					}
				}
			} catch (e) {
				errors.push(e.message);
			}
		}

		if (errors.length) {
			res.status(400).json({ errors, successes });
		} else {
			res.status(200).json({ successes });
		}
	} catch (err) {
		res.status(400).json({
			success: false,
			message: err.message
		});
	}
};


const updateStation = async (req, res) => {
	try {
		const stationId = req.params.id;
		const station = await Station.findById(stationId);

		if (!station) {
			throw new CustomError("Station not found");
		}

		const updateKeys = Object.keys(req.body);

		updateKeys.map((key) => {
			switch (key) {
				case "station_code":
					station.station_code = req.body.station_code;
					break;
				case "station_type":
					station.station_type = req.body.station_type;
					break;
				case "add_line_color_code":
					station.line_color_code.push(req.body.add_line_color_code);
					break;
				case "remove_line_color_code":
					station.line_color_code.pull(req.body.remove_line_color_code);
					break;
				case "add_connected_metro_station":
					station.connected_metro_stations.push(req.body.add_connected_metro_station);
					break;
				case "remove_connected_metro_station":
					station.connected_metro_stations.pull(req.body.remove_connected_metro_station);
					break;
				case "add_connected_railway_station":
					station.connected_railway_stations.push(req.body.add_connected_railway_station);
					break;
				case "remove_connected_railway_station":
					station.connected_railway_stations.pull(req.body.remove_connected_railway_station);
					break;
				default:
					break;
			}
		});

		await station.save();

		res.status(200).json({ message: "Station updated successfully", station });
	} catch (error) {
		res.status(400).json({
			success: false,
			message: err.message
		});
	}
};

const getAllStations = async (req, res) => {
	try {
		const cachedStations = await redisClient.json.get("allStations", "$");
		if (cachedStations) {
			return res.status(200).json({
				stations: cachedStations
			});
		}
		const stations = await Station.find({ isActive: true }, ['station_name', 'station_type', 'line_color_code']);

		const saveInCache = redisClient.json.set(`allStations`, "$", stations);
		if (saveInCache == "ok") {
			throw new CustomError("Redis cached problem");
		}
		res.status(200).json({
			stations
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			message: err.message
		});
	}
}
const getTrainDetails = async (req, res) => {
	try {
		const trainNo = req.query.trainNo;
		let cachedTrain = await redisClient.get(`trains:${trainNo}`)
		if (cachedTrain !== null) {
			return res.status(200).json({
				success: true,
				train: JSON.parse(cachedTrain),
			});
		}
		const train = (await axios.get(`https://webscraped-indian-rail-api.mdbgo.io/trains/getTrain?trainNo=${trainNo}`)).data;
		if (!train.success) {
			throw new CustomError(train.data);
		}
		await redisClient.set(`trains:${trainNo}`, JSON.stringify(train));
		await redisClient.expire(`trains:${trainNo}`, 60 * 15);
		res.status(200).json({
			success: true,
			train
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			message: err.message
		});
	}
}
const getTrainRoute = async (req, res) => {
	try {
		const trainNo = req.query.trainNo;
		const train = (await axios.get(`https://webscraped-indian-rail-api.mdbgo.io/trains/getRoute?trainNo=${trainNo}`)).data.data;
		res.status(200).json({
			success: true,
			train
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			message: err.message
		});
	}
}
const getTrainInBetweenStations = async (req, res) => {
	try {
		const from = req.body.source;
		const to = req.body.destination;
		const trainBwtn = (await axios.get(`https://webscraped-indian-rail-api.mdbgo.io/trains/betweenStations?from=${from}&to=${to}`)).data;
		res.status(200).json({
			trainBwtn
		})
	} catch (err) {
		res.status(400).json({
			success: false,
			message: err.message
		});
	}
}
const getDatabaseStationDetails = async (req, res) => {
	try {
		const stationName = req.params.stationName;
		const station = await Station.findOne({ station_name: stationName });

		if (!station) {
			throw new CustomError("station not found");
		}
		res.status(200).json({
			success: true,
			station
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			message: err.message
		});
	}
}
const deleteStation = async (req, res) => {
	try {
		const stationNames = req.body.station_names;

		if (!stationNames || !Array.isArray(stationNames)) {
			throw new CustomError("Invalid input. Provide an array of station names.");
		}

		const result = await Station.deleteMany({ station_name: { $in: stationNames } });

		if (result.deletedCount === 0) {
			throw new CustomError("No stations found with the provided names.");
		}

		res.status(200).json({ message: "Stations deleted successfully", deletedCount: result.deletedCount });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}
const getTrainList = async (req, res) => {
	try {
		const { from, to } = req.query;
		const { date } = req.params;
		const trainList = (await axios.get(`https://webscraped-indian-rail-api.mdbgo.io/trains/getTrainOn?from=${from}&to=${to}&date=${date}`)).data;
		res.status(200).json({ success: true, trainList, message: "train list successfully" });

	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}

const getRoute = async (req, res) => {
	try {
		const allStations = await Station.find({ isActive: true });
		const stationNames = allStations.map(station => station.station_name);
		const { source, destination } = req.body;
		const sourceIndex = stationNames.indexOf(source);
		const destinationIndex = stationNames.indexOf(destination);

		if (sourceIndex === -1 || destinationIndex === -1) {
			return res.json({
				success: false,
				message: "Station not found"
			});
		}
		const cachedPath = await redisClient.get(`source:${sourceIndex}`);
		if (cachedPath !== null) {
			const { distanceArray, parentArray } = JSON.parse(cachedPath);
			let { resultStationArray, resultDistanceArray } = constructAnswer(distanceArray, parentArray, destinationIndex);
			let lineColorArray = constructLineColorAnswer(resultStationArray, allStations);
			return res.json({
				success: true,
				path: {
					resultStationArray,
					resultDistanceArray,
					lineColorArray
				}
			});
		}
		const adjacencyList = constructAdjacencyList(allStations, stationNames);

		const { distanceArray, parentArray } = await findShortestPath(sourceIndex, allStations, adjacencyList);
		if (distanceArray[destinationIndex] === 100000) {
			throw new CustomError("Something went wrong, retry");
		}
		await redisClient.set(`source:${sourceIndex}`, JSON.stringify({
			distanceArray,
			parentArray
		}));
		await redisClient.expire(`source:${sourceIndex}`, 60 * 60);
		if (cachedPath === 0) {
			throw new CustomError("Redis cache problem");
		}
		let { resultStationArray, resultDistanceArray } = constructAnswer(distanceArray, parentArray, destinationIndex);
		let lineColorArray = constructLineColorAnswer(resultStationArray, allStations);
		res.json({
			success: true,
			path: {
				resultStationArray,
				resultDistanceArray,
				lineColorArray
			}
		});

	} catch (error) {
		res.json({
			success: false,
			message: error.message
		});
	}
};


export {
	createStation, getRoute, getAllStations, getTrainDetails, getTrainList, getTrainRoute,
	getDatabaseStationDetails, getTrainInBetweenStations, deleteStation, updateStation
};