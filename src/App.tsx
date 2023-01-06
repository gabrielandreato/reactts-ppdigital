import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Rotas from "./routes";
import {RecoilRoot} from "recoil";


function App() {
    return (
        <RecoilRoot>
            <BrowserRouter>
                <Rotas/>
            </BrowserRouter>
        </RecoilRoot>
    );
}

export default App;
