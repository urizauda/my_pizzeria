import React from 'react';
import { Redirect } from 'react-router-dom';
import styles from '../../css/menu.module.css'

export default function PastaMenu({ products, setProducts, redirect, setRedirect, auth, redirectToLogin, setRedirectToLogin }) {
    let pastasArray = [...products]
    return (
        <div>
            <h1 className={styles.menuH1}>Pastas</h1>
            {redirectToLogin ? <Redirect to='/Login' /> : null}
            {redirect ? <Redirect to='/SingleProduct' /> : ""}
            <div className={styles.categoryHolder}>
                {pastasArray.map((pasta, i) => {
                    if (pastasArray[i].category === "pasta") {
                        return (
                            <div className={styles.menuSection} key={i}>
                                <img className={styles.img} alt='pastaImg' src={pasta.img} />
                                <div className={styles.content}>
                                <h2 className={styles.h2}>{pasta.name}</h2>
                                <h3>{pasta.price}$</h3>
                                <p>{pasta.description}</p>
                                {auth ? <button className={styles.orderNowBtn} onClick={() => {
                                    pasta.SinglePizzaClick = true; setRedirect(true); setProducts(pastasArray)
                                }}>ORDER NOW!</button>
                                    :
                                    <button className={styles.orderNowBtn} onClick={() => {
                                        pasta.SinglePizzaClick = true;
                                        setRedirectToLogin(true)
                                    }}>ORDER NOW!</button>}
                                    </div>
                                <br></br><br></br>
                            </div>
                        )
                    }
                })}
            </div>
        </div>)
}
