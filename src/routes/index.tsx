import {Route, Routes} from "react-router-dom";
import PaginaBase from "../pages/PaginaBase";
import PaginaLogin from "../pages/PaginaLogin";
import {Courses} from "../pages/Courses";
import {Students} from "../pages/Students";
import {FormCourses} from "../pages/Courses/FormCourses";
import {FormStudent} from "../pages/Students/FormStudent";
import {TrainingMatrix} from "../pages/TrainingMatrix";
import {Registration} from "../pages/Registration";
import {FormRegistration} from "../pages/Registration/FormRegistration";

const Rotas = () => {
    return (
        <Routes>
            <Route path='/' element={<PaginaLogin />} />
            <Route path='/pagina-principal' element={<PaginaBase />}>
                <Route path={'matriz-treinamentos'} element={<TrainingMatrix />}/>
                <Route path={'cursos'} element={<Courses />}/>
                <Route path={'formulario-curso'} element={<FormCourses />}/>
                <Route path={'formulario-curso/:id'} element={<FormCourses />}/>
                <Route path={'alunos'} element={<Students />}/>
                <Route path={'formulario-aluno'} element={<FormStudent />}/>
                <Route path={'formulario-aluno/:id'} element={<FormStudent />}/>
                <Route path={'matriculas'} element={<Registration />}/>
                <Route path={'formulario-matricula'} element={<FormRegistration />}/>
                <Route path={'formulario-matricula/:id'} element={<FormRegistration />}/>
            </Route>
        </Routes>
    )
}

export default Rotas