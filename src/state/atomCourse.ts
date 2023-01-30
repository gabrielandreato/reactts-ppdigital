import {atom, selector} from "recoil";
import ICourses from "../interfaces/ICourses";

/* A state to courses data */
export const courseList = atom<ICourses[]>({
    key: 'courseList',
    default: []
})

/* A state to set the filter value to use in filteredCourseList*/
export const courseListFilterState = atom({
    key: 'courseListFilter',
    default: ''
})

/* A selector to choose when use the complete list or filtered list
   with all rules to apply in the course filtered list.*/
export const filteredCourseList = selector({
    key: 'filteredCourseList',
    get: ({get}) => {
        const filter = get(courseListFilterState).trim();
        const list = get(courseList);

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