import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, useToast, Flex } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Loader } from '../../utils/Loader';
import { getTrainRoute } from '../../redux/actions/trainActions';
import StationStepper from './StationStepper';

const TrainRoutePath = () => {
    const { trainNo: params } = useParams();
    const [trainNo, setTrainNo] = useState(params);
    const dispatch = useDispatch();
    const toast = useToast();

    const { loading, data, err } = useSelector((state) => state.GetTrainStatus);

    useEffect(() => {
        dispatch(getTrainRoute(trainNo));
    }, [dispatch, trainNo]);

    useEffect(() => {
        if (err) {
            toast({
                title: 'Error',
                description: err,
                status: 'error',
                duration: 3000,
                isClosable: true
            });
        }
    }, [err, toast]);

    if (loading) return <Loader />;

    const source = data ? data[0]?.source_stn_name : 'N/A';
    const destination = data ? data.at(data.length - 1)?.source_stn_name : 'N/A';

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            p={4}
            maxW="600px"
            mx="auto"
        >
            <Heading
                as="h2"
                size="xl"
                mb={6}
                textAlign="center"
                color="teal.500"
            >
                Train Number: {trainNo}
            </Heading>
            <Text fontSize="lg" mb={2} textAlign="center">
                Source: {source}
            </Text>
            <Text fontSize="lg" mb={4} textAlign="center">
                Destination: {destination}
            </Text>
            <Flex
                width="100%"
                justifyContent="center"
                alignItems="center"
                maxW="600px"
                mx="auto"
                border="1px"
                borderColor="gray.300"
                borderRadius="md"
                boxShadow="lg"
                p={4}
            >
                {data ? (
                    <StationStepper
                        stations={data.map(station => station.source_stn_name)}
                        distances={data.map(station => station.distance)}
                        lineColor="black"
                        arriveTimes={data.map(station => station.arrive)}
                        departTimes={data.map(station => station.depart)}
                    />
                ) : (
                    <p>No data available for this train.</p>
                )}
            </Flex>
        </Box>
    );
};

export default TrainRoutePath;
