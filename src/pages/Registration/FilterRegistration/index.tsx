import styles from "./FilterCourses.module.css";
import {useState} from "react";
import {useRecoilState} from "recoil";
import {courseListFilterState, registrationListFilterState} from "../../../state/atom";



export const FilterRegistration = () => {
    const [filter, setFilter] = useRecoilState(registrationListFilterState)

    const updateFilter = (value: string) => {
        setFilter(value);
    }

    return (
        <div className={styles.Filter}>
            <input name="filter"
                   type="text"
                   value={filter}
                   onChange={event => updateFilter(event.target.value)}
                   placeholder={'Buscar...'}
            />
        </div>
    )
}