import {
    Box, Flex, Text, IconButton, Collapse, useDisclosure,
    Heading,
    Spinner,
} from '@chakra-ui/react';
import { DeleteIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';

export default function UserList() {
    const [expandedIndex, setExpandedIndex] = useState(-1);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading, allUsers,singleUser,error} = useSelector(state=>state.GetAllUser);

    const handleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? -1 : index);
    };
    
    const handleDelete = (user, index) => {
        // Implement your delete logic here, such as dispatching an action or making an API call.
        console.log("Deleting user:", user);
    };

    return (
        <>
        <Heading textAlign={'center'}>
            All Users
        </Heading>
        <Box p={4} mt={15} mx={'auto'} maxW={'xl'}>
            {loading ? 
                <Spinner display={'flex'} alignItems={'center'} justifyContent={'center'} size={'xl'}/>
            : allUsers && allUsers.length > 0 ? (
                allUsers.map((user, index) => (
                    <Box key={index} mb={3} p={3} border='1px solid gray' borderRadius="md" backgroundColor='white'>
                        <Flex justify="space-between" align="center">
                            <Flex flexDirection="column">
                                <Text>{user.username}</Text> 
                                <Text>{user.email}</Text> 
                            </Flex>
                            <Flex>
                                <IconButton
                                    aria-label="Expand"
                                    icon={expandedIndex === index ? <ChevronUpIcon /> : <ChevronDownIcon />}
                                    variant="outline"
                                    colorScheme="teal"
                                    size="sm"
                                    onClick={() => handleExpand(index)}
                                    mr={2}
                                />
                                <IconButton
                                    aria-label="Delete"
                                    icon={<DeleteIcon />}
                                    variant="outline"
                                    colorScheme="red"
                                    size="sm"
                                    onClick={() => handleDelete(user, index)}
                                />
                            </Flex>
                        </Flex>
                        <Collapse in={expandedIndex === index} animateOpacity>
                            {/* Add more detailed information about the user here */}
                            <Text mt={3}>More details about {user.username}</Text>
                        </Collapse>
                    </Box>
                ))
            ) : (
                <Text>No users available.</Text>
            )}
        </Box>
        </>
    );
}
