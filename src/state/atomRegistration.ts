import {atom, selector} from "recoil";
import IRegistration from "../interfaces/IRegistration";

/* A state to registrations data */
export const registrationList = atom<IRegistration[]>({
    key: 'registrationList',
    default: []
})

/* A state to set the filter value to use in filteredRegistrationList*/
export const registrationListFilterState = atom({
    key: 'registrationListFilter',
    default: ''
})

/* A selector to choose when use the complete list or filtered list
   with all rules to apply in the registration filtered list.*/
export const filteredRegistrationList = selector({
    key: 'filteredRegistrationList',
    get: ({get}) => {
        const filter = get(registrationListFilterState).trim();
        const list = get(registrationList);

        switch (filter) {
            case filter:
                return list.filter((item) =>
                    item.student_name.toLowerCase().includes(filter.toLowerCase()) ||
                    item.course_name.toLowerCase().includes(filter.toLowerCase())
                )
            default:
                return list
        }
    }
})