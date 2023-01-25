import styles from "./FilterManagers.module.css";
import {useRecoilState} from "recoil";
import {managerListFilterState} from "../../../state/atomManager";


export const FilterManagers = () => {
    const [filter, setFilter] = useRecoilState(managerListFilterState)

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