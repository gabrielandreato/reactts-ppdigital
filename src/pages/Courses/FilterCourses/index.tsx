import styles from "../../../components/Filter/Filter.module.css";
import {useRecoilState} from "recoil";
import {courseListFilterState} from "../../../state/atomCourse";


export const FilterCourses = () => {
    const [filter, setFilter] = useRecoilState(courseListFilterState)

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