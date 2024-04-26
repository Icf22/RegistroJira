import {test} from "@playwright/test";
import { BasePage } from "../pages/base.page";
import {TestPlan} from "../pages/testPlan.page"

//TEST PARA ELIMINAR REGISTROS EN JIRA
//! npm run delete:funcionalNegativo
test('EjecucionfuncionalPositivo', async ({page}) => {
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    const idJira = await basePage.iniciarSesison('FUNCIONAL POSITIVO');
    await testPlan.abrirCiclo('FUNCIONAL POSITIVO', idJira);
    await testPlan.registrarCiclo('FUNCIONAL POSITIVO', 16);
})

// Comando para ejecutar funcional Negativo:
//! npm run delete:funcionalNegativo
// test('DeleteNegativo', async ({page}) => { //no escribe nada ni no marca error
//     const basePage = new BasePage(page);
//     const testPlan = new TestPlan(page) 
//     const idJira = await basePage.iniciarSesison('FUNCIONAL NEGATIVO');
//     await testPlan.eliminarRegistros('FUNCIONAL NEGATIVO', idJira);
// })

// // Comando para ejecutar excepcion:
// //! npm run delete:excepcion
// test('Deleteexcepcion', async ({page}) => { //no escribe nada ni no marca error
//     const basePage = new BasePage(page);
//     const testPlan = new TestPlan(page) 
//     const idJira = await basePage.iniciarSesison('EXCEPCIÓN');
//     await testPlan.eliminarRegistros('EXCEPCIÓN', idJira);
// })

// // Comando para ejecutar no Afectacion:
// //! npm run delete:noAfectacion
// test('DeletenoAfectacion', async ({page}) => {
//     const basePage = new BasePage(page);
//     const testPlan = new TestPlan(page) 
//     const idJira = await basePage.iniciarSesison('NO AFECTACIÓN');
//     await testPlan.eliminarRegistros('NO AFECTACIÓN', idJira);
// })