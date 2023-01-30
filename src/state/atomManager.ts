import {atom, selector} from "recoil";
import IStudent from "../interfaces/IStudent";

/* A state to managers data */
export const managerList = atom<IStudent[]>({
    key: 'managerList',
    default: []
})

/* A state to set the filter value to use in filteredManagerList*/
export const managerListFilterState = atom({
    key: 'managerListFilter',
    default: ''
})

/* A selector to choose when use the complete list or filtered list
   with all rules to apply in the manager filtered list.*/
export const filteredManagerList = selector({
    key: 'filteredManagerList',
    get: ({get}) => {
        const filter = get(managerListFilterState).trim();
        const list = get(managerList);

        switch (filter) {
            case filter:
                return list.filter((item) =>
                    item.name.toLowerCase().includes(filter.toLowerCase())
                )
            default:
                return list
        }
    }
})