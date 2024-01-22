import {test} from "@playwright/test";
import { BasePage } from "../pages/base.page";
import {TestPlan} from "../pages/testPlan.page"

test.use({ignoreHTTPSErrors: true});
test('cargarInfoJira', async ({page}) => {
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    await basePage.iniciarSesison();
    await testPlan.registrarMatriz();
})