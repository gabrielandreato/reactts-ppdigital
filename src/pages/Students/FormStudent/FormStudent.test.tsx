import {RecoilRoot} from "recoil";
import {FormStudent} from "./index";
import {render} from "@testing-library/react";

describe('FormStudent.tsx behavior', () => {
    test('when the input was empty, news students cant be added', () => {
        render(
            <RecoilRoot>
                <FormStudent />
            </RecoilRoot>
        )
    })
})