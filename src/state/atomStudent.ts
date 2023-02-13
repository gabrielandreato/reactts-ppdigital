import {atom, selector} from "recoil";
import IStudent from "../interfaces/IStudent";

/* A state to students data */
export const studentList = atom<IStudent[]>({
    key: 'studentList',
    default: []
})

/* A state to set the filter value to use in filteredStudentList*/
export const studentListFilterState = atom({
    key: 'studentListFilter',
    default: ''
})

/* A selector to choose when use the complete list or filtered list
   with all rules to apply in the filtered list.*/
export const filteredStudentList = selector({
    key: 'filteredStudentList',
    get: ({get}) => {
        const filter = get(studentListFilterState).trim();
        const list = get(studentList);

        switch (filter) {
            case filter:
                return list.filter((item) =>
                item.name.toLowerCase().includes(filter.toLowerCase()) ||
                item.supervisor.name.toLowerCase().includes(filter.toLowerCase()) ||
                item.responsability.responsability.toLowerCase().includes(filter.toLowerCase()) ||
                item.subarea.subarea.toLowerCase().includes(filter.toLowerCase())
                )
            default:
                return list
        }
    }
})