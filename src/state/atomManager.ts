import {atom, selector} from "recoil";
import IStudent from "../interfaces/IStudent";

export const managerList = atom<IStudent[]>({
    /* A state to managers data */
    key: 'managerList',
    default: []
})

export const managerListFilterState = atom({
    /* A state to set the filter value to use in filteredManagerList*/
    key: 'managerListFilter',
    default: ''
})

export const filteredManagerList = selector({
    /* A selector to choose when use the complete list or filtered list
       with all rules to apply in the manager filtered list.*/
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