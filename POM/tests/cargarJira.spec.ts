import {test} from "@playwright/test";
import { TEST, INICIO} from "../data/constantes";
import { BasePage } from "../pages/base.page";
import {TestPlan} from "../pages/testPlan.page"

// Comando para ejecutar funcional Positivo:
//! npm run flow:funcionalPositivo
test.use({ignoreHTTPSErrors: true});
test('funcionalPositivo', async ({page}) => {
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    await basePage.iniciarSesison(TEST.POSITIVO);
    await basePage.saltarLaDobleAutentificacion();
    await testPlan.registrarMatriz(TEST.POSITIVO, INICIO.POSITIVO);
})

// Comando para ejecutar funcional Negativo:
//! npm run flow:funcionalNegativo
test('funcionalNegativo', async ({page}) => { 
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    await basePage.iniciarSesison(TEST.NEGATIVO);
    await basePage.saltarLaDobleAutentificacion();
    await testPlan.registrarMatriz(TEST.NEGATIVO, INICIO.NEGATIVO);
})

// Comando para ejecutar excepcion:
//! npm run flow:excepcion
test('excepcion', async ({page}) => {
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    await basePage.iniciarSesison(TEST.EXCEPCION);
    await basePage.saltarLaDobleAutentificacion();
    await testPlan.registrarMatriz(TEST.EXCEPCION, INICIO.EXCEPCION);
})

// Comando para ejecutar no Afectacion:
//! npm run flow:noAfectacion
test('noAfectacion', async ({page}) => {
    const basePage = new BasePage(page);
    const testPlan = new TestPlan(page) 
    await basePage.iniciarSesison(TEST.AFECTACION);
    await basePage.saltarLaDobleAutentificacion();
    await testPlan.registrarMatriz(TEST.AFECTACION, INICIO.AFECTACION);
})