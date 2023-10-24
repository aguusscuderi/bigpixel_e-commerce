import { useState, useEffect} from "react";
import { createPortal } from "react-dom";
import Form from './Login/form'
import Register from './Register/index'
import '../styles/modal.css'; 

interface Props {
    show: boolean;
    onClose(): () => void,
}

const Modal = ({ show, onClose }: Props) => {
    const [isBrowser, setIsBrowser] = useState(false)

    useEffect(() => {
        setIsBrowser(true);
    },[])

    const modalContent = show ? (
        <div className="overlay">
            <div className="modal">
                <div className="header">
                    <button onClick={onClose()} className="btn close-btn"> Close </button>
                </div>
                <Form/>
                <Register/>
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