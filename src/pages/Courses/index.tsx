import styles from './Courses.module.css'
import {NavBarCourses} from "./NavBarCourses";
import {TableCourses} from "./TableCourses";

export const Courses = () => {
    return (
        <div className={styles.Container}>
            <div className={styles.Header}>
                <NavBarCourses/>
            </div>
            <div className={styles.Content}>
                <TableCourses />
            </div>
            <div className={styles.Footer}>
            </div>
        </div>
    )
}