import React, { useState } from 'react'
import { Box, Input, Menu, MenuButton, MenuDivider, Text } from '@chakra-ui/react'
import { MenuList , MenuItem } from '@chakra-ui/react' 
import { Tooltip } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Avatar } from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { ChatState } from '../../context/chatProviders'
import ProfileModel from './ProfileModel'
import { useNavigate } from 'react-router-dom'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'
  import { useDisclosure } from '@chakra-ui/react'
  import { useToast } from '@chakra-ui/react'
  import axios from 'axios'
  import ChatLoading from './ChatLoading'
  import UserListItem from '../userAvatar/UserListItem'
  import { Spinner } from '@chakra-ui/spinner'

function SideDrawer() {

    const [search, setSearch] = useState("")
   const [searchResult, setSearchResult] = useState([])
   const [loading, setLoading] = useState(false)
   const [loadingChat, setLoadingChat] = useState()

   const { user , setSelectedChat , chats , setChats} = ChatState();
   const navigate = useNavigate();
   const toast = useToast()

   const { isOpen, onOpen, onClose } = useDisclosure()

   const logoutHandler = () =>{
       localStorage.removeItem("userInfo");
       navigate("/")
   }
   
   const handleSearch = async () =>{
    if (!search) {
        toast({
          title: "Please Enter something in search",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
        return;
      }

      try {
        setLoading(true);

        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
  
        const { data } = await axios.get(`/api/user?search=${search}`, config);
       
        console.log(data);
         
        setLoading(false);
        setSearchResult(data);
        
      } catch (error) {

        toast({
            title: "Error Occured!",
            description: "Failed to Load the Search Results",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
      }

   }

   const accessChat = async (userId) =>{

    try {
        setLoadingChat(true);
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(`/api/chat`, { userId }, config);
        if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
  
        setSelectedChat(data);
        setLoadingChat(false);
        onClose();

      } catch (error) {
        toast({
          title: "Error fetching the chat",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
   }

    return (
        <>
            <Box d='flex' justifyContent='space-between' alignItems='center' bg='white' w='100%' p='5px 10px 5px 10px' borderWidth='5px'>
                <Tooltip label='Search users to chat' hasArrow placement='bottom-end'>
                   <Button variant='ghost' onClick={onOpen}>
                   <i className="fa-solid fa-magnifying-glass"></i>
                   <Text d={{base:'none' , md:'flex'}} px='10px'> Search user</Text>
                   </Button>
                </Tooltip>
                <Text fontFamily='Work sans' fontSize='2xl'>Chat App </Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>
                        <BellIcon fontSize='2xl' margin={1}/>
                        </MenuButton>
                        <MenuList>
                            {/* <MenuItem>Download</MenuItem>
                            <MenuItem>Create a Copy</MenuItem>
                            <MenuItem>Mark as Draft</MenuItem>
                            <MenuItem>Delete</MenuItem>
                            <MenuItem>Attend a Workshop</MenuItem> */}
                         </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            <Avatar size='sm' cursor='pointer' name={user.name} src = {user.pic}/>
                        </MenuButton>
                        <MenuList>
                            <ProfileModel user={user}>
                                <MenuItem>My Profile</MenuItem>
                            </ProfileModel>
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                         </MenuList>
                    </Menu>
                </div>
            </Box>  

            <Drawer placement='left' onClose={onClose} isOpen={isOpen} >
            <DrawerOverlay />
                <DrawerContent>

                <DrawerCloseButton />
                <DrawerHeader borderBottom={1} >Search for Users</DrawerHeader>

                <DrawerBody>
                    <Box display='flex' pb={2}>
                            <Input placeholder='Search by name or email' mr={2}
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                            onKeyUp= {handleSearch}></Input>
                    </Box>
                    {loading ? <ChatLoading /> : (
                        searchResult?.map((user) => (
                            <UserListItem
                              key={user._id}
                              user={user}
                              handleFunction={() => accessChat(user._id)}
                            />
                          ))
                    )}
                  {loadingChat && <Spinner ml="auto" d="flex" />}
                </DrawerBody>

                <DrawerFooter>
                    
                </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SideDrawer
