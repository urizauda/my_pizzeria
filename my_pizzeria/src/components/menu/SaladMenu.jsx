import React from 'react';
import { Redirect } from 'react-router-dom';
import styles from '../../css/menu.module.css'

export default function SaladMenu({ products, setProducts, redirect, setRedirect, auth, redirectToLogin, setRedirectToLogin }) {
    let saladsArray = [...products]

    const saladsData = Array.isArray(saladsArray)
        ? saladsArray.map((salad, i) => {
            if (saladsArray[i].category === "salad") {
                return (
                    <div className={styles.menuSection} key={i}>
                        <img className={styles.img} alt='saladImg' src={salad.img} />
                        <div className={styles.content}>
                            <h2 className={styles.h2}>{salad.name}</h2>
                            <h3>{salad.price}$</h3>
                            <p>{salad.description}</p>
                            {auth ? <button className={styles.orderNowBtn} onClick={() => {
                                salad.SinglePizzaClick = true; setRedirect(true); setProducts(saladsArray)
                            }}>ORDER NOW!</button>
                                :
                                <button className={styles.orderNowBtn} onClick={() => {
                                    salad.SinglePizzaClick = true;
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
            {redirect ? <Redirect to='/SingleProduct' /> : ""}
            {redirectToLogin ? <Redirect to='/Login' /> : null}
            <h1 className={styles.menuH1}>Salads</h1>
            <div className={styles.categoryHolder}>
                <>{saladsData}</>
                {/* {saladsArray.map((salad, i) => {
                    if (saladsArray[i].category === "salad") {
                        return (
                            <div className={styles.menuSection} key={i}>
                                <img className={styles.img} alt='saladImg' src={salad.img} />
                                <div className={styles.content}>
                                <h2 className={styles.h2}>{salad.name}</h2>
                                <h3>{salad.price}$</h3>
                                <p>{salad.description}</p>
                                {auth ? <button className={styles.orderNowBtn} onClick={() => {
                                    salad.SinglePizzaClick = true; setRedirect(true); setProducts(saladsArray)
                                }}>ORDER NOW!</button>
                                    :
                                    <button className={styles.orderNowBtn} onClick={() => {
                                        salad.SinglePizzaClick = true;
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
