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
  const source = req.query.source;
const destination = req.query.destination;
const route = await findShortestPath(source, destination);

const routeObject = Object.fromEntries(route);
const routeJSON = JSON.stringify(routeObject, null, 2);

res.status(200).json(routeObject);
};

const getAllStations = async (req, res) => {
    try{
        const stations = await Station.find({});
        res.status(200).json({
            stations
        });
    }catch(err){
        return res.status(500).json(err.message);
    }
}
const getTrainDetails = async (req,res) =>{
    try{
        const trainNo=req.query.trainNo;
        const train = (await axios.get(`https://indian-rail-api.onrender.com/trains/getTrain?trainNo=${trainNo}`)).data;
        res.status(200).json({
            train
        });
    }catch(err) {
        res.status(500).json(err.message);
    }
}
const getTrainInBetweenStations = async (req,res) => {
    try{
        const from = req.query.from_station;
        const to = req.query.to_station;
        const trainBwtn = (await axios.get(`https://indian-rail-api.onrender.com/trains/betweenStations?from=${from}&to=${to}`)).data;
        res.status(200).json({
            trainBwtn
        })
    }catch(err) {
        res.status(500).json(err.message);
    }
}
const getDatabaseTrainDetails = async (req,res) => {
    try {
        const station = await Station.find({ station_name: new RegExp(req.query.station_name, 'i') });

        if(station.length==0) {
            throw new CustomError("station not found");
        }
        res.status(200).json({station});
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
        res.status(500).json(err.message);
    }
}
export {createStation,getRoute,getAllStations,getTrainDetails,
    getDatabaseTrainDetails,getTrainInBetweenStations,deleteStation};