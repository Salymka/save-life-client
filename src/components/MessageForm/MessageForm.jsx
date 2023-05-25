import React, {useEffect, useState} from 'react';
import styles from "./MessageForm.module.scss";
import Input from "../../UI/Input/Input";
import MessagesApi from "../../api/messagesApi";
import {useUserFromLS} from "../../hooks/useUserFromLS";
import {useNavigate} from "react-router-dom";

const MessageForm = ({userId, updateMassages}) => {
    const fr = new FileReader();

    const [messageParams, setMessageParams] = useState({
        title: null,
        dangerLevel: null,
        description: null,
        location: null,
        photos: []
    })
    console.log(messageParams)
    const [selectedFile, setSelectedFile] = useState({})
    const [preview, setPreview] = useState({})
    // console.log(preview)
    const changeParams = (key, param) => {
        setMessageParams({...messageParams, [key]: param})
    }

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files)
    }
    const handleUploadClick = () => {

        const data = new FormData();
        data.append('title', messageParams.title);
        data.append('alertType', messageParams.dangerLevel);
        data.append('comment', messageParams.description);
        if (selectedFile?.length) {
            [...selectedFile].forEach((file, index) => {
                data.append(`photos`, file, file.name);
            })
        }



        MessagesApi.createAlertMessage({userId, body: data})
            .then((data) => {
                if (data.status === 'create') updateMassages()
            })
            .catch((err) => console.error(err));
    };

    // useEffect(() => {
    //     if (!selectedFile) {
    //         setPreview(undefined)
    //         return
    //     }
    //
    //     const objectUrl = URL.createObjectURL(selectedFile)
    //     setPreview(objectUrl)
    //
    //     // free memory when ever this component is unmounted
    //     return () => URL.revokeObjectURL(objectUrl)
    // }, [selectedFile])

    return (
        <div className={styles.MessageForm}>
            <h2 className={styles.MessageForm__title}>
                {`Створіть нове повідомлення`}
            </h2>
            <div className={styles.titleAndDanger}>
                <Input
                    type={'text'}
                    placeholder={'Заголовок'}
                    onChange={(event) => changeParams('title', event.target.value)}
                    value={messageParams.title}/>
                <select className={styles.newMessageBox__select}
                        onChange={(event) => changeParams('dangerLevel', event.target.value)}>
                    <option value={null}>{`Вкажіть рівень небезпеки`}</option>
                    <option value={'green'}>{`Зелений рівень`}</option>
                    <option value={'yellow'}>{`Жовтий рівень`}</option>
                    <option value={'orange'}>{`Оранжевий рівень`}</option>
                    <option value={'red'}>{`Червоний рівень`}</option>
                </select>
            </div>
            <Input
                type={'text'}
                placeholder={'Вкажіть Адресу'}
                onChange={(event) => changeParams('location', event.target.value)}
                value={messageParams.location}/>
            <textarea
                className={styles.newMessageBox__textarea}
                maxLength={5000}
                placeholder={`Опишіть ситуацію`}
                onChange={(event) => changeParams('description', event.target.value)}/>
            <input type='file' onChange={onSelectFile} multiple accept={'image/*'}/>
            {/*{selectedFile &&*/}
            {/*    <img src={`${preview}`} alt={''} style={{width: 60}}/>*/}
            {/*}*/}
            <button onClick={handleUploadClick}>
                UPLOAD
            </button>
        </div>
    );
};

export default MessageForm;