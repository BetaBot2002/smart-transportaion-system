import React, { useState, useEffect } from 'react';
import {
	Box, Button, Spinner, Accordion, AccordionItem, AccordionButton, AccordionPanel,
	AccordionIcon, Input, InputGroup, InputLeftAddon, VStack, UnorderedList, ListItem, Text, useToast
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getShortestPath } from '../../redux/actions/trainActions';
import { MdOutlineSwapVerticalCircle } from 'react-icons/md';
import StationStepper from './StationStepper';
import { Loader } from '../../utils/Loader';

const lineColorMap = {
	0: 'black',
	1: 'green',
	2: 'blue',
	3: 'pink',
	4: 'orange',
	5: 'purple',
};

export default function GetShortestPath() {
	const { loading: loading2, error: err2, data: data1 = [] } = useSelector(state => state.GetAllStation);
	const { loading: loading1, error: err1, distanceArray, stationArray, lineColorArray } = useSelector((state) => state.GetShortestPath);
	const dispatch = useDispatch();
	const toast = useToast();

	const [source, setSource] = useState('');
	const [destination, setDestination] = useState('');
	const [sections, setSections] = useState('');
	const [openSourceStations, setOpenSourceStations] = useState(false);
	const [openDestinationStations, setOpenDestinationStations] = useState(false);
	const [filteredSource, setFilteredSource] = useState([]);
	const [filteredDestination, setFilteredDestination] = useState([]);

	const filterStations = (stationInput) => {
		return data1
			.filter(station => station.station_name && station.station_name.toLowerCase().startsWith(stationInput.toLowerCase()));
	}

	const handleSourceSelection = (stationName) => {
		setSource(stationName);
		setOpenSourceStations(false);
	}
	const handleStationSwap = () => {
		const temp = source;
		setSource(destination);
		setDestination(temp);
	}
	const handleDestinationSelection = (stationName) => {
		setDestination(stationName);
		setOpenDestinationStations(false);
	}
	useEffect(() => {

		if (stationArray?.length) {
			setSource(data1.at(stationArray[0])?.station_name || '');
			setDestination(data1.at(stationArray.at(-1))?.station_name || '');
			getSectionsByColor();

		}
		if (err1) {
			toast({
				title: 'Error',
				description: err1,
				status: 'error',
				duration: 3000,
				isClosable: true
			});
		}
	}, [stationArray, err1]);

	const handleSearch = () => {
		if (!source || !destination) {
			toast({
				title: 'Invalid input',
				description: "Enter both source and destination",
				status: 'error',
				duration: 3000,
				isClosable: true
			});
			return;
		}
		dispatch(getShortestPath(source, destination));
	};

	const getSectionsByColor = () => {
		let sections = [];
		let currentSection = { stations: [], distances: [], color: lineColorArray[0][0] };

		lineColorArray.forEach((colors, index) => {
			if (colors.length >= 2) {
				currentSection.stations.push(stationArray[index]);
				currentSection.distances.push(distanceArray[index]);
				sections.push(currentSection);
				const temp = lineColorArray[index].filter(color => color !== currentSection.color);
				currentSection = { stations: [stationArray[index]], distances: [distanceArray[index]], color: temp[0] };

			} else {
				currentSection.stations.push(stationArray[index]);
				currentSection.distances.push(distanceArray[index]);
			}
		});
		sections.push(currentSection);
		setSections(sections);
	};


	return (
		<>
			<VStack m={4} display={'flex'} justifyContent={'center'} alignItems="center">
				{/* Source Input */}
				<InputGroup>
					<InputLeftAddon w={'120px'}>Source</InputLeftAddon>
					<Input value={source} onChange={(e) => {
						setSource(e.target.value)
						setFilteredSource(filterStations(e.target.value).slice(0, 10))
						if (e.target.value.length != 0) setOpenSourceStations(true);
						else setOpenSourceStations(false);
					}} placeholder='From' />
				</InputGroup>
				{openSourceStations && (
					<Box
						bg='white'
						boxShadow='md'
						border='1px solid gray'
						w='100%'
						p={2}
						mt={1}
						borderRadius="md"
						maxH="150px"
						overflowY="auto"
					>
						<UnorderedList styleType="none">
							{filteredSource.map((station, index) => (
								<ListItem
									key={index}
									onClick={() => handleSourceSelection(station.station_name)}
									cursor="pointer"
									p={2}
									borderRadius="md"
									_hover={{ backgroundColor: "teal.100" }}
									_active={{ backgroundColor: "teal.200" }}
								>
									{`${station.station_name} - ${station.station_type}`}
								</ListItem>
							))}

						</UnorderedList>
					</Box>
				)}
				<MdOutlineSwapVerticalCircle size={35} cursor={'pointer'} onClick={() => {
					setSource(destination);
					setDestination(source);
				}} />

				<InputGroup>
					<InputLeftAddon w={'120px'}>Destination</InputLeftAddon>
					<Input value={destination} onChange={(e) => {
						setDestination(e.target.value);
						setFilteredDestination(filterStations(e.target.value).slice(0, 10));
						if (e.target.value.length != 0) setOpenDestinationStations(true);
						else setOpenDestinationStations(false);

					}} placeholder="To" />
				</InputGroup>
				{openDestinationStations && (
					<Box
						bg='white'
						boxShadow='md'
						border='1px solid gray'
						w='100%'
						p={2}
						mt={1}
						borderRadius="md"
						maxH="150px"
						overflowY="auto"
					>
						<UnorderedList styleType="none">
							{filteredDestination.map((station, index) => (
								<ListItem
									key={index}
									onClick={() => handleDestinationSelection(station.station_name)}
									cursor="pointer"
									p={2}
									borderRadius="md"
									_hover={{ backgroundColor: "teal.100" }}
									_active={{ backgroundColor: "teal.200" }}
								>
									{`${station.station_name} - ${station.station_type}`}
								</ListItem>
							))}

						</UnorderedList>
					</Box>
				)}
				<Button colorScheme="teal" onClick={handleSearch}>Search</Button>
			</VStack>

			{loading1 ? <Loader/> : (
				<Box ml={{ base: '10%', md: '20%', xl: '30%' }} mr={'20px'} mt={4}>
  <Accordion allowMultiple>
    {data1 && sections && sections.map((section, idx) => (
      <AccordionItem key={idx}>
        <h1>
          <AccordionButton
            p={4}
            bg={lineColorMap[section.color]}
            _hover={{ opacity: 0.9 }}
            borderRadius="md"
            color="white"
            style={{
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
            }}
			display={'flex'}
			flexDirection={'column'}
          >
            <Box display="flex" flex="1"  gap={'10px'} justifyContent="space-around">
              <Box textAlign="center">
                {`${data1.at(section.stations[0]).station_name} to ${data1.at(section.stations[section.stations.length - 1]).station_name}`}
              </Box>
              <Box textAlign="center">
                {`${parseFloat(section.distances[section.distances.length - 1]).toFixed(2)} km`}
              </Box>
            </Box>
			<Box
            textAlign="center"
            mt={2}
            color="white"
            fontWeight="bold"
          >
            {section.color === 0 ? 'Railway' : `Metro - ${lineColorMap[section.color]} Line`} 
			<AccordionIcon />
          </Box>
          </AccordionButton>
          </h1>
        <AccordionPanel pb={4}>
		<StationStepper
            stations={section.stations.map(stationId => data1.at(stationId).station_name)}
            distances={section.distances}
            lineColor={lineColorMap[section.color]}
			StepSeparatorValue={80}
          />
        </AccordionPanel>
      </AccordionItem>
    ))}
  </Accordion>
</Box>

			)}
		</>
	);
}
