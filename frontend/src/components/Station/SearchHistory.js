import { Box, Heading, Text, Flex, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

export default function SearchHistory() {
    const trainNumbers = ['12345', '56738', '91011', '12133', '14125'];


    //take the redux station and map the history
    //implement the delete feature
    return (
        <Box>
            <Heading as="h3" size="lg" mb={4}>
                Search History
            </Heading>
            {trainNumbers.length > 0 ? (
                trainNumbers.map((entry, index) => (
                    <Box key={index} mb={3} p={3} border='1px solid gray' borderRadius="md" backgroundColor='white'>
                        <Flex justify="space-between" align="center">
                            <Text>{entry}</Text>
                            <IconButton
                                aria-label="Delete"
                                icon={<DeleteIcon />}
                                variant="outline"
                                colorScheme="red"
                                size="sm"
                            />
                        </Flex>
                    </Box>
                ))
            ) : (
                <Text>No search history available.</Text>
            )}
        </Box>
    );
}
