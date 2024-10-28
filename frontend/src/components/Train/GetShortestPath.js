import React, { useState, useEffect } from 'react';
import {
	Box,
	Button,
	Spinner,
	Step,
	StepDescription,
	StepIndicator,
	StepSeparator,
	StepTitle,
	Stepper,
	useSteps,
	Input,
	HStack,
	VStack,
	UnorderedList,
	ListItem,
	useToast,
	InputGroup,
	InputLeftAddon,
	Text
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getShortestPath } from '../../redux/actions/trainActions';
import { MdOutlineSwapVerticalCircle } from 'react-icons/md';

const lineColorMap = {
	Purple: 'purple.500',
	Black: 'black',
	Blue: 'blue.500',
	Green: 'green.500',
	Pink: 'pink.500',
	Orange: 'orange.500',
	blue: 'blue.500',
	black: 'black',
	purple: 'purple.500',
	green: 'green.500',
	pink: 'pink.500',
};

export default function GetShortestPath() {
	const { loading: loading2, error: err2, data: data1 = [] } = useSelector(state => state.GetAllStation);
	const { loading: loading1, error: err1, distanceArray, stationArray, lineColorArray } = useSelector((state) => state.GetShortestPath);
	const [openSourceStations, setOpenSourceStations] = useState(false);
	const [openDestinationStations, setOpenDestinationStations] = useState(false);
	const [filteredSource, setFilteredSource] = useState([]);
	const [filteredDestination, setFilteredDestination] = useState([]);
	const dispatch = useDispatch();
	const toast = useToast();
	const { activeStep } = useSteps({
		count: stationArray?.length || 0,
	});
	const [source, setSource] = useState('');
	const [destination, setDestination] = useState('');

	useEffect(() => {
		if (stationArray?.length) {
			setSource(data1.at(stationArray[0]).station_name);
			setDestination(data1.at(stationArray.at(-1)).station_name);
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

	const filterStations = (stationInput) => data1.filter(station =>
		station.station_name && station.station_name.toLowerCase().startsWith(stationInput.toLowerCase())
	);

	const handleSourceSelection = (stationName) => {
		setSource(stationName);
		setOpenSourceStations(false);
	};

	const handleDestinationSelection = (stationName) => {
		setDestination(stationName);
		setOpenDestinationStations(false);
	};

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

	const handleStationSwap = () => {
		setSource(destination);
		setDestination(source);
	};

	return (
		<>
			<VStack m={4} display={'flex'} justifyContent={'center'} alignItems="center">
				{/* Source Input */}
				<InputGroup>
					<InputLeftAddon w={'120px'}>Source</InputLeftAddon>
					<Input
						maxW={'100%'}
						value={source}
						onChange={(e) => {
							setSource(e.target.value);
							setFilteredSource(filterStations(e.target.value).slice(0, 9));
							setOpenSourceStations(e.target.value.length !== 0);
						}}
						placeholder='From'
					/>
				</InputGroup>
				{openSourceStations && (
					<Box bg='white' boxShadow={'0 0 8px rgba(0, 0, 0, 0.2)'} border='1px solid gray' w='100%' p={2} mt={1} borderRadius="md" maxH="150px" overflowY="auto">
						<UnorderedList styleType="none">
							{filteredSource.map((station, index) => (
								<ListItem key={index} onClick={() => handleSourceSelection(station.station_name)} cursor="pointer" p={2} borderRadius="md" _hover={{ backgroundColor: "teal.100" }} _active={{ backgroundColor: "teal.200" }}>
									{`${station.station_name} - ${station.station_type}`}
								</ListItem>
							))}
						</UnorderedList>
					</Box>
				)}
				<MdOutlineSwapVerticalCircle size={35} cursor={'pointer'} onClick={handleStationSwap} />

				{/* Destination Input */}
				<InputGroup>
					<InputLeftAddon w={'120px'}>Destination</InputLeftAddon>
					<Input
						maxW={'100%'}
						placeholder="To"
						value={destination}
						onChange={(e) => {
							setDestination(e.target.value);
							setFilteredDestination(filterStations(e.target.value).slice(0, 9));
							setOpenDestinationStations(e.target.value.length !== 0);
						}}
					/>
				</InputGroup>

				{openDestinationStations && (
					<Box bg='white' boxShadow={'0 0 8px rgba(0, 0, 0, 0.2)'} border='1px solid gray' w='100%' p={2} mt={1} borderRadius="md" maxH="150px" overflowY="auto">
						<UnorderedList styleType="none">
							{filteredDestination.map((station, index) => (
								<ListItem key={index} onClick={() => handleDestinationSelection(station.station_name)} cursor="pointer" p={2} borderRadius="md" _hover={{ backgroundColor: "teal.100" }} _active={{ backgroundColor: "teal.200" }}>
									{`${station.station_name} - ${station.station_type}`}
								</ListItem>
							))}
						</UnorderedList>
					</Box>
				)}
				<Button colorScheme="teal" onClick={handleSearch}>
					Search
				</Button>
			</VStack>

			{/* Display Shortest Path Results */}
			{loading1 ? (
				<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
					<Spinner size="xl" />
				</Box>
			) : (
				distanceArray && stationArray && lineColorArray && (
					<Box ml={{ base: '10%', md: '20%', xl: '30%' }} mr={'20px'} mt={4}>
						<Box maxW={'500px'} border={'5px solid teal'} borderRadius={'9px'} boxShadow={'0 0 8px rgba(0, 0, 0, 0.2)'}>
							<Text fontSize="xl" fontWeight="bold" textAlign="center" mb={4}>
								Total Distance: {distanceArray.at(-1)} km
							</Text>
							<Stepper index={activeStep} orientation="vertical" size="lg">
								{stationArray.map((stationIndex, index) => {
									const { station_name, station_type, line_color_code: lineColors } = data1.at(stationIndex);
									const boxStyle = lineColors.length > 1 ? {
										bgGradient: `linear(to-r, ${lineColors.map(color => lineColorMap[color] || 'gray.400').join(', ')})`,
									} : {
										bg: lineColorMap[lineColors[0]] || 'gray.400',
									};

									return (
										<Step key={index}>
											<StepIndicator boxSize={8} borderRadius="50%" bg="teal.500" color="white" fontWeight="bold">
												{index + 1}
											</StepIndicator>
											<Box flexShrink="0" p={2} borderRadius="md" shadow="md" {...boxStyle}>
												<StepTitle fontSize="lg" fontWeight="bold" color="white">
													{station_name}
												</StepTitle>
												<StepDescription fontSize="md" color="whiteAlpha.800">
													Lines: {lineColors.join(', ')}
												</StepDescription>
											</Box>
											{index < stationArray.length - 1 && (
												<StepSeparator sx={{ width: '5px', height: '100%', borderRadius: 'md', bgGradient: 'linear(to-b, teal.400, teal.200)' }} />
											)}
										</Step>
									);
								})}
							</Stepper>
						</Box>
					</Box>
				)
			)}
		</>
	);
}
