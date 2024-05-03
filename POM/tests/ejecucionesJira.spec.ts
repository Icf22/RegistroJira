import {test} from "@playwright/test";
import { TEST, INICIO} from "../data/constantes";
import { BasePage } from "../pages/base.page";
import {TestPlan} from "../pages/testPlan.page"

//TEST PARA ELIMINAR REGISTROS EN JIRA
test.use({ignoreHTTPSErrors: true});
// Comando para ejecutar funcional Positivo
//! npm run ciclo:funcionalPositivo
test('cicloFuncionalPositivo', async ({page}) => {
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    const idJira = await basePage.iniciarSesison(TEST.POSITIVO);
    await testPlan.abrirCiclo(TEST.POSITIVO, idJira);
    await testPlan.registrarCiclo(TEST.POSITIVO, INICIO.POSITIVO);
})

// Comando para ejecutar funcional Negativo
//! npm run ciclo:funcionalNegativo
test('cicloFuncionalNegativo', async ({page}) => {
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page)
    const idJira = await basePage.iniciarSesison(TEST.NEGATIVO);
    await testPlan.abrirCiclo(TEST.NEGATIVO, idJira);
    await testPlan.registrarCiclo(TEST.NEGATIVO, INICIO.NEGATIVO);
})

// Comando para ejecutar excepcion
//! npm run ciclo:excepcion
test('cicloExcepcion', async ({page}) => {
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    const idJira = await basePage.iniciarSesison(TEST.EXCEPCION);
    await testPlan.abrirCiclo(TEST.EXCEPCION, idJira);
    await testPlan.registrarCiclo(TEST.EXCEPCION, INICIO.EXCEPCION);
})

// Comando para ejecutar no Afectacion
//! npm run ciclo:noAfectacion
test('cicloNoAfectacion', async ({page}) => {
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    const idJira = await basePage.iniciarSesison(TEST.AFECTACION);
    await testPlan.abrirCiclo(TEST.AFECTACION, idJira);
    await testPlan.registrarCiclo(TEST.AFECTACION, INICIO.AFECTACION);
})