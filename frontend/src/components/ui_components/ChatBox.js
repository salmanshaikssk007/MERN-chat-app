import React from 'react'
import { Box } from '@chakra-ui/react'
import { ChatState } from './../../context/chatProviders'
import SingleChat from './SingleChat';

function ChatBox({fetchAgain , setFetchAgain}) {

    const { selectedChat } = ChatState();
    
    return (
        <Box display={{base : selectedChat ? 'flex' : 'none'  , md : 'flex'}}
        alignItems = 'center' flexDir='column' p={3} bg='white' w={{base : '100%' , md : '68%'}}borderRadius = 'lg' borderWidth={1} >
            
            <SingleChat fetchAgain={fetchAgain}  setFetchAgain={setFetchAgain} />
        </Box>
    )
}

export default ChatBox
