import React from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import { SpinnerCircular } from "spinners-react";
import keys from '../logic/keys.js'
import styles from '../css/loginRegister.module.css'

export default function Login({ setAuth, errorFromServer, setErrorFromServer, loading, setLoading, email, setEmail, password, setPassword, redirect, setRedirect }) {

    const logIn = () => {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${keys}`;
        setLoading(true)
        axios
            .post(url, {
                email,
                password
            })
            .then(function (response) {
                console.log(response)
                setLoading(false)
                setAuth(response.data)
                localStorage.setItem("storage", JSON.stringify(response.data))
            })
            .catch(function (error) { setErrorFromServer(error); setLoading(false) })
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.form}>
                    {redirect ? <Redirect to='/' /> : ""}
                    <h1>Sign In</h1>
                    <br></br>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        logIn();
                        setRedirect(true)
                    }}>
                        <input type='email' placeholder="E-mail" onChange={(e) => { setEmail(e.target.value) }} />
                        <br></br>
                        <input type='password' placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                        <br></br>
                        <input type='submit' value="Log In" />
                    </form>
                    {loading ? <SpinnerCircular color="orangred" /> : ""}
                    <p style={{ color: "red" }}>{errorFromServer ? "Error From Server" : ""}</p>
                </div >
            </div>
        </>
    )
}
