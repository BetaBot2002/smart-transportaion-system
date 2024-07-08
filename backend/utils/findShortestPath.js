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

const findShortestPath = async (source, destination) => {
    try {
        const routeMap = new Map();
        const pq = new PriorityQueue();

        pq.push([0, source]);
        routeMap.set(source, [0, [source]]);

        while (!pq.empty()) {
            const [weight, station] = pq.pop();
            const stationObj = await Station.findOne({ station_name: station });

            if (!stationObj) {
                continue;
            }

            stationObj.connected_metro_stations.forEach(connectedStation => {
                const nextStation = connectedStation[0];
                const nextDistance = parseInt(connectedStation[1]);

                if (!routeMap.has(nextStation) || routeMap.get(nextStation)[0] > weight + nextDistance) {
                    const tempPath = routeMap.get(station)[1].slice();
                    tempPath.push(nextStation);
                    routeMap.set(nextStation, [weight + nextDistance, tempPath]);
                    pq.push([weight + nextDistance, nextStation]);
                }
            });

            stationObj.connected_railway_stations.forEach(connectedStation => {
                const nextStation = connectedStation[0];
                const nextDistance = parseInt(connectedStation[1]);

                if (!routeMap.has(nextStation) || routeMap.get(nextStation)[0] > weight + nextDistance) {
                    const tempPath = routeMap.get(station)[1].slice();
                    tempPath.push(nextStation);
                    routeMap.set(nextStation, [weight + nextDistance, tempPath]);
                    pq.push([weight + nextDistance, nextStation]);
                }
            });
        }

        return routeMap || "No path found";
    } catch (err) {
        return err.message || "Error finding shortest path";
    }
};
export default findShortestPath;