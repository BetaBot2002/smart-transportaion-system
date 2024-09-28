
import { Center, Heading, useToast } from '@chakra-ui/react'
import {
    Button,
    FormControl,
    Flex,
    Stack,
    useColorModeValue,
    HStack,
} from '@chakra-ui/react'
import { PinInput, PinInputField } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { verifyOTPAction } from '../../redux/actions/userActions'
import { useNavigate } from 'react-router-dom'

export default function VerifyOtp() {
    const [OTP, setOTP] = useState("");
    const toast = useToast();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading,isotpVerified,email,error } = useSelector(state=>state.IsUpdatedUser)
    const handleSubmit = () => {
        if(OTP.length==6) {
            dispatch(verifyOTPAction({
                email:email,
                otp:OTP
            }));
        }else {
            toast({
                title:'invalid',
                description:"please enter valid otp",
                status:'error',
                duration:3000,
                isClosable:true
            })
        }
    }
    useEffect(()=>{
        if(error) {
            toast({
                title:'invalid',
                description:error,
                status:'error',
                duration:3000,
                isClosable:true
            })
        }
        if(isotpVerified) {
            toast({
                title:'success',
                description:"OTP verification successful",
                status:'success',
                duration:3000,
                isClosable:true
            })
            navigate('/reset-password');
        }
    },[isotpVerified,error])
    return (
        <Flex
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack
                spacing={4}
                w={'full'}
                maxW={'sm'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={10}>
                <Center>
                    <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                        Verify your OTP
                    </Heading>
                </Center>
                <Center
                    fontSize={{ base: 'sm', sm: 'md' }}
                    color={useColorModeValue('gray.800', 'gray.400')}>
                    We have sent OTP to your email
                </Center>
                <Center
                    fontSize={{ base: 'sm', sm: 'md' }}
                    fontWeight="bold"
                    color={useColorModeValue('gray.800', 'gray.400')}>
                    {/* {here username and email} */}
                </Center>
                <FormControl>
                    <Center>
                        <HStack>
                            <PinInput
                                otp
                                value={OTP}
                                onChange={(value) => setOTP(value)} >
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                            </PinInput>
                        </HStack>
                    </Center>
                </FormControl>
                <Stack spacing={6}>
                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        onClick={handleSubmit}
                        _hover={{
                            bg: 'blue.500',
                        }}>
                        Verify
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    )
}
