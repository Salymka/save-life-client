import React, {useEffect, useState} from 'react';
import styles from "./MessageForm.module.scss";
import Input from "../../UI/Input/Input";

const MessageForm = () => {
    const fr = new FileReader();

    const [messageParams, setMessageParams] = useState({
        title: null,
        dangerLevel: null,
        description: null,
        photos: []
    })
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState({})
    console.log(selectedFile)
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
        if (!selectedFile) {
            return;
        }
        const data = new FormData();
        data.append('title', 'ERROR HOUSE');
        data.append('alertType', 'red');
        data.append('comment', 'HELP');
        [...selectedFile].forEach((file, index) => {
            data.append(`photos`, file, file.name);
        })


        fetch('http://127.0.0.1:5050/messages/send_alert_message/64371fb8f3dc84837e19df38', {
            method: 'POST',
            body: data,
            // 👇 Set headers manually for single file upload

        })
            .then((res) => res.json())
            .then((data) => console.log(data))
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
                <select className={styles.newMessageBox__select} defaultValue={messageParams.dangerLevel}>
                    <option disabled value={'green'}>{`Вкажіть рівень небезпеки`}</option>
                    <option value={'green'}>{`Зелений рівень`}</option>
                    <option value={'yellow'}>{`Жовтий рівень`}</option>
                    <option value={'orange'}>{`Оранжевий рівень`}</option>
                    <option value={'red'}>{`Червоний рівень`}</option>
                </select>
            </div>
            <Input
                type={'text'}
                placeholder={'Вкажіть Адресу'}
                onChange={(event) => changeParams('title', event.target.value)}
                value={messageParams.title}/>
            <textarea
                className={styles.newMessageBox__textarea}
                maxLength={5000}
                placeholder={`Опишіть ситуацію`}/>
            <input type='file' onChange={onSelectFile} multiple/>
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