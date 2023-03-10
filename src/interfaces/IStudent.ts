import IResponsability from "./IResponsability";
import ISubArea from "./ISubArea";

export default interface IStudent {
    id: number,
    name: string,
    is_manager: boolean,
    supervisor: IStudent,
    responsability: IResponsability,
    subarea: ISubArea
}
