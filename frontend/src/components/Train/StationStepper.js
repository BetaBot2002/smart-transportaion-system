import {
  Box,
  Step,
  StepIndicator,
  StepSeparator,
  Stepper,
  Text,
  Table,
  Tbody,
  Tr,
  Td,
  Heading,
} from '@chakra-ui/react';
import { convertTo12HourFormat } from '../../utils/convertTo12HourFormat';

const StationStepper = ({ stations, distances, arriveTimes, departTimes, lineColor, date, dayOfWeek }) => {
  
  return (
    <>
    { dayOfWeek && 
      <Heading as="h2" fontSize={{ base: 'md', md: 'lg' }} color="black" textAlign="center" mb={{ base: 2, md: 4 }}>
        Date: {dayOfWeek}
      </Heading>
      }
      <Table variant="simple" width="100%">
        <Tbody>
          {stations.map((station, index) => {
            const arriveTime = arriveTimes && arriveTimes[index] ? convertTo12HourFormat(arriveTimes[index]) : null;
            const departTime = departTimes && departTimes[index] ? convertTo12HourFormat(departTimes[index]) : null;

            return (
              <Tr key={index}>
                <Td width="10px" padding={{ base: 1, md: 2 }}>
                  <Stepper orientation="vertical" colorScheme={lineColor}>
                    <Step>
                      <StepIndicator
                        bgColor={lineColor}
                        borderColor="white"
                        color="white"
                        borderRadius="50%"
                        fontSize="lg"
                      >
                        {index + 1}
                      </StepIndicator>
                    </Step>
                  </Stepper>
                </Td>

                <Td textAlign="left" padding={{ base: 1, md: 2 }} fontSize={'lg'}>
                  <Text fontWeight="bold" isTruncated maxWidth={{ base: '120px', md: '140px' }}>
                    {station}
                  </Text>
                  <Text fontSize="md" color="gray.500">
                    {`${parseFloat(distances[index]).toFixed(2)} km`}
                  </Text>
                </Td>

                <Td textAlign="right" padding={{ base: 1, md: 2 }} fontSize={'lg'}>
                  {arriveTime && (
                    <Text fontSize="md" fontWeight="bold" color="gray.700">
                      {`Arrive: ${arriveTime}`}
                    </Text>
                  )}
                  {departTime && (
                    <Text fontSize="md" fontWeight="bold" color="gray.700">
                      {`Depart: ${departTime}`}
                    </Text>
                  )}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};

export default StationStepper;
