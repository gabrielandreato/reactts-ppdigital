import styles from "../../../components/Filter/Filter.module.css";
import {useRecoilState} from "recoil";
import {registrationListFilterState} from "../../../state/atomRegistration";


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