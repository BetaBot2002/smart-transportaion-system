'use client'

import {
    Flex, Box, FormControl, FormLabel, Link,
    Input, Stack, Button, Heading,
    Text, Menu, MenuButton, MenuItem, MenuList,
    Progress,Select,
    useColorModeValue,
    useToast,
    InputGroup,
    InputRightElement,
    IconButton,
} from '@chakra-ui/react'
import {ViewIcon,ViewOffIcon} from '@chakra-ui/icons'
import { useState } from 'react'

export default function RegisterPage() {

    const [formStep, setFormStep] = useState(1);
    const [showPassword,setShowpassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const totalSteps = 3;

    const [formData, setFormData] = useState({
        username: '',
        phoneNumber: '',
        email: '',
        city: '',
        nearestRailStation: '',
        nearestMetroStation: '',
        password: '',
        confirmPassword: ''
    });

    const nextStep = () => {
        setFormStep((prev) => prev + 1);
    };

    const prevStep = () => {
        setFormStep((prev) => prev - 1);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };
    const toast = useToast();
    const handleSubmit = () => {
        for(const key in formData) {
            if(formData[key] === '') {
                toast({
                    title: 'invalid',
                    description: "Enter all credentials",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
                return;
            }
        }
        if(formData.confirmPassword !== formData.password) {
            toast({
                title: 'invalid',
                description: "password mismacth",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }
        console.log(formData);
        toast({
            title: 'Account created',
            description: "Explore all our features",
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
    };

    return (
        <Flex
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Register new account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        Enjoy all our cool features
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>

                    {/* Progress bar */}
                    <Progress value={(formStep / totalSteps) * 100} size="sm" colorScheme="blue" mb={4} />

                    {formStep === 1 && (
                        <Stack spacing={4}>
                            <FormControl id="username">
                                <FormLabel>Username</FormLabel>
                                <Input type="text" value={formData.username} onChange={handleChange} />
                            </FormControl>
                            <FormControl id="phoneNumber">
                                <FormLabel>Phone Number</FormLabel>
                                <Input type="tel" value={formData.phoneNumber} onChange={handleChange} />
                            </FormControl>
                            <FormControl id="email">
                                <FormLabel>Email</FormLabel>
                                <Input type="email" value={formData.email} onChange={handleChange} />
                            </FormControl>
                            <Button
                                onClick={nextStep}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{ bg: 'blue.500' }}>
                                Next
                            </Button>
                        </Stack>
                    )}
                    {formStep === 2 && (
                        <Stack spacing={4}>
                            <FormControl id="city">
                                <Select onChange={handleChange} placeholder='Select city'>
                                    {/* here we will add list of city names */}
                                    <option value='option1'>Option 1</option>
                                    <option value='option2'>Option 2</option>
                                    <option value='option3'>Option 3</option>
                                </Select>
                            </FormControl>
                            <FormControl id="nearestRailStation">
                                <Select onChange={handleChange} placeholder='Select nearestRailStation'>
                                    {/* here we will add list of nearestRailStation names */}
                                    <option value='option1'>Option 1</option>
                                    <option value='option2'>Option 2</option>
                                    <option value='option3'>Option 3</option>
                                </Select>
                            </FormControl>
                            <FormControl id="nearestMetroStation">
                                <Select onChange={handleChange} placeholder='Select nearestMetroStation'>
                                    {/* here we will add list of nearestMetroStation names */}
                                    <option value='option1'>Option 1</option>
                                    <option value='option2'>Option 2</option>
                                    <option value='option3'>Option 3</option>
                                </Select>
                            </FormControl>
                            <Button
                                onClick={nextStep}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{ bg: 'blue.500' }}>
                                Next
                            </Button>
                            <Button
                                onClick={prevStep}
                                bg={'gray.400'}
                                color={'white'}
                                _hover={{ bg: 'gray.500' }}>
                                Back
                            </Button>
                        </Stack>
                    )}
                    {formStep === 3 && (
                        <Stack spacing={4}>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                <Input type={showPassword?"text":"password"} value={formData.password} onChange={handleChange} />
                                    <InputRightElement>
                                        <IconButton
                                            icon={!showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                            onClick={() => setShowpassword(!showPassword)}
                                            variant="ghost"
                                        />
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <FormControl id="confirmPassword">
                                <FormLabel>Confirm Password</FormLabel>
                                <InputGroup>
                                <Input type={showConfirmPassword?"text":"password"} value={formData.confirmPassword} onChange={handleChange} />
                                    <InputRightElement>
                                        <IconButton
                                            icon={!showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                                            onClick={() => setShowConfirmPassword(!showPassword)}
                                            variant="ghost"
                                        />
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Button
                                onClick={handleSubmit}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{ bg: 'blue.500' }}>
                                Submit
                            </Button>
                            <Button
                                onClick={prevStep}
                                bg={'gray.400'}
                                color={'white'}
                                _hover={{ bg: 'gray.500' }}>
                                Back
                            </Button>
                        </Stack>
                    )}
                </Box>
            </Stack>
        </Flex>
    )
}
