import { Box, Heading, Text, Flex, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

export default function SearchHistory() {
    const trainNumbersWithNames = ['12345 Sealdah-Gede local', '56738 Sealdah-Shantipur local','91011 Sealdah-Dum Dum local', '12133 Sealdah-Gede local', '14125 Sealdah-Naihati local'];

    const weekdayLetter = ['S ','M ','T ','W ','T ','F ','S '];
    //take the redux station and map the history
    //implement the delete feature
    return (
        <Box>
            <Heading as="h3" size="lg" mb={4}>
                Search History
            </Heading>
            {trainNumbersWithNames.length > 0 ? (
                trainNumbersWithNames.map((entry, index) => (
                    <Box key={index} mb={3} p={3} border='1px solid gray' borderRadius="md" backgroundColor='white'>
                        <Flex justify="space-between" align="center">
                            <Flex flexDirection={'column'}>
                                <Text>{entry}</Text>
                                <Flex>{weekdayLetter.map((letter)=> <Text fontSize={15}>{letter}</Text> )}</Flex>
                            </Flex>
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
