// StationStepper.js
import { Box, Step, StepIndicator, StepSeparator, StepStatus, Stepper, Text } from '@chakra-ui/react';

const StationStepper = ({ stations, distances, lineColor }) => {
  return (
    <Stepper
      orientation="vertical"
      colorScheme={lineColor}
      size="lg"
      spacing={6}
      mb={4}
    >
      {stations.map((station, index) => (
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
            <Text fontWeight="bold">{station.station_name}</Text>
            <Text fontSize="sm" color="gray.500">
              {`Distance: ${distances[index]} km`}
            </Text>
          </Box>
          <StepSeparator>
            <Box
              width="5px"
              height={90}
              bg={lineColor}
              borderRadius="md"
              mx="auto"
            />
          </StepSeparator>

        </Step>
      ))}
    </Stepper>
  );
};

export default StationStepper;
