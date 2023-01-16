import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import PaginaBase from "../pages/PaginaBase";
import PaginaLogin from "../pages/PaginaLogin";
import {Courses} from "../pages/Courses";
import {Students} from "../pages/Students";
import {FormCourses} from "../pages/Courses/FormCourses";
import {FormStudent} from "../pages/Students/FormStudent";
import {TrainingMatrix} from "../pages/TrainingMatrix";
import {Registration} from "../pages/Registration";
import {FormRegistration} from "../pages/Registration/FormRegistration";
import {isAuthenticated} from "../state/hooks/authentication";
import {Manager} from "../pages/Managers";
import {FormManagers} from "../pages/Managers/FormManagers";


interface IProtectedRoute {
    children: React.ReactNode
}

const ProtectedRoute = ({children}: IProtectedRoute) => {
    let location = useLocation();
    if (!isAuthenticated()) {
        return <Navigate to="/" state={{from: location}} replace/>
    }
    return (<>{children}</>)
}

const Rotas = () => {
    return (
        <Routes>
            <Route path='/' element={<PaginaLogin/>}/>
            <Route path='/protegida' element={<ProtectedRoute><FormCourses/></ProtectedRoute>}/>
            <Route path='/pagina-principal' element={<ProtectedRoute><PaginaBase/></ProtectedRoute>}>
                <Route path={'matriz-treinamentos'} element={<TrainingMatrix/>}/>
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
            </Route>


        </Routes>
    )
}

export default Rotas