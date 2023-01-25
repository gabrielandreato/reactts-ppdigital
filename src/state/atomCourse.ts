import {atom, selector} from "recoil";
import ICourses from "../interfaces/ICourses";

export const courseList = atom<ICourses[]>({
    /* A state to courses data */
    key: 'courseList',
    default: []
})

export const courseListFilterState = atom({
    /* A state to set the filter value to use in filteredCourseList*/
    key: 'courseListFilter',
    default: ''
})

export const filteredCourseList = selector({
    /* A selector to choose when use the complete list or filtered list
       with all rules to apply in the course filtered list.*/
    key: 'filteredCourseList',
    get: ({get}) => {
        const filter = get(courseListFilterState).trim();
        const list = get(courseList);

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