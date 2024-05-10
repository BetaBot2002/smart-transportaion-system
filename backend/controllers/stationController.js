import Station from "../models/stationModel.js";
import findShortestPath from "../utils/findShortestPath.js";
const createStation = async (req,res) =>{

    const station = await Station.findOne({station_name: req.body.station_name});
    if(station) {
        return res.status(400).json("Station already exists");
    }


    await Station.create(req.body);
    res.status(200).json("Station created successfully");
}

const getRoute = async (req, res) => {
    const source = "Sodpur";
    const destination = "Maidan";
    const route = await findShortestPath(source, destination);
    
    // Convert Map to JSON object
    const routeObject = Array.from(route).reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
    }, {});

    res.status(200).json(routeObject);
};

const getAllStations = async (req, res) => {
    try{
        const stations = await Station.find({});
        res.status(200).json(stations);
    }catch(err){
        return res.status(500).json(err);
    }
}
export {createStation,getRoute,getAllStations};