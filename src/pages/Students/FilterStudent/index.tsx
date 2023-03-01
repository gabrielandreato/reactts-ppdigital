import styles from "../../../components/Filter/Filter.module.css";
import {useState} from "react";
import {useRecoilState} from "recoil";
import {studentListFilterState} from "../../../state/atomStudent";



export const FilterStudent = () => {
    const [filterValue, setFilterValue] = useState<string>('')
    const [filter, setFilter] = useRecoilState(studentListFilterState)


    const updateFilter = (value: string) => {
        setFilter(value);
    }


    return (
        <div className={styles.Filter}>
            {/*<label htmlFor="filter">Filtro:</label>*/}
            <input name="filter"
                   type="text"
                   value={filter}
                   onChange={event => updateFilter(event.target.value)}
                   placeholder={'Buscar...'}
            />
        </div>
    )
}