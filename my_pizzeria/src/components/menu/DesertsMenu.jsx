import React from 'react';
import { Redirect } from 'react-router-dom';
import styles from '../../css/menu.module.css'

export default function DesertsMenu({ products, setProducts, redirect, setRedirect, auth, redirectToLogin, setRedirectToLogin }) {

    let desertsArray = [...products]

    const desertsData = Array.isArray(desertsArray)
        ? desertsArray.map((desert, i) => {
            if (desertsArray[i].category === "deserts") {
                return (
                    <div key={i} className={styles.mediumMenuSection}>
                        <img className={styles.imgMedium} alt='desertImg' src={desert.img} />
                        <div className={styles.contentMedium}>
                            <h2 className={styles.h2}>{desert.name}</h2>
                            <h3>{desert.price}$</h3>
                            <p>{desert.description}</p>
                            {auth ? <button className={styles.orderNowBtn} onClick={() => {
                                desert.SinglePizzaClick = true; setRedirect(true); setProducts(desertsArray)
                            }}>ORDER NOW!</button>
                                :
                                <button className={styles.orderNowBtn} onClick={() => {
                                    desert.SinglePizzaClick = true;
                                    setRedirectToLogin(true)
                                }}>ORDER NOW!</button>}
                        </div>
                        <br></br><br></br>
                    </div>
                )
            }
        })
        : []

    return (
        <div>
            {redirectToLogin ? <Redirect to='/Login' /> : null}
            {redirect ? <Redirect to='/SingleProduct' /> : ""}
            <h1 className={styles.menuH1}>Deserts</h1>
            <div className={styles.categoryHolder}>
                <div>{desertsData}</div>
                {/* {desertsArray.map((desert, i) => {
                    if (desertsArray[i].category === "deserts") {
                        return (
                            <div key={i} className={styles.mediumMenuSection}>
                                <img className={styles.imgMedium} alt='desertImg' src={desert.img} />
                                <div className={styles.contentMedium}>
                                    <h2 className={styles.h2}>{desert.name}</h2>
                                    <h3>{desert.price}$</h3>
                                    <p>{desert.description}</p>
                                    {auth ? <button className={styles.orderNowBtn} onClick={() => {
                                        desert.SinglePizzaClick = true; setRedirect(true); setProducts(desertsArray)
                                    }}>ORDER NOW!</button>
                                        :
                                        <button className={styles.orderNowBtn} onClick={() => {
                                            desert.SinglePizzaClick = true;
                                            setRedirectToLogin(true)
                                        }}>ORDER NOW!</button>}
                                </div>
                                <br></br><br></br>
                            </div>
                        )
                    }
                })} */}
            </div>
        </div>
    )
}
