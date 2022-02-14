import React, { useEffect, useState } from 'react'
import { BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import axios from 'axios'
import { FaPowerOff, FaShoppingCart } from "react-icons/fa"
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
  const [errorFromServer, setErrorFromServer] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [counter, setCounter] = useState(null)

  useEffect(() => {
    getData()
    let userDetail = localStorage.getItem("storage")
    if (userDetail) {
      setAuth(JSON.parse(userDetail))
    }
  }, [])

  function getData() {
    setLoading(true)
    axios
      .get('/products')
      .then(function (response) {
        setProducts(response.data)
        console.log(response.data);
        setLoading(false)
      })
      .catch(function (error) {
        console.log(error);
        setErrorFromServer(error)
        setLoading(false)
      })
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
              <div className='cartLogo'><div className='counter'>{counter}</div><Link to='/Cart'><FaShoppingCart className='faShoppingCart' title='Go to Cart' size={25} /></Link></div>
              {<button className='logOut' title='Log out' onClick={() => { setAuth(null); localStorage.clear() }}><FaPowerOff /></button>}
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
          <Route exact path="/" render={() => <HomePage />} />
          <Route exact path="/Menu" render={() => <Menu products={products} auth={auth} setAuth={setAuth} setProducts={setProducts} />} />
          <Route exact path="/Register" render={() => <Register setAuth={setAuth} errorFromServer={errorFromServer} setErrorFromServer={setErrorFromServer} loading={loading} setLoading={setLoading} email={email} setEmail={setEmail} password={password} setPassword={setPassword} redirect={redirect} setRedirect={setRedirect} />} />
          <Route exact path="/Login" render={() => <Login products={products} setAuth={setAuth} setProducts={setProducts} errorFromServer={errorFromServer} setErrorFromServer={setErrorFromServer} loading={loading} setLoading={setLoading} email={email} setEmail={setEmail} password={password} setPassword={setPassword} redirect={redirect} setRedirect={setRedirect} />} />
          <Route exact path="/About" render={() => <About />} />
          <Route exact path="/Cart" render={() => <Cart products={products} setProducts={setProducts} auth={auth} setAuth={setAuth} errorFromServer={errorFromServer} setErrorFromServer={setErrorFromServer} loading={loading} setLoading={setLoading} redirect={redirect} setRedirect={setRedirect}  setCounter={setCounter} counter={counter}/>} />
          <Route exact path="/Order" render={() => <Order auth={auth} errorFromServer={errorFromServer} setErrorFromServer={setErrorFromServer} loading={loading} setLoading={setLoading} />} />
          <Route exact path="/SingleProduct" render={() => <SingleProduct counter={counter} setCounter={setCounter} auth={auth} products={products} setProducts={setProducts} />} />
        </Switch>
        {loading ? <SpinnerCircular color="blue" /> : ""}
        <p style={{ color: "red" }}>{errorFromServer ? "Error From Server" : ""}</p>
      </div><Footer />
    </BrowserRouter>

  )
}

export default App
