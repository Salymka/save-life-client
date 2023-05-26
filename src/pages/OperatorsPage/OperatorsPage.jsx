import React, {useRef, useState} from 'react';
import styles from './OperatorsPage.module.scss'
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import OperatorsApi from "../../api/OperatorsApi";

const OperatorsPage = () => {
    const [alertMessage, setAlertMessage] = useState(null)
    const [operator, setOperator] = useState(null);
    const [login, setLogin] = useState({
        idName: '',
        password: ''
    })
    const [statusValue, setStatusValue] = useState('')
    const [modalImg, setModalImg] = useState(null)
    const wsConnect = useRef()

    function changeLoginParameters(parameter, value) {
        setLogin(loginParameters => {
            return {...loginParameters, [parameter]: value}
        })
    }

    async function connectOperator() {
        const body = JSON.stringify(login)
        try {
            const operator = await OperatorsApi.loginOperator(body);
            console.log(operator)
            if (operator?.message) {
                return console.log(operator.message)
            }
            wsConnect.current = new WebSocket('ws://localhost:5000');

            wsConnect.current.onopen = () => {
                setOperator(operator)
                console.log('connect')
                wsConnect.current.send(JSON.stringify({event: 'connect', operator: operator.idName}))
            }

            wsConnect.current.onmessage = (feedback) => {
                const response = JSON.parse(feedback.data)
                switch (response.event) {
                    case 'alertMessage':
                        setAlertMessage(response.message)
                }
            }

            wsConnect.current.onclose = () => {
                setOperator(null)
            }

            wsConnect.current.onerror = () => {
                setOperator(null)
            }

        } catch (e) {
            console.log(e)
        }
    }

    function getMessageFromDB() {
        const message = {
            event: 'getMessage'
        }

        wsConnect.current.send(JSON.stringify(message))
    }

    function logOut() {
        setAlertMessage(null)
        wsConnect.current.close()
    }

    function updateMessageStatus(){
        const mes = {event: 'changeStatus', status: statusValue}
        wsConnect.current.send(JSON.stringify(mes))
        setAlertMessage(null)
    }

    function openImg(photoUrl) {
        setModalImg(photoUrl)
    }

    return (
        <div>
            {!operator
                ?
                (
                    <div className={styles.operatorLogin}>
                        <h2 className={styles.operatorLogin__title}>
                            Operators Login
                        </h2>
                        <div className={styles.operatorLogin__inputs}>
                            <Input
                                type={'text'}
                                value={login.idName}
                                placeholder={'set operator idName'}
                                onChange={(event) => changeLoginParameters('idName', event.target.value)}/>
                            <Input
                                type={'text'}
                                value={login.password}
                                placeholder={'set password'}
                                onChange={(event) => changeLoginParameters('password', event.target.value)}/>
                            <Button onClick={connectOperator}>
                                {'Connect'}
                            </Button>
                        </div>
                    </div>
                )
                :
                (
                    <div>
                        <div className={styles.header}>
                            {`${operator.idName}`}
                            <div>
                                <Button onClick={getMessageFromDB} isDisable={alertMessage}>
                                    {'Get Alert Message'}
                                </Button>
                                <Button onClick={logOut}>
                                    {'LogOut'}
                                </Button>
                            </div>


                        </div>
                        {alertMessage &&
                            <div className={styles.alertMessage}>
                                <h2>
                                    {`Message ID - ${alertMessage._id}`}
                                </h2>
                                <h2 style={{marginTop: 10}}>
                                    {`Message Type - ${alertMessage.alertType}`}
                                </h2>
                                <h2 style={{marginTop: 10}}>
                                    {`Message Title - ${alertMessage.title}`}
                                </h2>
                                <h2 style={{marginTop: 10}}>Comment :</h2>
                                <p>
                                    {` ${alertMessage.comment}`}
                                </p>
                                <h2 style={{marginTop: 10}}>
                                    {alertMessage.photos && `Photos:`}
                                </h2>
                                <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                                    {alertMessage.photos.length &&
                                        alertMessage.photos.map((photo) =>
                                            <img key={photo.toString()}
                                                 src={'http://localhost:5050/' + photo}
                                                 alt={"user photo"}
                                                 style={{width: 150, height: 150, margin: 10, cursor: "pointer"}}
                                                 onClick={() => openImg('http://localhost:5050/' + photo)}

                                            />
                                        )
                                    }
                                </div>
                                <select className={styles.selectStatus}
                                        onChange={(event) => setStatusValue(event.target.value)}>
                                    <option value={'complete'}>{`Processed`}</option>
                                    <option value={'forGlobal'}>{`ForGlobalView`}</option>
                                    <option value={'postpone'}>{`Postpone`}</option>
                                </select>
                                <Button onClick={updateMessageStatus}>
                                    {'Confirm form'}
                                </Button>
                            </div>

                        }
                        {modalImg &&
                            <div style={{background: 'rgba(0, 0, 0, 0.8)', position:"absolute", width: '100%', height: '100%', zIndex: 3, left:0, top: 0}}
                            onClick={()=> setModalImg('')}
                            >
                                <div style={{background: "whitesmoke", width: "max-content",height: "max-content", padding:10, margin: '250px auto'}}>
                                    <img
                                        src={modalImg}
                                        style={{width:800}}
                                        onClick={(e)=> e.stopPropagation()}
                                        alt={'img'}/>
                                </div>
                            </div>}
                    </div>

                )

            }


        </div>
    );
};

export default OperatorsPage;