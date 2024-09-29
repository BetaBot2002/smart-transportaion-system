import { Box, Text, VStack, HStack, Badge } from '@chakra-ui/react';

const TrainInfoCard = ({ data }) => {
    return (
        <Box mt={4} p={6} borderWidth={1} borderRadius="md" bg="white" boxShadow="lg">
            <VStack align="start" spacing={4}>
                <HStack>
                    <Text fontWeight="bold" color="teal.500">
                        Train Number:
                    </Text>
                    <Text>{data.train_no}</Text>
                </HStack>
                <HStack>
                    <Text fontWeight="bold" color="teal.500">
                        Train Name:
                    </Text>
                    <Text>{data.train_name}</Text>
                </HStack>
                <HStack>
                    <Text fontWeight="bold" color="teal.500">
                        From:
                    </Text>
                    <Text>
                        {data.from_stn_name} ({data.from_stn_code})
                    </Text>
                </HStack>
                <HStack>
                    <Text fontWeight="bold" color="teal.500">
                        To:
                    </Text>
                    <Text>
                        {data.to_stn_name} ({data.to_stn_code})
                    </Text>
                </HStack>
                <HStack>
                    <Text fontWeight="bold" color="teal.500">
                        Departure Time:
                    </Text>
                    <Text>{data.from_time}</Text>
                </HStack>
                <HStack>
                    <Text fontWeight="bold" color="teal.500">
                        Arrival Time:
                    </Text>
                    <Text>{data.to_time}</Text>
                </HStack>
                <HStack>
                    <Text fontWeight="bold" color="teal.500">
                        Travel Time:
                    </Text>
                    <Text>{data.travel_time}</Text>
                </HStack>
                <HStack>
                    <Text fontWeight="bold" color="teal.500">
                        Running Days:
                    </Text>
                    <HStack>
                        {data.running_days.split("").map((day, index) => (
                            <Badge key={index} colorScheme={day === '1' ? "green" : "gray"} p={1}>
                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'][index]}
                            </Badge>
                        ))}
                    </HStack>
                </HStack>
                <HStack>
                    <Text fontWeight="bold" color="teal.500">
                        Type:
                    </Text>
                    <Badge colorScheme="purple" p={1}>
                        {data.type}
                    </Badge>
                </HStack>
            </VStack>
        </Box>
    );
}

export default TrainInfoCard;
