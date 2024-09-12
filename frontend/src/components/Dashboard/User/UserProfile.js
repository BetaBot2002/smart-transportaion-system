import {
    Box, Button, Text, Heading,
    Collapse, Avatar, Stack, Divider,
    FormControl, useDisclosure,
    FormLabel,
    Switch
} from '@chakra-ui/react';

import { UserDetailsTable } from './UserDetailsTable.js';

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
            <Stack spacing={6}>
                {/* User Information */}
                <Box textAlign="center">
                    <Avatar size="xl" name={user.name} />
                    <Heading as="h2" mt={4}>{user.name}</Heading>
                    <Text fontSize="lg" color="gray.600">{user.email}</Text>
                    <Text fontSize="sm" color="gray.500">{user.role}</Text>
                </Box>

                {/* Email Alerts Switch */}
                <FormControl justifyContent='center' display='flex' alignItems='center'>
                    <FormLabel htmlFor='email-alerts' mb='0'>
                        Enable email alerts?
                    </FormLabel>
                    <Switch id='email-alerts' />
                </FormControl>

                {/* Personal Information Section */}
                <Box>
                    <Heading textAlign="center" as="h3" size="md" mb={4}>
                        <Button onClick={onTogglePersonalInformation} width="full" colorScheme="teal" variant="outline">
                            Personal Information
                        </Button>
                    </Heading>
                    <Collapse in={isOpenPersonalInformation} animateOpacity>
                        <UserDetailsTable />
                    </Collapse>
                </Box>

                {/* Account Actions Section */}
                <Box>
                    <Heading textAlign="center" as="h3" size="md" mb={4}>
                        <Button onClick={onToggleAccountActions} width="full" colorScheme="teal" variant="outline">
                            Account Actions
                        </Button>
                    </Heading>
                    <Collapse in={isOpenAccountActions} animateOpacity>
                        <Stack spacing={2} mt={2}>
                            <Button
                                as='a'
                                href='/change-password'
                                colorScheme="teal"
                                width="full"
                            >
                                Change Password
                            </Button>
                            <Button
                                as='a'
                                href='/saved-routes'
                                colorScheme="teal"
                                width="full"
                            >
                                View Saved Routes
                            </Button>
                            <Button
                                as='a'
                                href='/logout'
                                colorScheme="red"
                                width="full"
                            >
                                Logout
                            </Button>
                        </Stack>
                    </Collapse>
                </Box>

                {/* Admin Actions Section */}
                {isAdmin && (
                    <Box>
                        <Heading textAlign="center" as="h3" size="md" mb={4}>
                            <Button onClick={onToggleAdminActions} width="full" colorScheme="teal" variant="outline">
                                Admin Actions
                            </Button>
                        </Heading>
                        <Collapse in={isOpenAdminActions} animateOpacity>
                            <Stack spacing={2} mt={2}>
                                <Button
                                    as='a'
                                    href='/manage-users'
                                    colorScheme="teal"
                                    width="full"
                                >
                                    Manage Users
                                </Button>
                                <Button
                                    as='a'
                                    href='/add-station'
                                    colorScheme="teal"
                                    width="full"
                                >
                                    Add New Station
                                </Button>
                                <Button
                                    as='a'
                                    href='/view-stations'
                                    colorScheme="teal"
                                    width="full"
                                >
                                    View All Stations
                                </Button>
                            </Stack>
                        </Collapse>
                    </Box>
                )}
            </Stack>
        </Box>
    );
}
