import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import { SpinnerCircular } from "spinners-react";
import { API_KEY } from "../logic/keys.js";
import styles from '../css/loginRegister.module.css'

export default function Register({ setAuth, errorFromServer, setErrorFromServer, loading, setLoading, email, setEmail, password, setPassword, redirect, setRedirect }) {
    const [confirmPassword, setConfirmPassword] = useState(false);

    const register = () => {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
        setLoading(true)
        axios
            .post(url, {
                email,
                password,
                confirmPassword
            })
            .then(function (response) {
                setLoading(false)
                setErrorFromServer(false);
                setAuth(response.data)
                console.log(response)
                localStorage.setItem("storage", JSON.stringify(response.data))
                craeteCart(response.data.localId)
            })
            .catch(function (error) {
                setErrorFromServer(error);
                setLoading(false)
                console.log(error);
            });
    };

    function craeteCart(localId) {
        const url = "/cart"
        axios.post(url, {
            localId,
            products: [],
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.form}>
                    {redirect ? <Redirect to='/' /> : ""}
                    <h1>Sign Up</h1>
                    <br></br>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (password.length < 6) {
                                alert("password should be at least 6 characters");
                            }
                            else if (password !== confirmPassword) {
                                alert("password must be the same as confirm password");
                            }
                            else {
                                register();
                                setRedirect(true)
                            }

                        }}
                    >
                        <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
                        <br></br>
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <br></br>
                        <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                        <br></br>
                        <input type="submit" value="Register" />
                    </form>
                    {loading ? <SpinnerCircular color="orangred" /> : ""}
                    <p style={{ color: "red" }}>
                        {errorFromServer ? "Error From Server" : ""}
                    </p>
                </div>
            </div>
        </>
    )
}
