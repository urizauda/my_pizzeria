import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AiOutlineDoubleRight } from "react-icons/ai";
import styles from '../css/homePage.module.css'

export default function HomePage() {
    const [image, setImage] = useState([])
    useEffect(getSlider, [])

    function getSlider() {
        axios
              .get('/image_slider')
            .then(function (response) {
                setImage(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    return (
        <>
            <div className={styles.container}>
                <div className={styles.slider}>
                    <br></br>
                    {image.map((img, i) => {
                    return (
                        <figure key={i}>
                            <img src={img.img} />
                        </figure>
                    )
                })}
                </div>
                <br></br>
                <h1>EXCLUSIVELY FRESH INGREDIENTS</h1>
                <br></br>
                <p className={styles.titleDesc}>In our kitchen we make sure that the dishes are prepared only from the highest quality products. Thanks to this, our pizza is a delicacy that can not be resisted!</p>

                <div className={styles.ourProductsContainer}>
                    <br></br><br></br>
                    <div className={styles.rightBlockContainer}>
                        <img src='https://i.ibb.co/WcJbck8/2.png' alt='pizza' className={styles.rightPic} />
                        <div className={styles.leftContent}>
                            <h1>MEET CALLIE</h1><br></br>
                            <p>Callie is our herb-seasoned winter pizza, featuring: white sauce, mozzarella, parmesan, chicken jalapeño sausage, mama lil's sweet hot peppas, roasted cauliflower, and rosemary.</p>
                            <br></br><br></br>
                            <div className={styles.goTo}>
                            <Link to='/Menu' className={styles.goToMenuLeft}>GO TO MENU <AiOutlineDoubleRight size={20} color={"green"} /></Link>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div className={styles.leftBlockContainer}>
                        <img src='https://i.ibb.co/qRPHPmn/3.png' alt='salad' className={styles.leftPic} />
                        <div className={styles.rightContent}>
                            <h1>CAULIFLOWER POWER SALAD</h1><br></br>
                            <p>Packed with vitamins and nutrients to power you through the day. The Cauliflower Power Salad features spinach, kale & broccoli power blend, cucumbers, roasted cauliflower, cranberry seed mix, and Greek herb & tahini dressing. An excellent source of Fiber, Iron, Vitamin A, C, & K.</p>
                            <br></br><br></br>
                            <Link to='/Menu'>GO TO MENU <AiOutlineDoubleRight size={20} color={"lightgreen"} /></Link>
                        </div>
                    </div>
                    <div className={styles.rightBlockContainer}>
                        <img src='https://i.ibb.co/X3Q77C5/5.png' alt='waffle' className={styles.rightPicWaffle} />
                        <div className={styles.leftContent}>
                            <h1>WHAT MAKES A WAFFLE BELGIAN?</h1><br></br>
                            <p>Our famous Belgian waffles are dusted with powdered sugar and served with warm maple syrup and melted butter on the site.</p>
                            <br></br><br></br>
                            <Link to='/Menu' className={styles.goToMenuLeft}>GO TO MENU <AiOutlineDoubleRight className={styles.goTo} size={20} color={"green"} /></Link>
                        </div>
                    </div>

                    <div className={styles.leftBlockContainer}>
                        <img src='https://i.ibb.co/NN1YL95/6.png' alt='pasta' className={styles.leftPicPasta} />
                        <div className={styles.rightContent}>
                            <h1>COMFY AND CHEESY</h1><br></br>
                            <p>This Parmesan-crusted pasta takes your basic pasta to the next level! This dish has everything you love about and more.</p>
                            <br></br><br></br>
                            <Link to='/Menu'>GO TO MENU <AiOutlineDoubleRight size={20} color={"lightgreen"} /></Link>
                        </div>
                    </div>
                </div>
                <div className={styles.bottomSection}>
                    <img src='https://i.ibb.co/SdkY9Tz/bottom-Section.jpg' alt='bottomImg' className={styles.bottomPic} />
                    <div className={styles.bottomTitle}>
                        <h1>OH YES WE DID. THE MY PIZZERIA, WELL BAKED SLICE OF PIZZA.</h1>
                    </div>
                    <div>
                        <h3>FIND OUR RESTAURANT</h3>
                        <p>Ben-Gurion 15/7</p>
                        <p>Tel-Aviv, 704987</p>
                        <p>03-1234567</p>
                    </div>
                    <div>
                        <h3>WORKING HOURS</h3>
                        <p>Sunday - Thursday</p>
                        <p>10:00-0:00</p>
                        <br></br>
                        <p>Saturday</p>
                        <p>20:00-1:00</p>
                    </div>
                </div>
            </div>
        </>
    )
}
