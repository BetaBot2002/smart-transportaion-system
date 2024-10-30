// import { Box, Button, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
// import {ExternalLinkIcon} from "@chakra-ui/icons"

// export default function ViewFavouriteRoutes() {
//     const StationRoutes = [
//         {
//             from: "Station A",
//             to: "Station B",
//             distance: "10 km",
//             duration: "15 mins"
//         },
//         {
//             from: "Station C",
//             to: "Station D",
//             distance: "20 km",
//             duration: "25 mins"
//         },
//         {
//             from: "Station E",
//             to: "Station F",
//             distance: "30 km",
//             duration: "35 mins"
//         },
//         {
//             from: "Station G",
//             to: "Station H",
//             distance: "40 km",
//             duration: "45 mins"
//         },
//         {
//             from: "Station I",
//             to: "Station J",
//             distance: "50 km",
//             duration: "55 mins"
//         }
//     ];

//     return (
//         <Box
//             p={4}
//             border={'1px solid'}
//             borderColor={'gray.200'}
//             rounded={'md'}
//             boxShadow={'sm'}
//             maxW={{ base: '100%', md: '80%', lg: '60%' }}
//             mx={'auto'}
//             overflowX={'auto'} // Horizontal scroll enabled
//             sx={{
//                 scrollbarWidth: 'auto', // For Firefox
//                 scrollbarColor: '#3182ce #f1f1f1',
//                 '&::-webkit-scrollbar': {
//                     height: '16px', // Height of the scrollbar for better interaction
//                     background: '#f1f1f1',
//                 },
//                 '&::-webkit-scrollbar-thumb': {
//                     background: '#3182ce',
//                     borderRadius: '10px',
//                     border: '3px solid #f1f1f1',
//                 },
//             }}
//         >
//             <Heading textAlign={'center'} fontSize={{ base: 'xl', md: "2xl", lg: "3xl" }} mb={4}>
//                 View Favourite Routes
//             </Heading>

//             <TableContainer>
//                 <Table variant='striped' colorScheme='white' width={'100%'}>
//                     <Thead>
//                         <Tr>
//                             <Th>Go</Th>
//                             <Th>Source</Th>
//                             <Th>Destination</Th>
//                             <Th>Distance</Th>
//                             <Th>Action</Th>
//                         </Tr>
//                     </Thead>
//                     <Tbody>
//                         {StationRoutes.map((StationRoute, index) => (
//                             <Tr key={index}>
//                                 <Td><ExternalLinkIcon/></Td>
//                                 <Td>{StationRoute.from}</Td>
//                                 <Td>{StationRoute.to}</Td>
//                                 <Td>{StationRoute.distance}</Td>
//                                 <Td>
//                                     <Button colorScheme="teal" size="sm">
//                                         Remove
//                                     </Button>
//                                 </Td>
//                             </Tr>
//                         ))}
//                     </Tbody>
//                 </Table>
//             </TableContainer>
//         </Box>
//     )
// }
import { Box, Button, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";

export default function ViewFavouriteRoutes() {
    const { user } = useSelector(state => state.GetUser);
    const favouriteRoutes = user?.favouriteRoutes || [];

    return (
        <Box
            p={4}
            border={'1px solid'}
            borderColor={'gray.200'}
            rounded={'md'}
            boxShadow={'sm'}
            maxW={{ base: '100%', md: '80%', lg: '60%' }}
            mx={'auto'}
            overflowX={'auto'}
            sx={{
                scrollbarWidth: 'auto', 
                scrollbarColor: '#3182ce #f1f1f1',
                '&::-webkit-scrollbar': {
                    height: '16px', 
                    background: '#f1f1f1',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#3182ce',
                    borderRadius: '10px',
                    border: '3px solid #f1f1f1',
                },
            }}
        >
            <Heading textAlign={'center'} fontSize={{ base: 'xl', md: "2xl", lg: "3xl" }} mb={4}>
                View Favourite Routes
            </Heading>

            <TableContainer>
                <Table variant='striped' colorScheme='white' width={'100%'}>
                    <Thead>
                        <Tr>
                            <Th>Go</Th>
                            <Th>Source</Th>
                            <Th>Destination</Th>
                            <Th>Distance</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {favouriteRoutes.map((route, index) => (
                            <Tr key={index}>
                                <Td><ExternalLinkIcon /></Td>
                                <Td>{route[0]}</Td>
                                <Td>{route[1]}</Td>
                                <Td>{"--"}</Td>
                                <Td>
                                    <Button colorScheme="teal" size="sm">
                                        Remove
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}
