import {test} from "@playwright/test";
import { BasePage } from "../pages/base.page";
import {TestPlan} from "../pages/testPlan.page"

test.use({ignoreHTTPSErrors: true});
test('Funcional Positivo', async ({page}) => {
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    await basePage.iniciarSesison('FUNCIONAL POSITIVO');
    await testPlan.registrarMatriz('FUNCIONAL POSITIVO', 16);
})

test('Funcional Negativo', async ({page}) => { //no escribe nada ni no marca error
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    await basePage.iniciarSesison('FUNCIONAL NEGATIVO');
    await testPlan.registrarMatriz('FUNCIONAL NEGATIVO', 15);
})

test('Excepcion', async ({page}) => { //no escribe nada ni no marca error
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    await basePage.iniciarSesison('EXCEPCIÓN');
    await testPlan.registrarMatriz('EXCEPCIÓN', 15);
})

test('No afectacion', async ({page}) => {
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    await basePage.iniciarSesison('NO AFECTACIÓN');
    await testPlan.registrarMatriz('NO AFECTACIÓN', 14);
})