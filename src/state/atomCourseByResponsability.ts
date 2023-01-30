import {atom, selector} from "recoil";
import ICourseByResponsability from "../interfaces/ICourseByResponsability";

/* A state to courses by responsability data */
export const coursesByResponsabilityList = atom<ICourseByResponsability[]>({
    key: 'coursesByResponsabilityList',
    default: []
})

/* A state to set the filter value to use in filteredCoursesByResponsabilityList*/
export const coursesByResponsabilityListFilterState = atom({
    key: 'coursesByResponsabilityListFilter',
    default: ''
})

/* A selector to choose when use the complete list or filtered list
   with all rules to apply in the manager filtered list.*/
export const filteredCoursesByResponsabilityList = selector({
    key: 'filteredCoursesByResponsabilityList',
    get: ({get}) => {
        const filter = get(coursesByResponsabilityListFilterState).trim();
        const list = get(coursesByResponsabilityList);

        switch (filter) {
            case filter:
                return list.filter((item) =>
                    item.responsability_name.toLowerCase().includes(filter.toLowerCase()) ||
                    item.course_name.toLowerCase().includes(filter.toLowerCase())
                )
            default:
                return list
        }
    }
})