import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { SpinnerCircular } from "spinners-react";
import CartSingleProduct from '../components/CartSingleProduct'
import styles from '../css/cart.module.css'
import Modal from '../components/Modal'
import Order from './Order';

export default function Cart({ auth, errorFromServer, setErrorFromServer, loading, setLoading, setCounter, counter }) {
    const [total, setTotal] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)
    const [cart, setCart] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    let newCart = [...cart]
    let sum = 0

    useEffect(() => getCart(), [])

    function getCart() {
        setLoading(true)
        axios
            .get(`/cart/${auth.localId}`)
            .then((response) => {
                setCart(response.data[0].products)
                setLoading(false)
            })
            .catch((error) => { setErrorFromServer(error); console.log(error); setLoading(false) })
    }

    function deleteCart() {
        axios.patch(`/cart/delete/${auth.localId}`)
            .then((response) => console.log(response))
            .catch(error => console.log(error.response))
    }

    const cartData = Array.isArray(newCart)
        ? newCart.map((product, i) => {
            sum += newCart[i].totalPrice
        
            return (
                <CartSingleProduct key={i} sum={sum} auth={auth} newCart={newCart} setCartTotal={setCartTotal} cartTotal={cartTotal} setCart={setCart} product={product} i={i} total={total} setTotal={setTotal} setCounter={setCounter} counter={counter} />
            )
        }) : []

    return (
        <div className={styles.father}>
            <div className={styles.container}>
                <table className={styles.tableContainer}>
                    <tbody>
                        <tr className={styles.trow}>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Sauces</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Remove</th>
                        </tr>
                        {loading ? <SpinnerCircular className={styles.spinner} color="black" /> : ""}
                        <p style={{ color: "red" }}>{errorFromServer ? "Error From Server" : ""}</p>
                        <>{cartData}</>
                    </tbody>
                </table>
            </div><br></br>
            <div className={styles.buySection}>
                <p className={styles.total}>Total: <span></span>{sum}$
                    <button type='submit' title='Buy' className={styles.buyBtn} onClick={() => {
                        setIsOpen(true);
                        setCounter(null);
                    }}>Checkout</button></p>
            </div><br></br><br></br>
            <div className={styles.orderConfirmation}>
                    {/* {cart ?  */}
                <Modal open={isOpen} sum={sum} onClose={() => {setIsOpen(false)}}>
                    <Order setCounter={setCounter} isOpen={isOpen} setIsOpen={setIsOpen} deleteCart={deleteCart} cart={cart} setCart={setCart} />
                    <br></br>
                    <p className={styles.price}>Price: {sum}$</p>
                    <br></br>
                </Modal>
                    {/*  : null} */}
            </div>
        </div>
    )
}
