import React from 'react';
import Header from "../../components/Header/Header";
import styles from './HelpPhonesPage.module.scss'
import {phones} from '../../helpInformation/helpPhones'
const HelpPhonesPage = () => {
    return (
        <div>
            <Header/>
            <main className={styles.wrapperPhones}>
                {
                    phones.map(phonePoint =>
                        <div className={styles.phonePoint} key={phonePoint.phoneNumber}>
                            <h2 style={{marginTop:5}}>
                                {`${phonePoint.phoneNumber} - ${phonePoint.serviceName}`}
                            </h2>
                            <p style={{marginTop:5}}>
                                {phonePoint.recommends}
                            </p>
                        </div>
                    )
                }
            </main>

        </div>
    );
};

export default HelpPhonesPage;