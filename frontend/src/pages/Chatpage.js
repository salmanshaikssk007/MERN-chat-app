import axios from 'axios';
import { useState , useEffect } from 'react'

const Chatpage = () => {

    const [Chats, setChats] = useState([]);
    const fetchChats = async () =>{
        const { data } = await axios.get('/api/chats');
        console.log(data)
        setChats(data);
    }
    useEffect(() => {
        fetchChats();
    }, [])

    return (
        <div>
            {Chats.map(chat=>chat.chatName)}
        </div>
    )
}

export default Chatpage;
