import styles from "../../../components/Filter/Filter.module.css";
import {useRecoilState} from "recoil";
import {coursesByResponsabilityListFilterState} from "../../../state/atomCourseByResponsability";


export const FilterCoursesByResponsability = () => {
    const [filter, setFilter] = useRecoilState(coursesByResponsabilityListFilterState)

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