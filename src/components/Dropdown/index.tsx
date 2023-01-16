import styles from './Dropdown.module.css'

interface props {
    children?: React.ReactNode,
    name: string,
    id: string,
    value: any,
    onChange: React.ChangeEventHandler<HTMLSelectElement>
}

export const Dropdown = ({children, name, id, value, onChange}:props) => {
    return(
        <select onChange={onChange} value={value} className={styles.Select} name={name} id={id}>

            {children}
        </select>
    )
}