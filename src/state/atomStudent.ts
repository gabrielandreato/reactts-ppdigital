import {atom, selector} from "recoil";
import IStudent from "../interfaces/IStudent";

export const studentList = atom<IStudent[]>({
    /* A state to students data */
    key: 'studentList',
    default: []
})

export const studentListFilterState = atom({
    /* A state to set the filter value to use in filteredStudentList*/
    key: 'studentListFilter',
    default: ''
})

export const filteredStudentList = selector({
    /* A selector to choose when use the complete list or filtered list
       with all rules to apply in the filtered list.*/
    key: 'filteredStudentList',
    get: ({get}) => {
        const filter = get(studentListFilterState).trim();
        const list = get(studentList);

        switch (filter) {
            case filter:
                return list.filter((item) =>
                    item.name.toLowerCase().includes(filter) || item.name.toUpperCase().includes(filter)
                )
            default:
                return list
        }
    }
})