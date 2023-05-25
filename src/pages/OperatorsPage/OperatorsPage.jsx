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

    const wsConnect = useRef()

    function changeLoginParameters(parameter, value) {
        setLogin(loginParameters => {
            return {...loginParameters, [parameter]: value}
        })
    }

    async function connectOperator(){
        const body = JSON.stringify(login)
        try {
            const operator = await OperatorsApi.loginOperator(body);
            if(!operator){
                return console.log(`operator doesn't exist`)
            }
            wsConnect.current = new WebSocket('ws://localhost:5000');

            wsConnect.current.onopen = () => {
                setOperator(operator)
                console.log('connect')
                wsConnect.current.send(JSON.stringify({event: 'connect', operator: operator.idName}))
            }

            wsConnect.current.onmessage = (feedback) => {
                const response = JSON.parse(feedback.data)
                switch (response.event){
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

        }catch (e){
            console.log(e)
        }
    }

    function getMessageFromDB(){
        const message = {
            event: 'getMessage'
        }

        wsConnect.current.send(JSON.stringify(message))
    }

    function logOut(){
        wsConnect.current.close()
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
                                <Button onClick={getMessageFromDB}>
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
                                    {alertMessage._id}
                                </h2>
                            </div>

                        }

                    </div>
                )

            }



        </div>
    );
};

export default OperatorsPage;