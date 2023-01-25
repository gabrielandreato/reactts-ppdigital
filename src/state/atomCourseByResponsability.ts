import {atom, selector} from "recoil";
import ICourseByResponsability from "../interfaces/ICourseByResponsability";

export const coursesByResponsabilityList = atom<ICourseByResponsability[]>({
    /* A state to courses by responsability data */
    key: 'coursesByResponsabilityList',
    default: []
})

export const coursesByResponsabilityListFilterState = atom({
    /* A state to set the filter value to use in filteredCoursesByResponsabilityList*/
    key: 'coursesByResponsabilityListFilter',
    default: ''
})

export const filteredCoursesByResponsabilityList = selector({
    /* A selector to choose when use the complete list or filtered list
       with all rules to apply in the manager filtered list.*/
    key: 'filteredCoursesByResponsabilityList',
    get: ({get}) => {
        const filter = get(coursesByResponsabilityListFilterState).trim();
        const list = get(coursesByResponsabilityList);

        switch (filter) {
            case filter:
                return list.filter((item) =>
                    item.responsability_name.toLowerCase().includes(filter) || item.responsability_name.toUpperCase().includes(filter) ||
                    item.responsability_name.includes(filter) ||
                    item.course_name.toLowerCase().includes(filter) || item.course_name.toUpperCase().includes(filter) ||
                    item.course_name.includes(filter)
                )
            default:
                return list
        }
    }
})