import {atom} from "recoil";
import IResponsability from "../interfaces/IResponsability";

export const responsabilityList = atom<IResponsability[]>({
    /* A state to courses data */
    key: 'responsabilityList',
    default: []
})