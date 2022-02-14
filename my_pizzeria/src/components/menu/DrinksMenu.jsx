import React from 'react';
import { Redirect } from 'react-router-dom';
import styles from '../../css/menu.module.css'

export default function DrinksMenu({ products, setProducts, redirect, setRedirect, auth, redirectToLogin, setRedirectToLogin }) {
    let drinksArray = [...products]

    const drinksData = Array.isArray(drinksArray)
        ? drinksArray.map((drink, i) => {
            if (drinksArray[i].category === "drinks") {
                return (
                    <div className={styles.smallMenuSection} key={i}>
                        <img className={styles.imgSmall} alt='drinkImg' src={drink.img} />
                        <div className={styles.contentSmall}>
                            <h2 className={styles.h2}>{drink.name}</h2>
                            <h3>{drink.price}$</h3>
                            {auth ? <button className={styles.orderNowBtn} onClick={() => {
                                drink.SinglePizzaClick = true; setRedirect(true); setProducts(drinksArray)
                            }}>ORDER NOW!</button>
                                :
                                <button className={styles.orderNowBtn} onClick={() => {
                                    drink.SinglePizzaClick = true;
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
            <h1 className={styles.menuH1}>Drinks</h1>
            <div className={styles.categoryHolder}>
                <div>{drinksData}</div>
                {/* {drinksArray.map((drink, i) => {
                    if (drinksArray[i].category === "drinks") {
                        return (
                            <div className={styles.smallMenuSection} key={i}>
                                <img className={styles.imgSmall} alt='drinkImg' src={drink.img} />
                                <div className={styles.contentSmall}>
                                    <h2 className={styles.h2}>{drink.name}</h2>
                                    <h3>{drink.price}$</h3>
                                    {auth ? <button className={styles.orderNowBtn} onClick={() => {
                                        drink.SinglePizzaClick = true; setRedirect(true); setProducts(drinksArray)
                                    }}>ORDER NOW!</button>
                                        :
                                        <button className={styles.orderNowBtn} onClick={() => {
                                            drink.SinglePizzaClick = true;
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
