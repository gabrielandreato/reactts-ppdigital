import {atom, selector} from "recoil";
import ISubArea from "../interfaces/ISubArea";

/* A state to subareas data */
export const subAreaList = atom<ISubArea[]>({
    key: 'subAreaList',
    default: []
})

/* A state to set the filter value to use in filteredSubAreaList*/
export const subAreaListFilterState = atom({
    key: 'subAreaListFilter',
    default: ''
})

/* A selector to choose when use the complete list or filtered list
   with all rules to apply in the filtered list.*/
export const filteredSubAreaList = selector({
    key: 'filteredSubAreaList',
    get: ({get}) => {
        const filter = get(subAreaListFilterState).trim();
        const list = get(subAreaList);

        switch (filter) {
            case filter:
                return list.filter((item) =>
                item.subarea.toLowerCase().includes(filter.toLowerCase())
                )
            default:
                return list
        }
    }
})