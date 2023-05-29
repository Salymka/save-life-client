import React, {useEffect, useRef, useState} from 'react';
import Header from "../../components/Header/Header";
import styles from './MessagesPage.module.scss'
import MessageForm from "../../components/MessageForm/MessageForm";
import {useUserFromLS} from "../../hooks/useUserFromLS";
import {useNavigate} from "react-router-dom";
import {homePage} from "../../router/router";
import MessagesApi from "../../api/messagesApi";
import {useSelector} from "react-redux";

const MessagesPage = () => {
    const [messages, setMessages] = useState([])
    const user = useSelector(state => state.user)
    const navigate = useNavigate();

    function getMessages() {
        MessagesApi.getUserMessages(user._id)
            .then(messages => {
                setMessages([...messages.reverse()])
            })
            .catch(e => console.log(e))
            .finally(() => console.log('GET MES FIN'))
    }

    useEffect(() => {
        if (!user?._id) {
            return navigate(homePage)
        }
        getMessages()
    }, [])

    function deleteMessage(id) {
        MessagesApi.deleteUserMessages(id)
            .then(messages => {
                getMessages()
            })
            .catch(e => console.log(e))
            .finally(() => console.log('Message Delete'))
    }

    return (
        <div>
            <div>
                <Header/>
                {user &&
                    <div className={styles.body}>
                        <div className={styles.titleWrapper}>
                            <h2 className={styles.titleWrapper__title}>
                                {`Мої повідомлення`}
                            </h2>
                        </div>
                        <div className={styles.messages}>
                            <MessageForm userId={user._id} updateMassages={getMessages}/>

                            <div className={styles.messages__wrapper}>
                                {
                                    messages.length !== 0
                                        ?
                                        messages.map(message =>
                                            <div className={styles.message} key={message._id}>
                                                <h1>
                                                    {message.title}
                                                </h1>
                                                <p className={styles.message__comment}>
                                                    {message.comment}
                                                </p>
                                                <button className={styles.message_delete}
                                                        onClick={() => deleteMessage(message._id)}
                                                        disabled={!(message.status === 'notProcessed')}>
                                                    Delete
                                                </button>
                                                {message.photos &&
                                                    <div style={{display: "flex", width: '100%', overflow: "hidden"}}>
                                                        {
                                                            message.photos.map(photo =>
                                                                <img
                                                                    src={'http://localhost:5050/' + photo}
                                                                    alt={'photo'}
                                                                    key={photo.toString()}
                                                                    // onClick={}
                                                                    style={{width: 80, height: 80, margin: 10}}
                                                                />
                                                            )
                                                        }
                                                    </div>

                                                }
                                            </div>
                                        )
                                        :
                                        <div style={{textAlign: "center", fontSize: 32}}>
                                            NO ONE
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default MessagesPage;