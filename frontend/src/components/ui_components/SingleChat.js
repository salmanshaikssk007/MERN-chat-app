import React , {useState , useEffect } from 'react'
import { ChatState } from '../../context/chatProviders'
import { Box , Text ,IconButton , Spinner } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender , getSenderFull } from '../../config/ChatLogic';
import ProfileModel from './ProfileModel';
import UpdateGroupChatModal from './../ui_components/UpdateGroupChatModal'
import Lottie from "react-lottie";
import { FormControl, Input } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import ScrollableChat from './ScrollableChat';
import axios from 'axios';
import Styles from './SingleChat.module.css'

const SingleChat = ({fetchAgain , setFetchAgain}) => {

    const toast = useToast()

    const { user , selectedChat , setSelectedChat } = ChatState();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [ isTyping , setIstyping ] = useState(false)

    // event Handler function for message sending
    const sendMessage = async (event) =>{
            if(event.key === 'Enter' && newMessage){
                try {
                    const config = {
                      headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                      },
                    };
                    setNewMessage("");
                    const { data } = await axios.post(
                      "/api/message",
                      {
                        content: newMessage,
                        chatId: selectedChat,
                      },
                      config
                    );
                    setMessages([...messages, data]);
                  } catch (error) {
                    toast({
                      title: "Error Occured!",
                      description: "Failed to send the Message",
                      status: "error",
                      duration: 5000,
                      isClosable: true,
                      position: "bottom",
                    });
                  }
            }
    };

    const typingHandler = (e) =>{
        // typing indicator logic
        setNewMessage(e.target.value)
    }

    const fetchMessages = async () => {
        if (!selectedChat) return;
    
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
    
          setLoading(true);
    
          const { data } = await axios.get(
            `/api/message/${selectedChat._id}`,
            config
          );
          setMessages(data);
          setLoading(false);
    
        } catch (error) {
          toast({
            title: "Error Occured!",
            description: "Failed to Load the Messages",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        }
      };

      useEffect(() => {
        fetchMessages();
    
        // selectedChatCompare = selectedChat;
        // eslint-disable-next-line
      }, [selectedChat]);
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
                                fetchMessages={fetchMessages}
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
                    {loading ? (
                    <Spinner
                        size="xl"
                        w={20}
                        h={20}
                        alignSelf="center"
                        margin="auto"
                    />
                    ) : (
                    <div className={Styles.messages}>
                        <ScrollableChat messages={messages} />
                    </div>
                    )}

                    <FormControl
                    onKeyDown={sendMessage}
                    id="first-name"
                    isRequired
                    mt={3}
                    >
                    {isTyping ? (
                        <div>
                        {/* <Lottie
                            // options={defaultOptions}
                            height={50}
                            width={70}
                            style={{ marginBottom: 15, marginLeft: 0 }}
                        /> */}
                        </div>
                    ) : (
                        <></>
                    )}
                    <Input
                        variant="filled"
                        bg="#E0E0E0"
                        placeholder="Enter a message.."
                        value={newMessage}
                        onChange={typingHandler}
                    />
                    </FormControl>
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
