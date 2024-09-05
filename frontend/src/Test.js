import {
    Box, Button, Text, Heading,
    Collapse, Avatar, Stack, Divider,
    FormControl,useDisclosure,
    FormLabel,useEditableControls,
    Switch
} from '@chakra-ui/react';
import { UserDetailsTable } from './components/Dashboard/UserDetailsTable';
export default function UserProfile() {
    const isAdmin = true;
    const user = {
        name: 'John Doe',
        username: 'john_doe123',
        email: 'johndoe@example.com',
        phoneNumber: 2242829842,
        role: 'admin', // change to 'user' to see the regular user view
        favouriteRoutes: ['Station A to Station B', 'Station C to Station D'],
    };

    const {
        isOpen: isOpenPersonalInformation,
        onToggle: onTogglePersonalInformation,
    } = useDisclosure();

    const {
        isOpen: isOpenAccountActions,
        onToggle: onToggleAccountActions,
    } = useDisclosure();

    const {
        isOpen: isOpenAdminActions,
        onToggle: onToggleAdminActions,
    } = useDisclosure();

    return (
        <Box p={4} maxW="lg" mx="auto">
            <Stack spacing={3}>
                <Box textAlign="center">
                    <Avatar size="xl" name={user.name} />
                    <Heading as="h2" mt={4}>{user.name}</Heading>
                    <Text fontSize="lg" color="gray.600">{user.email}</Text>
                    <Text fontSize="sm" color="gray.500">{user.role}</Text>
                </Box>
                <FormControl justifyContent='center' display='flex' alignItems='center'>
                    <FormLabel htmlFor='email-alerts' mb='0'>
                        Enable email alerts?
                    </FormLabel>
                    <Switch id='email-alerts' />
                </FormControl>
                <Box>
                    <Heading textAlign="center" as="h3" size="md" mb={4}>
                        <Button onClick={onTogglePersonalInformation}>Personal Information</Button>
                    </Heading>
                    <Collapse in={isOpenPersonalInformation} animateOpacity>
                        <UserDetailsTable/>
                    </Collapse>
                </Box>

                <Box>
                    <Heading textAlign="center" as="h3" size="md" mb={4}>
                        <Button onClick={onToggleAccountActions}>Account Actions</Button>
                    </Heading>
                    <Collapse in={isOpenAccountActions} animateOpacity>
                        <Stack spacing={2}>
                            <Button colorScheme="teal">Update Profile</Button>
                            <Button colorScheme="teal">Change Password</Button>
                            <Button colorScheme="teal">View Saved Routes</Button>
                            <Button colorScheme="red">Logout</Button>
                        </Stack>
                    </Collapse>
                </Box>

                {isAdmin && (
                    <>
                        <Box>
                            <Heading textAlign="center" as="h3" size="md" mb={4}>
                                <Button onClick={onToggleAdminActions}>Admin Actions</Button>
                            </Heading>
                            <Collapse in={isOpenAdminActions} animateOpacity>
                                <Stack spacing={2}>
                                    <Button colorScheme="teal">Manage Users</Button>
                                    <Button colorScheme="teal">Add New Station</Button>
                                    <Button colorScheme="teal">View All Stations</Button>
                                    <Button colorScheme="red">Delete Station</Button>
                                    <Button colorScheme="teal">User Role Management</Button>
                                </Stack>
                            </Collapse>
                        </Box>
                    </>
                )}
            </Stack>
        </Box>
    );
}
