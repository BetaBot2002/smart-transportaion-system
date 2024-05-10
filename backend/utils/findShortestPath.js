import Station from "../models/stationModel.js";

class PriorityQueue {
    constructor() {
        this.data = [];
    }

    push(pair) {
        this.data.push(pair);
        this.data.sort((a, b) => a[0] - b[0]);
    }

    pop() {
        return this.data.shift();
    }

    empty() {
        return this.data.length === 0;
    }
}

const findShortestPath = async(source,destination) => {
    try{
    const route_map = new Map();
    const pq=new PriorityQueue();
    pq.push([0,source]);
    route_map.set(source,[0,[source]]);
    while(!pq.empty()) {
        const [weight,station]=pq.pop();
        const station_obj=await Station.findOne({station_name:station});
        if(!station_obj) {
            continue;
        }

        station_obj.connected_metro_stations.forEach(connected_station => {
            const next_station = connected_station[0];
            const next_distance = parseInt(connected_station[1][0]);
            if (!route_map.has(next_station) || route_map.get(next_station)[0] > weight + next_distance) {
                const temp = route_map.get(station)[1].slice(); // Create a copy of the path
                temp.push(next_station);
                route_map.set(next_station, [weight + next_distance, temp]);
                pq.push([weight + next_distance, next_station]);
            }
        })
        station_obj.connected_railway_stations.forEach(connected_station => {
            const next_station = connected_station[0];
            const next_distance = parseInt(connected_station[1][0]);
            const temp = route_map.get(station)[1];
            if (!route_map.has(next_station) || route_map.get(next_station)[0] > weight + next_distance) {
                const temp = route_map.get(station)[1].slice(); // Create a copy of the path
                temp.push(next_station);
                route_map.set(next_station, [weight + next_distance, temp]);
                pq.push([weight + next_distance, next_station]);
            }

        })
    }
    return route_map;
}catch(err) {
    return err;
}
}
export default findShortestPath;