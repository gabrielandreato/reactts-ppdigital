import {atom, selector} from "recoil";
import IOrigin from "../interfaces/IOrigin";

/* A state to origins data */
export const originList = atom<IOrigin[]>({
    key: 'originList',
    default: []
})

/* A state to set the filter value to use in filteredOriginList*/
export const originListFilterState = atom({
    key: 'originListFilter',
    default: ''
})

/* A selector to choose when use the complete list or filtered list
   with all rules to apply in the origin filtered list.*/
export const filteredOriginList = selector({
    key: 'filteredOriginList',
    get: ({get}) => {
        const filter = get(originListFilterState).trim();
        const list = get(originList);

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