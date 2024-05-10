import mongoose, { Schema } from "mongoose"

const stationSchema = new Schema ({
    station_name:{
        type: String,
        required: true
    },
    station_code:{
        type: String,
        required: true
    },
    line_color_code:{
        type: [String],
        required: true
    },
    connected_metro_stations:{
        type: [[String]],
        required: true
    },
    connected_railway_stations:{
        type: [[String]],
        required: true
    }
    
})

const Station = mongoose.model("Station", stationSchema);

export default Station;