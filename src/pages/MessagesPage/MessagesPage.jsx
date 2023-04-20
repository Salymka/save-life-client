import React, {useEffect, useRef, useState} from 'react';
import Header from "../../components/Header/Header";
import styles from './MessagesPage.module.scss'
import MessageForm from "../../components/MessageForm/MessageForm";
import {useUserFromLS} from "../../hooks/useUserFromLS";
import {useNavigate} from "react-router-dom";
import {homePage} from "../../router/router";
import MessagesApi from "../../api/messagesApi";

const MessagesPage = () => {
    const [messages, setMessages] = useState([])
    const [user] = useUserFromLS();
    const navigate = useNavigate();
    console.log(messages)

    function getMessages() {
        MessagesApi.getUserMessages(user._id)
            .then(messages => {
                console.log(messages)
                setMessages([...messages])
            })
            .catch(e => console.log(e))
            .finally(() => console.log('GET MES FIN'))
    }

    useEffect(() => {
        if (!user?._id) {
            return navigate(homePage)
        }
        console.log("circle")
        getMessages()
    }, [])
    return (
        <div>
            { user &&
                <div>
                    <Header/>

                    <div className={styles.body}>
                        <div className={styles.titleWrapper}>
                            <h2 className={styles.titleWrapper__title}>
                                {`Мої повідомлення`}
                            </h2>
                        </div>
                        <div className={styles.messages}>
                            <MessageForm userId={user._id}/>

                            <div className={styles.messages__wrapper}>
                                {
                                    messages.length !== 0
                                        ?
                                        messages.map(message =>
                                            <div key={message._id}>
                                                {message.title}
                                            </div>
                                        )
                                        :
                                        <div>
                                            NO ONE
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default MessagesPage;