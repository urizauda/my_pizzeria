import React, { useRef } from 'react';
import axios from 'axios'
import Swal from 'sweetalert2'
import { GiTrashCan } from 'react-icons/gi';
import styles from '../css/cart.module.css'

export default function CartSingleProduct({ auth, product, i, total, setCart, newCart, setCounter, counter }) {
    const inputRef = useRef(1)

    let saucesArray = [...product.sauces]

    function deleteProductFromCart(i) {
        axios.patch(`/cart/delete/${auth.localId}`, i)
            .then((response) => console.log(response))
            .catch(error => console.log(error.response))
    }

    const saucesData = Array.isArray(saucesArray)
        ? saucesArray.map((sauce, k) => {
            if (sauce.value) {
                return (
                    <ul key={k}>
                        <li>{sauce.name}</li>
                    </ul>
                )
            }
        }) : []

    return (
        <tr key={i} className={styles.tr}>
            <td><img src={product.img} className={styles.img} /></td>
            <td>{product.name}</td>
            <td>{product.size ? product.size : "small"}</td>
            <td>{saucesArray.length ?
                <>{saucesData}</>
                : []}
            </td>
            <td className={styles.price}>{product.price[0]}$</td>
            <td><input className={styles.quantity} ref={inputRef} type='number' defaultValue={1} min={1} onChange={() => {
                product.totalPrice = total + (Number(product.price[0]) * Number(inputRef.current.value))
                setCart(newCart)
            }} /></td>
            <td>{product.totalPrice}$</td>
            <td><button title='Delete' className={styles.deleteBtn} 
            onClick={() => { Swal.fire("Deleted from cart!"); 
                deleteProductFromCart({ id: product.id }); 
                newCart.splice(i, 1); 
                setCart(newCart); 
                setCounter(counter - 1) }}>
                <GiTrashCan /></button></td>
        </tr>
    )
}
