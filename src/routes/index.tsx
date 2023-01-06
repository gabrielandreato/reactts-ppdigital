import {Route, Routes} from "react-router-dom";
import PaginaBase from "../pages/PaginaBase";
import PaginaLogin from "../pages/PaginaLogin";
import {Courses} from "../pages/Courses";

const Rotas = () => {
    return (
        <Routes>
            <Route path='/' element={<PaginaLogin />} />
            <Route path='/pagina-principal' element={<PaginaBase />}>
                <Route path={'courses'} element={<Courses />}/>
            </Route>
        </Routes>
    )
}

export default Rotas