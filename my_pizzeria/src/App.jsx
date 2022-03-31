import React, { useEffect, useState } from 'react'
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom'
import axios from 'axios'
import { FaSignOutAlt, FaShoppingCart } from "react-icons/fa"
import { SpinnerCircular } from "spinners-react";
import HomePage from './pages/HomePage'
import Menu from './pages/Menu'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'
import Cart from './pages/Cart'
import Order from './pages/Order'
import SingleProduct from './pages/SingleProduct'
import Footer from './components/Footer'
import './App.css'


function App() {
  const [auth, setAuth] = useState(null);
  const [products, setProducts] = useState([])
  const [redirect, setRedirect] = useState(false)
  const [errorFromServer, setErrorFromServer] = useState("")
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [counter, setCounter] = useState(0)

  const userDetail = localStorage.getItem("storage")

  useEffect(() => {
    setAuth(JSON.parse(userDetail) ? JSON.parse(userDetail) : null);
  }, [])

  useEffect(() => {
    if (!userDetail) return;
    getCounter()
  }, [auth])

  function getCounter() {
    setLoading(true)
    axios
      .get(`/cart/${auth?.localId}`)
      .then((response) => {
        setCounter(response.data[0]?.products.length)
        setLoading(false)
      })
      .catch((error) => { setErrorFromServer(error) })
  }

  return (
    <BrowserRouter >
      <div className="App">
        <nav className='nav'>
          {auth ?
            <>
              <Link to='/'>Home Page</Link>
              <Link to='/Menu'>Menu</Link>
              <Link to='/About'>About</Link>
              <div className='cartLogo'><div className='counter'>{counter ? counter : ""}</div><Link to='/Cart'><FaShoppingCart className='faShoppingCart' title='Go to Cart' size={23} /></Link></div>
              {<button className='logOut' title='Sign out' onClick={() => { setAuth(null); localStorage.clear() }}><FaSignOutAlt size={23} /></button>}
            </>
            :
            <>
              <Link to='/Login'>Sign-In</Link>
              <Link to='/Register'>Sign-Up</Link>
              <Link to='/'>Home Page</Link>
              <Link to='/Menu'>Menu</Link>
              <Link to='/About'>About</Link>
            </>}
        </nav>
        <br></br><br></br>
        <Switch>
          <Route exact path="/" render={() => <HomePage errorFromServer={errorFromServer} setErrorFromServer={setErrorFromServer} loading={loading} setLoading={setLoading} />} />
          <Route exact path="/Menu" render={() => <Menu setErrorFromServer={setErrorFromServer} setLoading={setLoading} products={products} auth={auth} setAuth={setAuth} setProducts={setProducts} />} />
          <Route exact path="/Register" render={() => <Register counter={counter} setAuth={setAuth} errorFromServer={errorFromServer} setErrorFromServer={setErrorFromServer} loading={loading} setLoading={setLoading} email={email} setEmail={setEmail} password={password} setPassword={setPassword} redirect={redirect} setRedirect={setRedirect} />} />
          <Route exact path="/Login" render={() => <Login counter={counter} setCounter={setCounter} products={products} setAuth={setAuth} setProducts={setProducts} errorFromServer={errorFromServer} setErrorFromServer={setErrorFromServer} loading={loading} setLoading={setLoading} email={email} setEmail={setEmail} password={password} setPassword={setPassword} redirect={redirect} setRedirect={setRedirect} />} />
          <Route exact path="/About" render={() => <About />} />
          <Route exact path="/Cart" render={() => <Cart products={products} setProducts={setProducts} auth={auth} setAuth={setAuth} errorFromServer={errorFromServer} setErrorFromServer={setErrorFromServer} loading={loading} setLoading={setLoading} redirect={redirect} setRedirect={setRedirect} setCounter={setCounter} counter={counter} />} />
          <Route exact path="/Order" render={() => <Order auth={auth} errorFromServer={errorFromServer} setErrorFromServer={setErrorFromServer} loading={loading} setLoading={setLoading} />} />
          <Route exact path="/SingleProduct" render={() => <SingleProduct counter={counter} setCounter={setCounter} auth={auth} products={products} setProducts={setProducts} />} />
          {loading ? <SpinnerCircular color="black" /> : ""}
          <p style={{ color: "red" }}>{errorFromServer ? "Error From Server" : ""}</p>
          {redirect ? <Redirect to='/' /> : ""}
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
