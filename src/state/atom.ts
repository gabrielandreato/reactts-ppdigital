import {atom} from "recoil";
import ICourses from "../interfaces/ICourses";
import IStudent from "../interfaces/IStudent";

export const courseList = atom<ICourses[]>({
    key: 'courseList',
    default: [{
        id: 1,
        course: 'Curso de Logistica',
        data_final: new Date("2023-01-01")
    },
        {
            id: 2,
            course: 'Curso de Armazém',
            data_final: new Date("2023-01-01")
        }, {
            id: 3,
            course: 'Curso de ASP',
            data_final: new Date("2023-01-01")
        }, {
            id: 4,
            course: 'Curso de Transporte Secundario',
            data_final: new Date("2023-01-01")
        }, {
            id: 5,
            course: 'Curso de Transporte Primario',
            data_final: new Date("2023-01-01")
        },
    ]
})

export const studentList = atom<IStudent[]>({
    key: 'studentList',
    default: []
})