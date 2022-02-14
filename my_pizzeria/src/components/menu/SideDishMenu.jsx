import React from 'react';
import { Redirect } from 'react-router-dom';
import styles from '../../css/menu.module.css'

export default function SideDishMenu({ products, setProducts, redirect, setRedirect, auth, redirectToLogin, setRedirectToLogin }) {
    let sideDishesArray = [...products]

    const sideDishesData = Array.isArray(sideDishesArray)
        ? sideDishesArray.map((sideDish, i) => {
            if (sideDishesArray[i].category === "side dish") {
                return (
                    <div className={styles.mediumMenuSection} key={i}>
                        <img className={styles.imgMedium} alt='sideDishImg' src={sideDish.img} />
                        <div className={styles.contentMedium}>
                            <h2 className={styles.h2}>{sideDish.name}</h2>
                            <h3>{sideDish.price}$</h3>
                            <p>{sideDish.description}</p>
                            {auth ? <button className={styles.orderNowBtn} onClick={() => {
                                sideDish.SinglePizzaClick = true; setRedirect(true); setProducts(sideDishesArray)
                            }}>ORDER NOW!</button>
                                :
                                <button className={styles.orderNowBtn} onClick={() => {
                                    sideDish.SinglePizzaClick = true;
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
            <h1 className={styles.menuH1}>Sides</h1>
            <div className={styles.categoryHolder}>
                <div>{sideDishesData}</div>
                {/* {sideDishesArray.map((sideDish, i) => {
                    if (sideDishesArray[i].category === "side dish") {
                        return (
                            <div className={styles.mediumMenuSection} key={i}>
                                <img className={styles.imgMedium} alt='sideDishImg' src={sideDish.img} />
                                <div className={styles.contentMedium}>
                                <h2 className={styles.h2}>{sideDish.name}</h2>
                                <h3>{sideDish.price}$</h3>
                                <p>{sideDish.description}</p>
                                {auth ? <button className={styles.orderNowBtn} onClick={() => {
                                    sideDish.SinglePizzaClick = true; setRedirect(true); setProducts(sideDishesArray)
                                }}>ORDER NOW!</button>
                                    :
                                    <button className={styles.orderNowBtn} onClick={() => {
                                        sideDish.SinglePizzaClick = true;
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
