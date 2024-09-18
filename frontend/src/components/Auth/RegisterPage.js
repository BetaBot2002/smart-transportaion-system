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
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { registerUserAction } from '../../redux/actions/userActions.js';
import {useSelector,useDispatch} from "react-redux";
export default function RegisterPage() {
    const dispatch = useDispatch();
    const [formStep, setFormStep] = useState(1);
    const [showPassword,setShowpassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const totalSteps = 3;
    const {loading, isAuthenticated,user,error} = useSelector(state=>state.GetUser);

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
        dispatch(registerUserAction(formData));
    };
    const navigate = useNavigate();
    useEffect(()=>{
        if(isAuthenticated) {
            toast({
                title: 'Success',
                    description: "congratulations You have created account",
                    status: 'success',
                    duration: 3000,
                    isClosable: true
            })
            setTimeout(()=>{
                navigate('/home');
            },1000);
        }
        if(error) {
            toast({
                title:'invalid',
                description:error,
                status:'error',
                duration:3000,
                isClosable:true
            })
        }
    },[dispatch,isAuthenticated,error])
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
                    <Text>already account? <Link onClick={()=> navigate('/login')}>Login</Link></Text>
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
                                    <option value='Kolkata'>Kolkata</option>
                                    <option value='Mumbai'>Mumbai</option>
                                    <option value='Delhi'>Delhi</option>
                                </Select>
                            </FormControl>
                            <FormControl id="nearestRailStation">
                                <Select onChange={handleChange} placeholder='Select nearestRailStation'>
                                    {/* here we will add list of nearestRailStation names */}
                                    <option value='6687023c562709dfec6e5795'>Option 1</option>
                                    <option value='66870319b96930c77d54a147'>Option 2</option>
                                    <option value='668703d9b96930c77d54a18c'>Option 3</option>
                                </Select>
                            </FormControl>
                            <FormControl id="nearestMetroStation">
                                <Select onChange={handleChange} placeholder='Select nearestMetroStation'>
                                    {/* here we will add list of nearestMetroStation names */}
                                    <option value='6687023c562709dfec6e5795'>Option 1</option>
                                    <option value='66870319b96930c77d54a147'>Option 2</option>
                                    <option value='668703d9b96930c77d54a18c'>Option 3</option>
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
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
