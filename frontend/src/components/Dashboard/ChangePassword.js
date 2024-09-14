import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'

export default function ChangePassword() {
    // State hooks for controlling visibility of each password field
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <Flex
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}>
                <Heading textAlign={'center'} lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                    Change Password
                </Heading>
                <Heading textAlign={'center'} lineHeight={1.1} fontSize={{ base: '0.5xl', md: 'xl' }}>
                    Email: 
                    {/* Add email here */}
                </Heading>

                {/* Old Password Field */}
                <FormControl>
                    <FormLabel>Enter Old Password</FormLabel>
                    <InputGroup>
                        <Input type={showOldPassword ? "text" : "password"} />
                        <InputRightElement>
                            <IconButton
                                icon={showOldPassword ? <ViewIcon /> : <ViewOffIcon />}
                                onClick={() => setShowOldPassword(!showOldPassword)}
                                variant="ghost"
                            />
                        </InputRightElement>
                    </InputGroup>
                    <Link fontSize={'small'} color={'blue'} href='/forgot-password'>forgot password</Link>
                </FormControl>

                {/* New Password Field */}
                <FormControl>
                    <FormLabel>Enter New Password</FormLabel>
                    <InputGroup>
                        <Input type={showNewPassword ? "text" : "password"} />
                        <InputRightElement>
                            <IconButton
                                icon={showNewPassword ? <ViewIcon /> : <ViewOffIcon />}
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                variant="ghost"
                            />
                        </InputRightElement>
                    </InputGroup>
                </FormControl>

                {/* Confirm New Password Field */}
                <FormControl>
                    <FormLabel>Confirm New Password</FormLabel>
                    <InputGroup>
                        <Input type={showConfirmPassword ? "text" : "password"} />
                        <InputRightElement>
                            <IconButton
                                icon={showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                variant="ghost"
                            />
                        </InputRightElement>
                    </InputGroup>
                </FormControl>

                {/* Submit Button */}
                <Stack spacing={6}>
                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                            bg: 'blue.500',
                        }}>
                        Submit
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    )
}
