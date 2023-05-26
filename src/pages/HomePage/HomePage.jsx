import React, {useEffect, useState} from 'react';
// import styles from './HomePage.module.scss'
import Header from "../../components/Header/Header";
import MessagesApi from "../../api/messagesApi";
const HomePage = () => {
    const [messages, setMessages] = useState(null)
    function getMessages() {
        MessagesApi.getGlobalMessages()
            .then(messages => {
                console.log(messages)
                setMessages([...messages.reverse()])
            })
            .catch(e => console.log(e))
            .finally(() => console.log('GET MES FIN'))
    }
    useEffect(() => {
        getMessages()
    },[])
    return (
        <div>
            <Header/>

            {messages &&
                messages.map(message =>
                    <div key={message._id}>
                        {message.title}
                    </div>
                )
            }
        </div>
    );
};

export default HomePage;