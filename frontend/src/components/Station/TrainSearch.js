import { Input, Box, UnorderedList, ListItem, Button, FormControl, FormLabel } from '@chakra-ui/react';
import { useState } from 'react';

const trainNumbers = ['12345', '56738', '91011', '12133', '14125'];

export default function TrainSearch() {
    const [openTrainNumbers, setOpenTrainNumbers] = useState(false);
    const [filteredTrainNumbers, setFilteredTrainNumbers] = useState([]);
    const [trainNo, setTrainNo] = useState('');

    const filterTrainNumbers = (trainInput) => {
        return trainNumbers.filter(train =>
            train.startsWith(trainInput)
        );
    }

    const handleTrainSelection = (train) => {
        setTrainNo(train);
        setOpenTrainNumbers(false);
    }

    const handleSearch = () => {
        console.log(`Searching for train number ${trainNo}`);
    }

    return (
        <Box>
            <FormControl id="trainNo" mb={4}>
                <FormLabel>Train Number</FormLabel>
                <Input
                    type='text'
                    onChange={(e) => {
                        setTrainNo(e.target.value);
                        const trains = filterTrainNumbers(e.target.value);
                        setFilteredTrainNumbers(trains);
                        setOpenTrainNumbers(e.target.value.length > 0);
                    }}
                    value={trainNo}
                    placeholder='Train Number'
                    autoComplete="off"
                />
                {openTrainNumbers && (
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
                            {filteredTrainNumbers.map((train) => (
                                <ListItem
                                    key={train}
                                    onClick={() => handleTrainSelection(train)}
                                    cursor="pointer"
                                    p={2}
                                    borderRadius="md"
                                    _hover={{ backgroundColor: "teal.100" }}
                                    _active={{ backgroundColor: "teal.200" }}
                                >
                                    {train}
                                </ListItem>
                            ))}
                        </UnorderedList>
                    </Box>
                )}
            </FormControl>

            <Button w='100%' colorScheme="teal" onClick={handleSearch}>
                Search
            </Button>
        </Box>
    );
}
