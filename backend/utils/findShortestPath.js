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
        let distanceArray = new Array(allStations.length).fill(100000);
		distanceArray[sourceIndex]=0;
        let parentArray = new Array(allStations.length).fill().map((_, index) => index);
		
		const pq = new PriorityQueue();

		pq.push([0, sourceIndex]);

		while (!pq.empty()) {
			const [distance, stationIndex] = pq.pop();


			adjacencyList[stationIndex].forEach(([nextIndex, nextDistance]) => {
				if (allStations.at(nextIndex).isActive === true) {
					
					if (distance + nextDistance < distanceArray[nextIndex]) {
						distanceArray[nextIndex] = distance + nextDistance;
						parentArray[nextIndex]=stationIndex;
						pq.push([distance + nextDistance, nextIndex]);
					}
				}
			});
		}
        
        return {distanceArray,parentArray};
    } catch (err) {
        return err.message || "Error finding shortest path";
    }
};
export {PriorityQueue};
export default findShortestPath;