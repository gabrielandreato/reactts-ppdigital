export default interface IRegistration {
    id: number,
    student_name: string,
    course_name: string,
    origin: number | undefined
    is_required: boolean
}