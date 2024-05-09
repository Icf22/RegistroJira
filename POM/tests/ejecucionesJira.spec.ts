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
    const existe = await testPlan.abrirCiclo(TEST.POSITIVO, idJira);
    if(existe){
        await testPlan.registrarCiclo(TEST.POSITIVO, INICIO.POSITIVO);
    }
})

// Comando para ejecutar funcional Negativo
//! npm run ciclo:funcionalNegativo
test('cicloFuncionalNegativo', async ({page}) => {
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page)
    const idJira = await basePage.iniciarSesison(TEST.NEGATIVO);
    const existe = await testPlan.abrirCiclo(TEST.NEGATIVO, idJira);
    if(existe){
        await testPlan.registrarCiclo(TEST.NEGATIVO, INICIO.NEGATIVO);
    }
    
})

// Comando para ejecutar excepcion
//! npm run ciclo:excepcion
test('cicloExcepcion', async ({page}) => {
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    const idJira = await basePage.iniciarSesison(TEST.EXCEPCION);
    const existe = await testPlan.abrirCiclo(TEST.EXCEPCION, idJira);
    if(existe){
        await testPlan.registrarCiclo(TEST.EXCEPCION, INICIO.EXCEPCION);
    }
})

// Comando para ejecutar no Afectacion
//! npm run ciclo:noAfectacion
test('cicloNoAfectacion', async ({page}) => {
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    const idJira = await basePage.iniciarSesison(TEST.AFECTACION);
    const existe = await testPlan.abrirCiclo(TEST.AFECTACION, idJira);
    if(existe){
        await testPlan.registrarCiclo(TEST.AFECTACION, INICIO.AFECTACION);
    }
})