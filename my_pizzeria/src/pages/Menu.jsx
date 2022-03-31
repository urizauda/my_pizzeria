import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DesertsMenu from '../components/menu/DesertsMenu';
import DrinksMenu from '../components/menu/DrinksMenu';
import PastaMenu from '../components/menu/PastaMenu';
import PizzaMenu from '../components/menu/PizzaMenu';
import SaladMenu from '../components/menu/SaladMenu';
import SideDishMenu from '../components/menu/SideDishMenu';
import styles from '../css/menu.module.css';

export default function Menu({ products, setProducts, auth, setErrorFromServer, setLoading }) {
    const [redirect, setRedirect] = useState(false);
    const [redirectToLogin, setRedirectToLogin] = useState(false);

    
  useEffect(() => {
    getData()
  }, [])

    function getData() {
        setLoading(true)
        axios
          .get('/products')
          .then(function (response) {
            setProducts(response.data)
            setLoading(false)
          })
          .catch(function (error) {
            setErrorFromServer(error)
            setLoading(false)
          })
      }

    return (
        <>
            <div className={styles.links}>
                <a href="#pizzaMenu">Pizzas</a>
                <a href="#pastaMenu">Pastas</a>
                <a href="#saladMenu">Salads</a>
                <a href="#desertsMenu">Deserts</a>
                <a href="#sideDishMenu">Sides</a>
                <a href="#drinksMenu">Drinks</a>
            </div>
            <div className={styles.container}>
                <div id="pizzaMenu"><PizzaMenu auth={auth} products={products} setProducts={setProducts} redirect={redirect} setRedirect={setRedirect} redirectToLogin={redirectToLogin} setRedirectToLogin={setRedirectToLogin} /></div>
                <div id="pastaMenu"><PastaMenu auth={auth} products={products} setProducts={setProducts} redirect={redirect} setRedirect={setRedirect} redirectToLogin={redirectToLogin} setRedirectToLogin={setRedirectToLogin} /></div>
                <div id="saladMenu"><SaladMenu auth={auth} products={products} setProducts={setProducts} redirect={redirect} setRedirect={setRedirect} redirectToLogin={redirectToLogin} setRedirectToLogin={setRedirectToLogin} /></div>
                <div id="desertsMenu"><DesertsMenu auth={auth} products={products} setProducts={setProducts} redirect={redirect} setRedirect={setRedirect} redirectToLogin={redirectToLogin} setRedirectToLogin={setRedirectToLogin} /></div>
                <div id="sideDishMenu"><SideDishMenu auth={auth} products={products} setProducts={setProducts} redirect={redirect} setRedirect={setRedirect} redirectToLogin={redirectToLogin} setRedirectToLogin={setRedirectToLogin} /></div>
                <div id="drinksMenu"><DrinksMenu auth={auth} products={products} setProducts={setProducts} redirect={redirect} setRedirect={setRedirect} redirectToLogin={redirectToLogin} setRedirectToLogin={setRedirectToLogin} /></div>
            </div>
        </>
    )
}
