import IInput from "../../interfaces/IInput";
import './Input.module.css'

const Input = ({htmlFor, type, children}: IInput) => {
    return (
        <div>
            <label htmlFor={htmlFor}>{children}</label>
            <input type={type} name={htmlFor} id={htmlFor}/>
        </div>
    )
}

export default Input