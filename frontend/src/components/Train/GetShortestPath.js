import React, { useState, useEffect, useRef } from 'react';
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
	const { loading: loading1, error: err1, distance, route } = useSelector((state) => state.GetShortestPath);
	const [openSourceStations, setOpenSourceStations] = useState(false);
	const [openDestinationStations, setOpenDestinationStations] = useState(false);
	const [filteredSource, setFilteredSource] = useState([]);
	const [filteredDestination, setFilteredDestination] = useState([]);
	const dispatch = useDispatch();
	const toast = useToast();
	const { activeStep } = useSteps({
		count: route?.length || 0,
	});
	const [gap, setGap] = useState(3);
	const [source, setsource] = useState(route ? data1.at(route.at(0)).station_name : "");
	const [destination, setdestination] = useState(route ? data1.at(route.at(-1)).station_name : "");

	useEffect(() => {
		if (route) {
			setsource(data1.at(route.at(0)).station_name);
			setdestination(data1.at(route.at(route.length - 1)).station_name);
		}
		if (err1) {
			toast({
				title: 'invalid',
				description: err1,
				status: 'error',
				duration: 3000,
				isClosable: true
			})
		}
	}, [route, err1]);

	const filterStations = (stationInput) => {
		return data1
			.filter(station => station.station_name && station.station_name.toLowerCase().startsWith(stationInput.toLowerCase()));
	}


	const handleSourceSelection = (stationName) => {
		setsource(stationName);
		setOpenSourceStations(false);
	}

	const handleDestinationSelection = (stationName) => {
		setdestination(stationName);
		setOpenDestinationStations(false);
	}



	const handleSearch = () => {
		if (source === '' || destination === '') {
			toast({
				title: 'invalid',
				description: "Enter source or destination",
				status: 'error',
				duration: 3000,
				isClosable: true
			})
			return;
		}
		dispatch(getShortestPath(source, destination));
	}
	const handleStationSwap = () => {
		const temp = source;
		setsource(destination);
		setdestination(temp);
	}

	return (
		<>
			<VStack m={4} display={'flex'} justifyContent={'center'} alignItems="center">
				<InputGroup>
					<InputLeftAddon w={'120px'}>Source</InputLeftAddon>
					<Input
						maxW={'100%'}

						value={source}
						onChange={(e) => {
							setsource(e.target.value)
							setFilteredSource(filterStations(e.target.value).slice(0, 9))
							if (e.target.value.length != 0) setOpenSourceStations(true);
							else setOpenSourceStations(false);
						}}
						placeholder='From'
					/>
				</InputGroup>

				{openSourceStations && (
					<Box
						bg='white'
						boxShadow={'0 0 8px rgba(0, 0, 0, 0.2)'}
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
				<MdOutlineSwapVerticalCircle size={35} cursor={'pointer'} onClick={handleStationSwap} />

				<InputGroup>
					<InputLeftAddon w={'120px'}>Destination</InputLeftAddon>
					<Input
						maxW={'100%'}
						placeholder="To"
						value={destination}
						onChange={(e) => {
							setdestination(e.target.value);
							setFilteredDestination(filterStations(e.target.value).slice(0, 9));
							if (e.target.value.length != 0) setOpenDestinationStations(true);
							else setOpenDestinationStations(false);
						}}
					/>
				</InputGroup>

				{openDestinationStations && (
					<Box
						bg='white'
						boxShadow={'0 0 8px rgba(0, 0, 0, 0.2)'}
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
				<Button colorScheme="teal" onClick={handleSearch}>
					Search
				</Button>
			</VStack>
			{loading1 ? (
				<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
					<Spinner size="xl" />
				</Box>
			) : (
				route && <Box ml={{ base: '10%', md: '20%', xl: '30%' }} mr={'20px'} mt={4}>
					
					<Box maxW={'500px'} border={'5px solid teal'} borderRadius={'9px'} boxShadow={'0 0 8px rgba(0, 0, 0, 0.2)'}>
					<Text fontSize="xl" fontWeight="bold" textAlign="center" mb={4}>
						Total Distance: {distance} km
					</Text>
						<Stepper
							index={activeStep}
							orientation="vertical"
							gap={gap}
							size="lg"
							height="100%"
						>
							{route?.map((stationIndex, index) => {
								const { line_color_code: lineColors, station_name, station_type } = data1.at(stationIndex);
								const boxStyle = lineColors.length > 1
									? {
										bgGradient: `linear(to-r, ${lineColors
											.map((color) => lineColorMap[color] || 'gray.400')
											.join(', ')})`,
									}
									: {
										bg: lineColorMap[lineColors[0]] || 'gray.400',
									};

								return (
									<Step key={index}>
										<StepIndicator
											boxSize={8}
											borderRadius="50%"
											bg="teal.500"
											color="white"
											fontWeight="bold"
										>
											{index + 1}
										</StepIndicator>

										<Box maxW={'100%'} flexShrink="0" p={2} borderRadius="md" shadow="md" {...boxStyle}>
											<StepTitle fontSize="lg" fontWeight="bold" color="white">
												{station_name}
											</StepTitle>
											<StepDescription fontSize="md" color="whiteAlpha.800">
												Lines: {lineColors.join(', ')}
											</StepDescription>
										</Box>

										{index < route.length - 1 && (
											<Box
												height="10px"
												display="flex"
												justifyContent="center"
												alignItems="center"
											>
												<StepSeparator
													sx={{
														width: '5px',
														height: '100%',
														borderRadius: 'md',
														bgGradient: 'linear(to-b, teal.400, teal.200)',
													}}
												/>
											</Box>
										)}
									</Step>
								);
							})}
						</Stepper>
					</Box>
				</Box>)}
		</>
	)

}