import { Box, Step, StepIndicator, StepSeparator, Stepper, Text, Table, Tbody, Tr, Td } from '@chakra-ui/react';

const StationStepper = ({ stations, distances, arriveTimes, departTimes, lineColor }) => {
  return (
    <Stepper
      orientation="vertical"
      colorScheme={lineColor}
      size="lg"
      spacing={6}
      mb={4}
    >
      {stations.map((station, index) => {
        const arriveTime = arriveTimes && arriveTimes[index];
        const departTime = departTimes && departTimes[index];

        return (
          <Step key={index}>
            <StepIndicator
              bgColor={lineColor}
              borderColor="white"
              color="white"
              p={2}
              borderRadius="50%"
            >
              {index + 1}
            </StepIndicator>
            <Box ml={6}>
              <Table variant="simple" width="100%">
                <Tbody>
                  <Tr>
                    <Td textAlign="left">
                      <Text fontWeight="bold">{station}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {`Distance: ${parseFloat(distances[index]).toFixed(2)} km`}
                      </Text>
                    </Td>
                    <Td textAlign="right">
                      {arriveTime && (
                        <Text fontSize="sm" color="gray.500">
                          {`Arrive: ${arriveTime}`}
                        </Text>
                      )}
                      {departTime && (
                        <Text fontSize="sm" color="gray.500">
                          {`Depart: ${departTime}`}
                        </Text>
                      )}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>

            {index < stations.length - 1 && (
              <StepSeparator>
                <Box
                  width="5px"
                  height="40px"
                  bg={lineColor}
                  borderRadius="md"
                  mx="auto"
                />
              </StepSeparator>
            )}
          </Step>
        );
      })}
    </Stepper>
  );
};

export default StationStepper;
