import {atom} from "recoil";
import IResponsability from "../interfaces/IResponsability";

/* A state to courses data */
export const responsabilityList = atom<IResponsability[]>({
    key: 'responsabilityList',
    default: []
})