import { ChevronDownIcon, Icon } from '@chakra-ui/icons';
import {
    Heading, Input, Box, Text, UnorderedList, ListItem, Button,
    FormControl, FormLabel,
    useToast
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdOutlineSwapVerticalCircle } from "react-icons/md";
import { clearGetshortestPath, getShortestPath } from '../../redux/actions/trainActions';

export default function StationSearch() {
    const [openSourceStations, setOpenSourceStations] = useState(false);
    const [openDestinationStations, setOpenDestinationStations] = useState(false);
    const [filteredSource, setFilteredSource] = useState([]);
    const [filteredDestination, setFilteredDestination] = useState([]);
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();
    const { loading:loading1, error:err1, data = [] } = useSelector(state => state.GetAllStation);
    const {loading:loading2,error:err2,data:stations} = useSelector(state=>state.GetShortestPath)

    const filterStations = (stationInput) => {
        return data
            .filter(station => station.station_name && station.station_name.toLowerCase().startsWith(stationInput.toLowerCase()));
    }


    useEffect(() => {
        if (source.length > 0) {
            setOpenSourceStations(true);
            setOpenDestinationStations(false);
            const stations = filterStations(source);
            setFilteredSource(stations);
        } else {
            setOpenSourceStations(false);
            setFilteredSource([]);
        }
    }, [source, data]); 
    useEffect(() => {
        if (destination.length > 0) {
            setOpenSourceStations(false);
            setOpenDestinationStations(true);
            const stations = filterStations(destination);
            setFilteredDestination(stations);
        } else {
            setOpenDestinationStations(false);
            setFilteredDestination([]);
        }
    }, [destination, data]);

    useEffect(() => {
        if(stations) {
            toast({
                title: 'success',
                description: "data come",
                status: 'success',
                duration: 3000,
                isClosable: true
            })
        }
        if(err2 ) {
            toast({
                title: 'invalid',
                description: err2,
                status: 'error',
                duration: 3000,
                isClosable: true
            })
            dispatch(clearGetshortestPath());
        }
    }, [err2, stations]);
    const handleSourceSelection = (stationName) => {
        setSource(stationName);
        setOpenSourceStations(false);
    }

    const handleDestinationSelection = (stationName) => {
        setDestination(stationName);
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
        dispatch(getShortestPath(source,destination));
    }
    const handleStationSwap = ()=>{
        const temp  = source;
        setSource(destination);
        setDestination(temp);
    }

    return (
        <Box>
            <Heading as="h2" textAlign="center" mb={4}>
                Find Your Route
            </Heading>

            <Box mb={4}>
                <FormControl id="source" mb={4}>
                    <FormLabel>Source</FormLabel>
                    <Input
                        type='text'
                        onChange={(e) => setSource(e.target.value)}
                        value={source}
                        placeholder='Source'
                        autoComplete="off"
                    />
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
                </FormControl>

                <MdOutlineSwapVerticalCircle size={35} cursor={'pointer'} onClick={handleStationSwap}/>

                <FormControl id="destination" mb={4}>
                    <FormLabel>Destination</FormLabel>
                    <Input
                        type='text'
                        onChange={(e) => setDestination(e.target.value)}
                        value={destination}
                        placeholder='Destination'
                        autoComplete="off"
                    />
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
                </FormControl>

                <Button isLoading={loading2?true:false} w='100%' colorScheme="teal" onClick={handleSearch}>
                    Search
                </Button>
            </Box>
        </Box>
    );
}
