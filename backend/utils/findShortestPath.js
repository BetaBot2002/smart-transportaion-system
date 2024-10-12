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

const findShortestPath = async (sourceIndex, allStations,adjacencyList) => {
    try {
        const mp = new Map();
		const pq = new PriorityQueue();

		pq.push([0, sourceIndex]);
		mp.set(sourceIndex, [0, [sourceIndex]]);

		while (!pq.empty()) {
			const [distance, stationIndex] = pq.pop();


			adjacencyList[stationIndex]?.forEach(([nextIndex, nextDistance]) => {
				if (allStations.at(nextIndex).isActive === true) {
					const current = mp.get(stationIndex)[1];

					// Update the path if we find a shorter distance
					if (!mp.has(nextIndex) || distance + nextDistance < mp.get(nextIndex)[0]) {
						mp.set(nextIndex, [distance + nextDistance, [...current, nextIndex]]);
						pq.push([distance + nextDistance, nextIndex]);
					}
				}
			});
		}
        const resultArray = Array.from(mp.entries()).map(([index, [distance, path]]) => {
			return {
				index,
				distance,
				path: path.map(stationIndex => [allStations.at(stationIndex).station_name, allStations.at(stationIndex).line_color_code]) 
			};
		});
        return resultArray;
    } catch (err) {
        return err.message || "Error finding shortest path";
    }
};
export {PriorityQueue};
export default findShortestPath;