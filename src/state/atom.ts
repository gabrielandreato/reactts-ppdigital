import {atom} from "recoil";
import ICourses from "../interfaces/ICourses";

export const courseList = atom<ICourses[]> ({
    key: 'listaCursos',
    default: [{
        id: 1,
        course: 'Curso de Logistica',
        data_final: new Date("2023-01-01")
    },
    {
        id: 2,
        course: 'Curso de Armazém',
        data_final: new Date("2023-01-01")
    },
    ]
})
