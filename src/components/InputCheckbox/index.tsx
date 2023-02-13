import styles from "./InputCheckBox.module.css";
import React from "react";

interface props{
    htmlFor: string,
    type: string,
    children: string,
    onChange?:  React.ChangeEventHandler<HTMLInputElement> | undefined,
    checked: boolean
}

export const InputCheckbox = ({htmlFor, type, children, onChange, checked}: props) => {
    return (
        <div className={styles.InputCheckbox}>
            <input checked={checked} onChange={onChange} type={type} name={htmlFor} id={htmlFor}/>
            <label htmlFor={htmlFor}>{children}</label>
        </div>
    )
}