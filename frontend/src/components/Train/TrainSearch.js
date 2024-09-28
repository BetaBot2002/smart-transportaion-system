import { Input, Box, UnorderedList, ListItem, Button, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrainStatus } from '../../redux/actions/trainActions';
import { useNavigate } from 'react-router-dom';
import TrainInfoCard from "./TrainInfoCard.js"
const trainNumbers = ['12345', '56738', '91011', '12133', '14125'];

export default function TrainSearch() {
    const [openTrainNumbers, setOpenTrainNumbers] = useState(false);
    const [filteredTrainNumbers, setFilteredTrainNumbers] = useState([]);
    const [trainNo, setTrainNo] = useState('');
    const [trainStatus, settrainStatus] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();
    const { loading, data, error } = useSelector(state => state.GetTrainStatus)
    const filterTrainNumbers = (trainInput) => {
        return trainNumbers.filter(train =>
            train.startsWith(trainInput)
        );
    }

    const handleTrainSelection = (train) => {
        setTrainNo(train);
        setOpenTrainNumbers(false);
    }
    useEffect(() => {
        if (data) {
            toast({
                title: 'Success',
                description: "Status found",
                status: 'success',
                duration: 3000,
                isClosable: true
            })
        }
        if (error) {
            toast({
                title: 'invalid',
                description: error,
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        }
    }, [data, error])
    const handleSearch = () => {
        setOpenTrainNumbers(false);
        dispatch(getTrainStatus(trainNo));
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

            <Button isLoading={loading ? true : false} w='100%' colorScheme="teal" onClick={handleSearch}>
                Search
            </Button>
            {data && data.train && data.train.data &&  data.train.success? (
                <TrainInfoCard  data={data.train.data}/>
            ):(
                <h2>No train found</h2>
            )}
        </Box>
    );
}
