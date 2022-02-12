import React from 'react';
import ReactDOM from 'react-dom';
import {AiFillCloseCircle} from "react-icons/ai"
import styles from '../css/modal.module.css';

export default function Modal({ open, onClose, children }) {
    if (!open) return null;
    return ReactDOM.createPortal(
        <>
            <div className={styles.overlay} />
            <div className={styles.container}>
                <button className={styles.closeBtn} title='exit' onClick={onClose}><AiFillCloseCircle /></button>
                {children}
            </div>
        </>,
        document.getElementById('portal')
    );
}
