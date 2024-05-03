import {test} from "@playwright/test";
import {TEST, INICIO} from "../data/constantes";
import { BasePage } from "../pages/base.page";
import {TestPlan} from "../pages/testPlan.page";

//TEST PARA ELIMINAR REGISTROS EN JIRA
test.use({ignoreHTTPSErrors: true});
// Comando para ejecutar funcional Positivo
//! npm run delete:funcionalNegativo
test.only('DeletefuncionalPositivo', async ({page}) => {
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    const idJira = await basePage.iniciarSesison(TEST.POSITIVO);
    await testPlan.eliminarRegistros(TEST.POSITIVO, idJira);
})

// Comando para ejecutar funcional Negativo
//! npm run delete:funcionalNegativo
test('DeletefuncionalNegativo', async ({page}) => { 
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    const idJira = await basePage.iniciarSesison(TEST.NEGATIVO);
    await testPlan.eliminarRegistros(TEST.NEGATIVO, idJira);
})

// Comando para ejecutar excepcion:
//! npm run delete:excepcion
test('Deleteexcepcion', async ({page}) => {
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    const idJira = await basePage.iniciarSesison(TEST.EXCEPCION);
    await testPlan.eliminarRegistros(TEST.EXCEPCION, idJira);
})

// Comando para ejecutar no Afectacion:
//! npm run delete:noAfectacion
test('DeletenoAfectacion', async ({page}) => {
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    const idJira = await basePage.iniciarSesison(TEST.AFECTACION);
    await testPlan.eliminarRegistros(TEST.AFECTACION, idJira);
})