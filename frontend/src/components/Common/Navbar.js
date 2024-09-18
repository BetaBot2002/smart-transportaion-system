'use client'

import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Link as ChakraLink,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  Menu,Button,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from "react-redux" 


const Links = ['Home', 'Routes', 'Stations', 'About us']

const NavLink = ({ children, to, fontSize }) => (
  <ChakraLink
    px={2}
    py={1}
    fontSize={fontSize}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
      color: useColorModeValue('teal.500', 'teal.200'),
    }}
    _activeLink={{
      fontWeight: 'bold',
      color: useColorModeValue('teal.600', 'teal.300'),
    }}
    href={to}
  >
    {children}
  </ChakraLink>
)

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const {isAuthenticated} = useSelector(state=>state.GetUser);
  
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Avatar
                size={'lg'}
                src={
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8PsNJc628Od7pFf6sC6sgtBTgoz_0q71rzblgIVgahS2gKMbe4OkQ4e8yHH2ZIjcPEBI&usqp=CAU'
                }
                cursor={'pointer'}
              />
            </Box>
            <HStack as={'nav'} spacing={5} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link} >
                  <Text onClick={() => navigate(link)}>{link}</Text>
                </NavLink>
              ))}
            </HStack>
          </HStack>
        { !isAuthenticated ? 
        <Flex alignItems={'center'}>
            <ChakraLink
              px={2}
              py={1}
              rounded={'md'}
              _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
                color: useColorModeValue('teal.500', 'teal.200'),
              }}
            >
              <Text onClick={()=>navigate('/login')}>Login</Text>
            </ChakraLink>
          </Flex>
          : <Flex alignItems={'center'}>
        <Menu>
          <MenuButton
            as={Button}
            rounded={'full'}
            variant={'link'}
            cursor={'pointer'}
            minW={0}>
            <Avatar
              size={'sm'}
              src={
                'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
              }
            />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={()=>navigate('/profile')}>Profile</MenuItem>
            <MenuItem>Link 2</MenuItem>
            <MenuDivider />
            <MenuItem>Link 3</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
          
        }
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link} >
                  <Text onClick={() => navigate(link)}>{link}</Text>
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}
