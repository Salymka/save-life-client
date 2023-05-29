import React, {useState} from 'react';
import Header from "../../components/Header/Header";
import styles from './FirstAidPage.module.scss'
import {firstAidInfo} from "../../helpInformation/firstAid";
import Button from "../../UI/Button/Button";

const FirstAidPage = () => {
    const [moreInfo, setMoreInfo] = useState(null)

    return (
        <div>
            <Header/>
            <main className={styles.wrapper}>
                {
                    firstAidInfo.map(point =>
                        <div className={styles.point} key={point.firstAidName}>
                            <button style={{
                                position: "absolute",
                                right: 10,
                                top: 5,
                                cursor: "pointer",
                                background: "none",
                                borderRadius: 5,
                                border: '2px solid red',
                                padding: 3
                            }}
                                    onClick={() => setMoreInfo(moreInfo !== point.firstAidName ? point.firstAidName : null)}
                            >
                                {'Відкрити детальні дії'}
                            </button>
                            <h2 style={{marginTop:5}}>
                                {point.firstAidName}
                            </h2>
                            <p style={{marginTop:5}}>
                                {point.recommends}
                            </p>
                            {moreInfo === point.firstAidName &&
                                <>
                                    <h3 style={{marginTop:10}}>
                                        {'Детальна Інструкція'}
                                    </h3>
                                    <p style={{marginTop:5, whiteSpace: "pre-line"}}>
                                        {point.fullInfo}
                                    </p>
                                </>

                            }
                        </div>
                    )
                }
            </main>
        </div>
    );
};

export default FirstAidPage;