import Station from "../models/stationModel.js";
import findShortestPath from "../utils/findShortestPath.js";
import CustomError from "../utils/customError.js";
import axios from "axios";

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
		res.status(500).json({ message: err.message });
	}
};

const getRoute = async (req, res) => {
	try{	
		const source = req.body.source;
		const destination = req.body.destination;
		const source_station = await Station.findOne({station_name:source});
		if(!source_station) {
			throw new CustomError("Source station does not exists");
		}
		const destination_station = await Station.findOne({station_name:destination});
		if(!destination_station) {
			throw new CustomError("destination station does not exists");
		}
		const route = await findShortestPath(source, destination);

		const routeObject = Object.fromEntries(route);
		const routeJSON = JSON.stringify(routeObject, null, 2);

		res.status(200).json(routeObject[destination]);
	}catch(err) {
		res.status(500).json({
			message:err.message
		})
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
		res.status(500).json({ message: error.message });
	}
};

const getAllStations = async (req, res) => {
	try {
		const stations = await Station.find({});
		res.status(200).json({
			stations
		});
	} catch (err) {
		return res.status(500).json(err.message);
	}
}
const getTrainDetails = async (req, res) => {
	try {
		const trainNo = req.query.trainNo;
		const train = (await axios.get(`https://indian-rail-api.onrender.com/trains/getTrain?trainNo=${trainNo}`)).data;
		res.status(200).json({
			success: true,
			train
		});
	} catch (err) {
		res.status(500).json(err.message);
	}
}
const getTrainInBetweenStations = async (req, res) => {
	try {
		const from = req.query.from_station;
		const to = req.query.to_station;
		const trainBwtn = (await axios.get(`https://indian-rail-api.onrender.com/trains/betweenStations?from=${from}&to=${to}`)).data;
		res.status(200).json({
			trainBwtn
		})
	} catch (err) {
		res.status(500).json(err.message);
	}
}
const getDatabaseStationDetails = async (req, res) => {
	try {
		const station = await Station.find({ station_name: new RegExp(req.query.station_name, 'i') });

		if (!station) {
			throw new CustomError("station not found");
		}
		res.status(200).json({ station });
	} catch (err) {
		res.status(400).json(err.message);
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
		res.status(500).json({message:err.message});
	}
}
const getTrainList = async (req,res)=>{
	try {
		const {from, to} = req.query;
		const {date} = req.params;
		const trainList = (await axios.get(`https://indian-rail-api.onrender.com/trains/getTrainOn?from=${from}&to=${to}&date=${date}`)).data;
		res.status(200).json({ success:true,trainList,message:"train list successfully" });

	} catch (err) {
		res.status(500).json({message:err.message});
	}
}
export {
	createStation, getRoute, getAllStations, getTrainDetails, getTrainList,
	getDatabaseStationDetails, getTrainInBetweenStations, deleteStation,updateStation
};