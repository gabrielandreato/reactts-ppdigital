import IResponsability from "./IResponsability";

export default interface IStudent {
    id: number,
    name: string,
    is_manager: boolean,
    supervisor: IStudent,
    responsability: IResponsability,
}
