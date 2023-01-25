import {atom, selector} from "recoil";
import IRegistration from "../interfaces/IRegistration";

export const registrationList = atom<IRegistration[]>({
    /* A state to registrations data */
    key: 'registrationList',
    default: []
})

export const registrationListFilterState = atom({
    /* A state to set the filter value to use in filteredRegistrationList*/
    key: 'registrationListFilter',
    default: ''
})

export const filteredRegistrationList = selector({
    /* A selector to choose when use the complete list or filtered list
       with all rules to apply in the registration filtered list.*/
    key: 'filteredRegistrationList',
    get: ({get}) => {
        const filter = get(registrationListFilterState).trim();
        const list = get(registrationList);

        switch (filter) {
            case filter:
                return list.filter((item) =>
                    item.student_name.toLowerCase().includes(filter) || item.student_name.toUpperCase().includes(filter) ||
                    item.student_name.includes(filter) ||
                    item.course_name.toLowerCase().includes(filter) || item.course_name.toUpperCase().includes(filter) ||
                    item.course_name.includes(filter)
                )
            default:
                return list
        }
    }
})