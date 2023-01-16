import './Input.module.css'

interface props{
    htmlFor: string,
    type: string,
    children: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export const Input = ({htmlFor, type, children, onChange}: props) => {
    return (
        <div>
            <label htmlFor={htmlFor}>{children}</label>
            <input onChange={onChange} type={type} name={htmlFor} id={htmlFor}/>
        </div>
    )
}

export default Input