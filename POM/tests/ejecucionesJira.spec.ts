import {test} from "@playwright/test";
import { BasePage } from "../pages/base.page";
import {TestPlan} from "../pages/testPlan.page"

//TEST PARA ELIMINAR REGISTROS EN JIRA
//! npm run delete:funcionalNegativo
test('EjecucionFuncionalPositivo', async ({page}) => {
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    const idJira = await basePage.iniciarSesison('FUNCIONAL POSITIVO');
    await testPlan.abrirCiclo('FUNCIONAL POSITIVO', idJira);
    await testPlan.registrarCiclo('FUNCIONAL POSITIVO', 16);
})

// Comando para ejecutar funcional Negativo:
//! npm run delete:funcionalNegativo
test('EjecucionFuncionalNegativo', async ({page}) => {
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page)
    const idJira = await basePage.iniciarSesison('FUNCIONAL NEGATIVO');
    await testPlan.abrirCiclo('FUNCIONAL NEGATIVO', idJira);
    await testPlan.registrarCiclo('FUNCIONAL NEGATIVO', 15);
})

// Comando para ejecutar excepcion:
//! npm run delete:excepcion
test('EjecucionExcepcion', async ({page}) => {
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    const idJira = await basePage.iniciarSesison('EXCEPCIÓN');
    await testPlan.abrirCiclo('EXCEPCIÓN', idJira);
    await testPlan.registrarCiclo('EXCEPCIÓN', 15);
})

// Comando para ejecutar no Afectacion:
//! npm run delete:noAfectacion
test('EjecucionNoAfectacion', async ({page}) => {
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    const idJira = await basePage.iniciarSesison('NO AFECTACIÓN');
    await testPlan.abrirCiclo('NO AFECTACIÓN', idJira);
    await testPlan.registrarCiclo('NO AFECTACIÓN', 14);
})