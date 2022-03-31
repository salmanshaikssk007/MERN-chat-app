import axios from 'axios';
import { ChatState } from './../context/chatProviders'
import { Box } from '@chakra-ui/layout'
import SideDrawer from '../components/ui_components/SideDrawer';
import MyChats from '../components/ui_components/MyChats';
import ChatBox from '../components/ui_components/ChatBox';

const Chatpage = () => {

   const { user } = ChatState();
   
   
    return (
        <div style={{width : "100%"}}>
            {user && <SideDrawer />}
            <Box d='flex' justifyContent='space-between' w='100%' h='90vh' p='10px'>
            {user && <MyChats />}
            {user && <ChatBox />}
            </Box>
        </div>
    )
}

export default Chatpage;
