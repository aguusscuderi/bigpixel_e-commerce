import { useState, useEffect} from "react";
import { createPortal } from "react-dom";
import Form from './Login/form'
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
                    <Form/>
                    <button onClick={onClose()} className="btn close-btn"> Close </button>
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