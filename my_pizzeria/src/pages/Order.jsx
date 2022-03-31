import React, { useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import { BiMailSend } from "react-icons/bi"
import Modal from '../components/Modal'
import styles from '../css/order.module.css';

export default function Order({ setCounter, isOpen, setIsOpen, deleteCart, cart, setCart }) {
    const [fullName, setFullName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [isClosed, setIsClosed] = useState(false)

    const setOrder = () => {
        axios
            .post('/orders', {
                fullName,
                address,
                phone
            })
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className={styles.container}>
                {/* {cart ?  */}
                <p>Please fill up your information for the delivery</p>
                <br></br>
                <h3>Delivery Details:</h3><br />
                <form onSubmit={(e) => {
                    e.preventDefault()
                    if (fullName && address && phone) {
                        setOrder()
                        deleteCart()
                        setCart("")
                    }
                    else {
                        Swal.fire("Please fill up your information");
                    }
                }}>
                    <input type="text" placeholder='Full Name' onChange={(e) => setFullName(e.target.value)} /><br /><br />
                    <input type="text" placeholder='Address' onChange={(e) => setAddress(e.target.value)} /><br /><br />
                    <input type="number" placeholder='Phone Number' onChange={(e) => setPhone(e.target.value)} /><br /><br />
                    <button type='submit' className={styles.orderBtn} title='order now!' onClick={() => { setIsClosed(true); setCounter(null) }}><BiMailSend /></button>
                </form>
            
            <Modal open={isClosed} onClose={() => {setIsOpen(false); setIsClosed(false)}}>
                <h2 className={styles.h2}>Thanks For Buying</h2>
                <div className={styles.content}>
                    <p className={styles.p}>your order will be at your door in 30 minutes or less</p>
                    <p>pay the delivery guy cash when you get your pizza</p>
                </div>
            </Modal>
                 {/* : ""} */}
        </div>
    )
}
