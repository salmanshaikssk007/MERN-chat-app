import React from 'react'
import { ChatState } from '../../context/chatProviders'
import { Box , Text ,IconButton } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender , getSenderFull } from '../../config/ChatLogic';
import ProfileModel from './ProfileModel';
import UpdateGroupChatModal from './../ui_components/UpdateGroupChatModal'

const SingleChat = ({fetchAgain , setFetchAgain}) => {


    const { user , selectedChat , setSelectedChat } = ChatState();

    return (
        <>
          {selectedChat?(
              <>
                <Text
                    fontSize={{base:'28px' , md:'30'}}
                    pb={3}
                    px={2}
                    w='100%'
                    fontFamily= 'Work sans'
                    display='flex'
                    justifyContent={{base : 'space-between'}}
                    alignItems = 'center'
                >
                    <IconButton
                    d={{ base: "flex", md: "none" }}
                    icon={<ArrowBackIcon />}
                    onClick={() => setSelectedChat("")}
                    />
                    {
                        !selectedChat.isGroupChat ? (
                        <>
                             {getSender(user, selectedChat.users)}
                                <ProfileModel
                                    user={getSenderFull(user, selectedChat.users)}
                                />
                        </>)
                        :(<>
                            {selectedChat.chatName.toUpperCase()}
                            <UpdateGroupChatModal
                                // fetchMessages={fetchMessages}
                                fetchAgain={fetchAgain}
                                setFetchAgain={setFetchAgain}
                           />
                        </>)
                    }
                </Text>
                <Box
                    d="flex"
                    flexDir="column"
                    justifyContent="flex-end"
                    p={3}
                    bg="#E8E8E8"
                    w="100%"
                    h="100%"
                    borderRadius="lg"
                    overflowY="hidden"
                 >
                     {/* messages here */}
                 </Box>
              </>
          ):(<>
            <Box d="flex" alignItems="center" justifyContent="center" h="100%">
                <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                    Click on a user .
                </Text>
            </Box>
          </>)}  
        </>
    )
}

export default SingleChat
