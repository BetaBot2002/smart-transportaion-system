'use client'

import {
    Flex, Box, FormControl, FormLabel, Link,
    Input, Checkbox, Stack, Button, Heading,
    Text,Menu, MenuButton, MenuItem, MenuList,
    useColorModeValue, useToast
} from '@chakra-ui/react'
import { useState } from 'react'

export default function LoginPage() {

    const [inputField, setInputField] = useState("Email");
    const [inputFieldValue,setinputFieldValue] = useState("");
    const [password,setPassword] = useState("");
    const toast = useToast();
    const handleinputsubmit = (e) =>{
        e.preventDefault();
        if(inputField != "" && password != "") {
            console.log({inputField,inputFieldValue,password});
            toast({
                title: 'Logged in.',
                description: "explore our features",
                status: 'success',
                duration: 3000,
                isClosable: true,
              })
        }else {
            toast({
                title: 'invalid',
                description: "enter all credentials",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }

    }
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        enjoy all our cool features
                    </Text>
                </Stack>
                <Menu>
                    <MenuButton as={Button} colorScheme="blue">
                        Login using
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => setInputField("username")}>Username</MenuItem>
                        <MenuItem onClick={() => setInputField("Email")}>Email</MenuItem>
                        <MenuItem onClick={() => setInputField("Phone No")}>Phone No.</MenuItem>
                    </MenuList>
                </Menu>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>{inputField}</FormLabel>
                            <Input onChange={(e)=>setinputFieldValue(e.target.value)} type="email" />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input onChange={(e)=>setPassword(e.target.value)} type="password" />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Remember me</Checkbox>
                                <Text color={'blue.400'}><Link href='/forgot-password'>Forgot password?</Link></Text>
                            </Stack>
                            <Text>
                                New User?{' '}
                                <Link color='teal.500' href='/register'>
                                    Register
                                </Link>
                            </Text>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                onClick={handleinputsubmit}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}