import styles from "./FilterStudent.module.css";
import {useState} from "react";



export const FilterStudent = () => {
    const [filterValue, setFilterValue] = useState<string>('')



    return (
        <div className={styles.Filter}>
            {/*<label htmlFor="filter">Filtro:</label>*/}
            <input name="filter"
                   type="text"
                   value={filterValue}
                   onChange={event => setFilterValue(event.target.value)}
                   placeholder={'Buscar...'}
            />
        </div>
    )
}