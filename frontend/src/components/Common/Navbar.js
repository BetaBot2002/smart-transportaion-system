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
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

const Links = ['Home', 'Routes', 'Stations', 'About us']

const NavLink = ({ children, to,fontSize }) => (
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
                <NavLink key={link} to={`/${link.toLowerCase()}`}>
                  {link}
                </NavLink>
              ))}
            </HStack>
          </HStack>
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
              href="/login"
            >
              Login
            </ChakraLink>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link} to={`/${link.toLowerCase()}`}>
                  {link}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}
