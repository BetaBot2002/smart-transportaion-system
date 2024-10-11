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
	InputLeftAddon
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
	Orange:'orange.500',
	blue: 'blue.500',
	black: 'black',
	purple: 'purple.500',
	green: 'green.500',
	pink: 'pink.500',
};

export default function GetShortestPath() {
	const { loading: loading2, error: err2, data: data1 = [] } = useSelector(state => state.GetAllStation);
	const { loading: loading1, error: err1, data } = useSelector((state) => state.GetShortestPath);
	const [openSourceStations, setOpenSourceStations] = useState(false);
	const [openDestinationStations, setOpenDestinationStations] = useState(false);
	const [filteredSource, setFilteredSource] = useState([]);
	const [filteredDestination, setFilteredDestination] = useState([]);
	const hasMounted = useRef(0);
	const dispatch = useDispatch();
	const toast = useToast();
	const [stations, setStations] = useState(null);
	const { activeStep } = useSteps({
		count: stations?.path?.length || 0,
	});
	const [gap, setGap] = useState(5);
	const [source, setsource] = useState(stations ? stations.path.at(0).at(0) : "");
	const [destination, setdestination] = useState(stations ? stations.path.at(stations.path.length - 1).at(0) : "");

	useEffect(() => {
		if (data && data.length > 0) {
			setStations(data[0]);
			setsource(data.at(0).path.at(0).at(0));
			setdestination(data.at(0).path.at(data[0].path.length - 1).at(0));
		}

	}, [data]);

	const filterStations = (stationInput) => {
		return data1
			.filter(station => station.station_name && station.station_name.toLowerCase().startsWith(stationInput.toLowerCase()));
	}

	useEffect(() => {
		if (err1) {
			toast({
				title: 'invalid',
				description: err1,
				status: 'error',
				duration: 3000,
				isClosable: true
			})
		}
	}, [err1]);
	useEffect(() => {

		if (source.length > 0) {
			setOpenSourceStations(true);
			setOpenDestinationStations(false);
			const stationss = filterStations(source);
			setFilteredSource(stationss);
		} else {
			setOpenSourceStations(false);
			setFilteredSource([]);
		}
	}, [source]);
	useEffect(() => {

		if (destination.length > 0) {
			setOpenSourceStations(false);
			setOpenDestinationStations(true);
			const stationss = filterStations(destination);
			setFilteredDestination(stationss);
		} else {
			setOpenDestinationStations(false);
			setFilteredDestination([]);
		}
	}, [destination]);


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
		loading1 ? (
			<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
				<Spinner size="xl" />
			</Box>
		) : (
			<>
			<VStack m={4} display={'flex'} justifyContent={'center'} alignItems="center">
					<InputGroup>
						<InputLeftAddon w={'120px'}>Source</InputLeftAddon>
						<Input
							maxW={'100%'}

							value={source}
							onChange={(e) => setsource(e.target.value)}
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
                <MdOutlineSwapVerticalCircle size={35} cursor={'pointer'} onClick={handleStationSwap}/>

					<InputGroup>
						<InputLeftAddon w={'120px'}>Destination</InputLeftAddon>
						<Input
							maxW={'100%'}
							placeholder="To"
							value={destination}
							onChange={(e) => setdestination(e.target.value)}
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
			{stations && <Box ml={{ base: '10%', md: '20%', xl: '30%' }} mr={'20px'} mt={4}>
				<Box maxW={'500px'} border={'5px solid teal'} borderRadius={'9px'} boxShadow={'0 0 8px rgba(0, 0, 0, 0.2)'}>
					<Stepper
						index={activeStep}
						orientation="vertical"
						gap={gap}
						size="lg"
						height="100%"
					>
						{stations?.path?.map(([stationName, lineColors], index) => {
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
											{stationName}
										</StepTitle>
										<StepDescription fontSize="md" color="whiteAlpha.800">
											Lines: {lineColors.join(', ')}
										</StepDescription>
									</Box>

									{index < stations.path.length - 1 && (
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
			</Box>}
			</>
		)
	);
}