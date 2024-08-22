import { ChevronDownIcon } from '@chakra-ui/icons';
import {
    Heading,
    Input,
    Box,
    Text,
    UnorderedList,
    ListItem,
    Button,
    FormControl,
    FormLabel
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const stationNames = ['aab', 'abab', 'aaabbb', 'bbaa', 'baba'];

export default function StationSearch() {
    const [openSourceStations, setOpenSourceStations] = useState(false);
    const [openDestinationStations, setOpenDestinationStations] = useState(false);
    const [filteredSource, setFilteredSource] = useState([]);
    const [filteredDestination, setFilteredDestination] = useState([]);
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');

    const filterStations = (stationInput) => {
        return stationNames.filter(station =>
            station.toLowerCase().startsWith(stationInput.toLowerCase())
        );
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

        if (destination.length > 0) {
            setOpenSourceStations(false);
            setOpenDestinationStations(true);
            const stations = filterStations(destination);
            setFilteredDestination(stations);
        } else {
            setOpenDestinationStations(false);
            setFilteredDestination([]);
        }
    }, [source, destination]);

    const handleSourceSelection = (station) => {
        setSource(station);
        setOpenSourceStations(false);
    }

    const handleDestinationSelection = (station) => {
        setDestination(station);
        setOpenDestinationStations(false);
    }

    const handleSearch = () => {
        alert(`Searching from ${source} to ${destination} on ${date}`);
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
                                {filteredSource.map((station) => (
                                    <ListItem
                                        key={station}
                                        onClick={() => handleSourceSelection(station)}
                                        cursor="pointer"
                                        p={2}
                                        borderRadius="md"
                                        _hover={{ backgroundColor: "teal.100" }}
                                        _active={{ backgroundColor: "teal.200" }}
                                    >
                                        {station}
                                    </ListItem>
                                ))}
                            </UnorderedList>
                        </Box>
                    )}
                </FormControl>

                <Text p={3} align='center'>-- To --</Text>

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
                                {filteredDestination.map((station) => (
                                    <ListItem
                                        key={station}
                                        onClick={() => handleDestinationSelection(station)}
                                        cursor="pointer"
                                        p={2}
                                        borderRadius="md"
                                        _hover={{ backgroundColor: "teal.100" }}
                                        _active={{ backgroundColor: "teal.200" }}
                                    >
                                        {station}
                                    </ListItem>
                                ))}
                            </UnorderedList>
                        </Box>
                    )}
                </FormControl>

                <FormControl id="date" mb={4}>
                    <FormLabel>Date</FormLabel>
                    <Input
                        type='date'
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                    />
                </FormControl>

                <Button w='100%' colorScheme="teal" onClick={handleSearch}>
                    Search
                </Button>
            </Box>
        </Box>
    );
}
