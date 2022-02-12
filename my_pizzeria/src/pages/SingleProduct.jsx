import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { GiFullPizza, GiShoppingCart, GiTrashCan } from "react-icons/gi"
import styles from '../css/SingleProduct.module.css'

export default function SingleProduct({ products, setProducts, auth, counter, setCounter }) {
    const [checked, setChecked] = useState(false)
    const [checked1, setChecked1] = useState(false)
    const [checked2, setChecked2] = useState(false)
    const [checked3, setChecked3] = useState(false)
    const [checked4, setChecked4] = useState(false)
    const [checked5, setChecked5] = useState(false)
    const [checked6, setChecked6] = useState(false)
    const [smallSize, setSmallSize] = useState(false)
    const [mediumSize, setMediumSize] = useState(false)
    const [largeSize, setLargeSize] = useState(false)
    const [redirect, setRedirect] = useState(false)

    let newArray = [...products]

    const handleRadio = (e) => {
        setChecked(e.target.value)
    }

    function addToCart(i) {
        axios.patch(`/cart/add/${auth.localId}`,
            newArray[i]
        )
            .then((response) => { console.log(response) })
            .catch(error => console.log(error.response))
    }

    return (
        <div>
            {redirect ? <Redirect to='/Menu' /> : ""}
            {newArray.map((product, i) => {
                if (product.SinglePizzaClick === true) {
                    console.log(product);
                    let price = product.price[0]
                    product.totalPrice = product.price[0]
                    switch (product.size) {
                        case "small":
                            price = product.price[0]
                            product.price[0] = price
                            product.totalPrice = price
                            break;
                        case "medium":
                            price = product.price[1]
                            product.price[0] = price
                            product.totalPrice = price
                            break;
                        case "large":
                            price = product.price[2]
                            product.price[0] = price
                            product.totalPrice = price
                            break;
                        default:
                            break;
                    }
                    return (
                        <div key={i} className={styles.container}>
                            <img src={product.img} alt='productImg' className={styles.img} />
                            <div className={styles.content}>
                                <h2>{product.name}</h2><br></br>
                                {<h3  className={styles.redBorderLine}>{product.price[0]}$</h3>}<br></br>
                                <p>{product.description}</p><br></br>
                                <div>
                                    {product.category === "pizza" ? <label>
                                        <p className={styles.bold}>Choose Pizza Size:</p>
                                        <div className={styles.pizzaSizeCheckbox}>
                                            <input type='radio' name='group1' onClick={() => { product.size = "small"; setSmallSize(true); console.log(product); }} title='small' onChange={handleRadio} /><GiFullPizza size='16px' />
                                            <input type='radio' name='group1' onClick={() => { product.size = "medium"; setMediumSize(true); console.log(product); }} title='medium' onChange={handleRadio} /><GiFullPizza size='20px' />
                                            <input type='radio' name='group1' onClick={() => { product.size = "large"; setLargeSize(true); console.log(product); }} title='large' onChange={handleRadio} /><GiFullPizza size='24px' /><br></br>
                                        </div>
                                    </label> : ""}
                                </div><br></br>
                                <p className={styles.bold}>choose additional sauces: </p> <br></br>
                                <div className={styles.sauces}>
                                <input type='checkbox' onClick={() => { setChecked1(!checked1); newArray[i].sauces[0].value = !checked1; setProducts(newArray) }} /><label>Chocolate Syrup</label>
                                <input type='checkbox' onClick={() => { setChecked2(!checked2); newArray[i].sauces[1].value = !checked1; setProducts(newArray) }} /><label>Thousand Island Dressing</label><br></br>
                                <input type='checkbox' onClick={() => { setChecked3(!checked3); newArray[i].sauces[2].value = !checked1; setProducts(newArray) }} /><label>Garlic Sauce</label>
                                <input type='checkbox' onClick={() => { setChecked4(!checked4); newArray[i].sauces[3].value = !checked1; setProducts(newArray) }} /><label>Ketchup</label>
                                <input type='checkbox' onClick={() => { setChecked5(!checked5); newArray[i].sauces[4].value = !checked1; setProducts(newArray) }} /><label>Mapel Syrup</label><br></br>
                                <input type='checkbox' onClick={() => { setChecked6(!checked6); newArray[i].sauces[5].value = !checked1; setProducts(newArray) }} /><label>Pizza Sauce</label>
                                </div>
                                <br></br><br></br>
                                <div className={styles.buttons}>
                                <button type='submit' className={styles.addBtn} title='Add to cart' variant='contained' color='secondary' onClick={() => { Swal.fire("Added to cart!"); console.log(newArray[i]); addToCart(i); product.SinglePizzaClick = false; product.isOrderd = true; setProducts(newArray); setRedirect(true); setCounter(counter + 1) }} ><GiShoppingCart /></button>
                                <button type='submit' className={styles.deleteBtn} title='Delete' onClick={() => { Swal.fire("Removed!"); product.SinglePizzaClick = false; setProducts(newArray);; setRedirect(true) }}><GiTrashCan /></button>
                                </div>
                                <br></br><br></br>
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    )
}
