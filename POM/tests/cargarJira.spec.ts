import {test} from "@playwright/test";
import { BasePage } from "../pages/base.page";
import {TestPlan} from "../pages/testPlan.page"

// Comando para ejecutar funcional Positivo:
//! npm run flow:funcionalPositivo
test.use({ignoreHTTPSErrors: true});
test.only('funcionalPositivo', async ({page}) => {
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    await basePage.iniciarSesison('FUNCIONAL POSITIVO');
    await testPlan.registrarMatriz('FUNCIONAL POSITIVO', 16);
})

// Comando para ejecutar funcional Negativo:
//! npm run flow:funcionalNegativo
test('funcionalNegativo', async ({page}) => { //no escribe nada ni no marca error
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    await basePage.iniciarSesison('FUNCIONAL NEGATIVO');
    await testPlan.registrarMatriz('FUNCIONAL NEGATIVO', 15);
})

// Comando para ejecutar excepcion:
//! npm run flow:excepcion
test('excepcion', async ({page}) => { //no escribe nada ni no marca error
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    await basePage.iniciarSesison('EXCEPCIÓN');
    await testPlan.registrarMatriz('EXCEPCIÓN', 15);
})

// Comando para ejecutar no Afectacion:
//! npm run flow:noAfectacion
test('noAfectacion', async ({page}) => {
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    await basePage.iniciarSesison('NO AFECTACIÓN');
    await testPlan.registrarMatriz('NO AFECTACIÓN', 14);
})


//TEST PARA ELIMINAR REGISTROS EN JIRA
test('DeletefuncionalPositivo', async ({page}) => {
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    await basePage.iniciarSesison('FUNCIONAL POSITIVO');
    await testPlan.eliminarRegistros('FUNCIONAL POSITIVO');
})

// Comando para ejecutar funcional Negativo:
//! npm run flow:funcionalNegativo
test('DeleteNegativo', async ({page}) => { //no escribe nada ni no marca error
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    await basePage.iniciarSesison('FUNCIONAL NEGATIVO');
    await testPlan.eliminarRegistros('FUNCIONAL NEGATIVO');
})

// Comando para ejecutar excepcion:
//! npm run flow:excepcion
test('Deleteexcepcion', async ({page}) => { //no escribe nada ni no marca error
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    await basePage.iniciarSesison('EXCEPCIÓN');
    await testPlan.eliminarRegistros('EXCEPCIÓN');
})

// Comando para ejecutar no Afectacion:
//! npm run flow:noAfectacion
test('DeletenoAfectacion', async ({page}) => {
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    await basePage.iniciarSesison('NO AFECTACIÓN');
    await testPlan.eliminarRegistros('NO AFECTACIÓN');
})