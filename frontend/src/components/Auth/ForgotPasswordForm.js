'use client'

import {
    Button, FormControl, Flex,
    Heading, Input, Stack,
    Text,
    useColorModeValue,
    Menu,
    MenuButton,
    MenuList,Link,
    MenuItem,
    Select,
    useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { forgotPasswordAction } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { MdErrorOutline } from 'react-icons/md';


export default function ForgotPasswordForm() {
    const [inputField,setinputField] = useState("Email");
    const [inputFieldValue,setinputFieldValue] = useState("");
    const toast = useToast();
    const navigate= useNavigate();
    const dispatch = useDispatch();
    const {loading,isForgotPassword, error} = useSelector(state=>state.IsUpdatedUser)
    const handleSubmit = () => {
        if(inputFieldValue === '') {
            toast({
                title: 'invalid',
                description: "enter all credentials",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }
        if(inputField==='email'){
            dispatch(forgotPasswordAction({
                email:inputFieldValue,
            }))
            
        }else if(inputField==='phoneNo') {
            dispatch(forgotPasswordAction({
                phoneNo:inputFieldValue,
            }))
        }else {
            dispatch(forgotPasswordAction({
                username:inputFieldValue,
            }))
        }
        
    }
    useEffect(()=>{
        if(isForgotPassword) {
            toast({
                title: 'success',
                description: "OTP sent to your email",
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            navigate("/verify-otp")
        }
        if(error) {
            toast({
                title: 'invalid',
                description: error,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    },[isForgotPassword,error])
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
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                    Forgot your password?
                </Heading>
                <Select onChange={(e)=>setinputField(e.target.value)} placeholder='Select method'>
                    <option value='username'>Username</option>
                    <option value='email'>Email</option>
                    <option value='phoneNo'>Phone No.</option>
                </Select>
                <FormControl id={inputField}>
                    <Input
                        placeholder= {`enter your ${inputField}`}
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                        onChange={(e)=>setinputFieldValue(e.target.value)}
                    />
                </FormControl>
                <Stack spacing={6}>
                    <Button
                        isLoading={loading}
                        bg={'blue.400'}
                        color={'white'}
                        onClick={handleSubmit}
                        _hover={{
                            bg: 'blue.500',
                        }}>
                        Request Reset
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    )
}