import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import PaginaBase from "../pages/PaginaBase";
import PaginaLogin from "../pages/PaginaLogin";
import {Courses} from "../pages/Courses";
import {Students} from "../pages/Students";
import {FormCourses} from "../pages/Courses/FormCourses";
import {FormStudent} from "../pages/Students/FormStudent";
import {Registration} from "../pages/Registration";
import {FormRegistration} from "../pages/Registration/FormRegistration";
import {useGetToken} from "../state/hooks/authentication";
import {Manager} from "../pages/Managers";
import {FormManagers} from "../pages/Managers/FormManagers";
import {CoursesByResponsability} from "../pages/CoursesByResponsability";
import {FormCoursesByResponsability} from "../pages/CoursesByResponsability/FormCoursesByResponsability";
import {PageNotFound} from "../pages/PageNotFound";


interface IProtectedRoute {
    children: React.ReactNode
}

/* A redirection for not logged users when they access any route.
This route protect all aplication data.*/
const ProtectedRoute = ({children}: IProtectedRoute) => {
    let location = useLocation();
    if (!useGetToken()) {
        return <Navigate to="/" state={{from: location}} replace/>
    }
    return (<>{children}</>)
}

/* A redirection for logged users whe they access the base route.
This route is to prevent login page access when user is already logged in. */
const StartRouteForLoggedUsers = ({children}: IProtectedRoute) => {
    let location = useLocation();
    if (useGetToken()) {
        return <Navigate to="/pagina-principal" state={{from: location}} replace/>
    }
    return (<>{children}</>)
}

const Rotas = () => {
    return (
        <Routes>
            <Route path='/' element={<StartRouteForLoggedUsers><PaginaLogin/></StartRouteForLoggedUsers>}/>
            <Route path='/protegida' element={<ProtectedRoute><FormCourses/></ProtectedRoute>}/>
            <Route path='/pagina-principal' element={<ProtectedRoute><PaginaBase/></ProtectedRoute>}>
                <Route path={'cursos'} element={<Courses/>}/>
                <Route path={'formulario-curso'} element={<FormCourses/>}/>
                <Route path={'formulario-curso/:id'} element={<FormCourses/>}/>
                <Route path={'alunos'} element={<Students/>}/>
                <Route path={'formulario-aluno'} element={<FormStudent/>}/>
                <Route path={'formulario-aluno/:id'} element={<FormStudent/>}/>
                <Route path={'matriculas'} element={<Registration/>}/>
                <Route path={'formulario-matricula'} element={<FormRegistration/>}/>
                <Route path={'formulario-matricula/:id'} element={<FormRegistration/>}/>
                <Route path={'gestores'} element={<Manager/>}/>
                <Route path={'formulario-gestor'} element={<FormManagers/>}/>
                <Route path={'formulario-gestor/:id'} element={<FormManagers/>}/>
                <Route path={'curso-cargo'} element={<CoursesByResponsability/>}/>
                <Route path={'formulario-curso-cargo'} element={<FormCoursesByResponsability/>}/>
                <Route path={'formulario-curso-cargo/:id'} element={<FormCoursesByResponsability />}/>
            </Route>
            <Route path={'*'} element={<PageNotFound/>}/>
        </Routes>
    )
}

export default Rotas