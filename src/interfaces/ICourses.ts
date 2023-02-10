import IOrigin from "./IOrigin";
import ISubArea from "./ISubArea";

export default interface ICourses {
    id: number,
    name: string,
    due_date: Date
    origin: IOrigin
    subarea: ISubArea
    id_kaptiva: number
}