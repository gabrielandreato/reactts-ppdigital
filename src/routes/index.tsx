import {Route, Routes} from "react-router-dom";
import PaginaBase from "../pages/PaginaBase";
import PaginaLogin from "../pages/PaginaLogin";
import {Courses} from "../pages/Courses";
import {Students} from "../pages/Students";
import {FormCourses} from "../pages/Courses/FormCourses";
import {FormStudent} from "../pages/Students/FormStudent";
import {TrainingMatrix} from "../pages/TrainingMatrix";

const Rotas = () => {
    return (
        <Routes>
            <Route path='/' element={<PaginaLogin />} />
            <Route path='/pagina-principal' element={<PaginaBase />}>
                <Route path={'matriz-treinamentos'} element={<TrainingMatrix />}/>
                <Route path={'cursos'} element={<Courses />}/>
                <Route path={'formulario-curso'} element={<FormCourses />}/>
                <Route path={'alunos'} element={<Students />}/>
                <Route path={'formulario-aluno'} element={<FormStudent />}/>
            </Route>
        </Routes>
    )
}

export default Rotas