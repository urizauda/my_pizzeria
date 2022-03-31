import React from 'react';
import { Redirect } from 'react-router-dom';
import styles from '../../css/menu.module.css'

export default function PizzaMenu({ products, setProducts, redirect, setRedirect, auth, redirectToLogin, setRedirectToLogin }) {
    let pizzaArray = [...products]

    const pizzaData = Array.isArray(pizzaArray)
    ? pizzaArray.map((pizza, i) => {
        if (pizzaArray[i].category === "pizza") {
            return (
                <div className={styles.menuSection} key={i}>
                    <img className={styles.pizzaImg} alt='pizzaImg' src={pizza.img} />
                    <div className={styles.content}>
                    <h2 className={styles.h2}>{pizza.name}</h2>
                    {pizza.price ? <h3>{pizza.price[0]}$</h3> : ""}
                    <p>{pizza.description}</p>
                    <br></br>
                    {auth ?
                        <button className={styles.orderNowBtn} onClick={() => {
                            pizza.SinglePizzaClick = true;
                            setRedirect(true);
                            setProducts(pizzaArray)
                        }}>ORDER NOW!</button>
                        :
                        <button className={styles.orderNowBtn} onClick={() => {
                            pizza.SinglePizzaClick = true;
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
        <>
            {redirectToLogin ? <Redirect to='/Login' /> : null}
            {redirect ? <Redirect to='/SingleProduct' /> : ""}
            <h1 className={styles.menuH1}>Pizzas</h1>
            <div className={styles.categoryHolder}>
                <>{pizzaData}</>
            </div>
        </>)
}
