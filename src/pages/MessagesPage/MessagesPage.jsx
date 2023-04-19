import React from 'react';
import Header from "../../components/Header/Header";
import styles from './MessagesPage.module.scss'
import MessageForm from "../../components/MessageForm/MessageForm";

const MessagesPage = () => {


    return (
        <div>
            <Header/>

            <div className={styles.body}>
                <div className={styles.titleWrapper}>
                    <h2 className={styles.titleWrapper__title}>
                        {`Мої повідомлення`}
                    </h2>
                </div>
                <div className={styles.messages}>
                    <MessageForm/>

                    <div className={styles.messages__wrapper}>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessagesPage;