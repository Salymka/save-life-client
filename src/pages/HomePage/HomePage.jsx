import React, {useEffect, useState} from 'react';
import styles from './HomePage.module.scss'
import Header from "../../components/Header/Header";
import MessagesApi from "../../api/messagesApi";
const HomePage = () => {
    const [messages, setMessages] = useState(null)
    function getMessages() {
        MessagesApi.getGlobalMessages()
            .then(messages => {
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
            <div className={styles.infoMessages}>
                {messages &&
                    messages.map(message =>
                        <div key={message._id} className={styles.infoMessages__message}>
                            <h2>
                                {message.title}
                            </h2>
                            <p>
                                {message.comment}
                            </p>
                            {
                                <div style={{display: "flex", width: '100%', flexWrap: "wrap", marginTop:15}}>
                                    {message.photos.length !== 0 &&
                                        message.photos.map((photo) =>
                                            <img
                                                src={'http://localhost:5050/' + photo}
                                                alt={'photo'}
                                                key={photo.toString()}
                                                // onClick={}
                                                style={{width:120, margin: 20}}
                                            />
                                        )
                                    }
                                </div>

                            }
                            <p style={{position: "absolute", right: 10, bottom: 5}}>
                                {message.location}
                            </p>
                        </div>
                    )
                }
            </div>

        </div>
    );
};

export default HomePage;