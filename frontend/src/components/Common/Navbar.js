'use client'

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,Link,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

const Links = ['Home','Trains', 'Routes', 'Stations']

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate= useNavigate();

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
            <Box><Avatar size={'lg'} src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8PsNJc628Od7pFf6sC6sgtBTgoz_0q71rzblgIVgahS2gKMbe4OkQ4e8yHH2ZIjcPEBI&usqp=CAU'} /></Box>
            <HStack as={'nav'} spacing={15} gap={'15'} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <Link key={link} href={`${link.toLowerCase()}`}>{link}</Link>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            {/* <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'lg'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem><Link href='/home'>Home</Link></MenuItem>
                <MenuItem><Link href='/profile'>Profile</Link></MenuItem>
                <MenuDivider />
                <MenuItem>Log out</MenuItem>
              </MenuList>
            </Menu> */}
            <Link href='/login'>Login</Link>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <Link key={link}>{link}</Link>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

    </>
  )
}