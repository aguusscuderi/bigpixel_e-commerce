import { useState, useEffect} from "react";
import { createPortal } from "react-dom";
import {BsTrash} from 'react-icons/bs'
import '../styles/modal.css'; 
import React from "react";

interface Props {
    show: boolean;
    onClose(): () => void,
}

const Modal = ({show, onClose}: Props) => {
    const [isBrowser, setIsBrowser] = useState(false)

    useEffect(() => {
        setIsBrowser(true);
    },[])

    const handleClose = (e: any) => {
        e.preventDefault();
        onClose();
    }

    const modalContent = show ? (
        <div className="overlay">
            <div className="modal">
                <div className="header">
                    <a href="#" onClick={handleClose}>
                        <button className="btn close-btn">Close</button>
                    </a>
                </div>
            </div>
        </div>
    ) : null;

    if(isBrowser) {
        return createPortal(
            modalContent,
            document.getElementById("modal-root") as HTMLElement
        )
    } else {
        return null
    }

}

export default Modal