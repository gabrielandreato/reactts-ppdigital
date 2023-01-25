import {useSetRecoilState} from "recoil";
import ICourses from "../../interfaces/ICourses";
import {courseList} from "../atomCourse";

export const useUpdateCourses = () => {
    const setCourseList = useSetRecoilState<ICourses[]>(courseList)
    return(event: ICourses) => {
        return setCourseList([])
    }
}