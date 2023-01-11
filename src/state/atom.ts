import {atom, AtomOptions, selector} from "recoil";
import ICourses from "../interfaces/ICourses";
import IStudent from "../interfaces/IStudent";
import IRegistration from "../interfaces/IRegistration";

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
                item.course_name.toLowerCase().includes(filter) || item.course_name.toUpperCase().includes(filter)
            )
        default:
            return list
    }
    }
})