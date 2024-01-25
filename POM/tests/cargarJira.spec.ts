import {test} from "@playwright/test";
import { BasePage } from "../pages/base.page";
import {TestPlan} from "../pages/testPlan.page"

test.use({ignoreHTTPSErrors: true});
test('Funcional Positivo', async ({page}) => {
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    await basePage.iniciarSesison('FUNCIONAL POSITIVO');
    await testPlan.registrarMatriz('FUNCIONAL POSITIVO');
})

test('Funcional Negativo', async ({page}) => {
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    await basePage.iniciarSesison('FUNCIONAL NEGATIVO');
    await testPlan.registrarMatriz('FUNCIONAL NEGATIVO');
})

test('Exepcion', async ({page}) => {
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    await basePage.iniciarSesison('EXEPCIÓN');
    await testPlan.registrarMatriz('EXEPCIÓN');
})

test('No afectacion', async ({page}) => {
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    await basePage.iniciarSesison('NO AFECTACIÓN');
    await testPlan.registrarMatriz('NO AFECTACIÓN');
})