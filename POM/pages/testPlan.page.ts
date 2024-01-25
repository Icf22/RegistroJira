import { Locator, Page, test } from "@playwright/test";
import { RUTAS } from "../data/constantes";
import * as XLSX from 'xlsx';
import { BasePage } from "../pages/base.page"

export class TestPlan extends BasePage {
    txtBusqueda: Locator;
    btnAdd: Locator;
    page_carga: Locator;
    testStep: Locator;
    testData: Locator;
    testResult: Locator;
    addSteps: Locator;


    constructor(page: Page) {
        super(page);
        this.testStep = page.frameLocator("//iframe[contains(@id, 'com.thed.zephyr.je__viewissue-teststep-issuecontent-bdd-two-7698253642720034326__')]").locator('#zs-field-step--1')
        this.testData = page.frameLocator("//iframe[contains(@id, 'com.thed.zephyr.je__viewissue-teststep-issuecontent-bdd-two-7698253642720034326__')]").locator('#zs-field-data--1')
        this.testResult = page.frameLocator("//iframe[contains(@id, 'com.thed.zephyr.je__viewissue-teststep-issuecontent-bdd-two-7698253642720034326__')]").locator('#zs-field-result--1')
        this.addSteps = page.frameLocator("//iframe[contains(@id, 'com.thed.zephyr.je__viewissue-teststep-issuecontent-bdd-two-7698253642720034326__')]").locator("//div[@title='Add Steps']")
        this.txtBusqueda = page.locator('[data-test-id="search-dialog-input"]');
        this.page_carga = page.getByTestId('issue.views.issue-base.foundation.breadcrumbs.project.item')
        this.btnAdd = page.getByTitle('Add Steps').getByRole('img');

    }

    async registrarMatriz(hoja_excell: string, fila: number) {
        try {
            type FilaExcel = Array<number | string | Date | boolean | null | undefined>;
            const filePath = RUTAS.matriz;
            const workbook = XLSX.readFile(filePath);
            const nameSheet = hoja_excell;
            const worksheet = workbook.Sheets[nameSheet];

            //SE OBTIENE EL RANGO DE CELDAS DE LA HOJA
            const rangoCeldas = worksheet['!ref'] || 'A1:A1';
            const { s, e } = XLSX.utils.decode_range(rangoCeldas);
            
            //SE DECLARA LA VARIBLE PARA ASIGNARLE EL VALOR
            let conteoFilas = 0;

            //CON EL FOREACH PASA POR CADA UNA DE LOS VALORES POR FILA TOMANDO EN CUENTA LAS CONBINADAS Y DETECTA SI HAY VALORES EN TODA ESA FILA
            const filas: FilaExcel[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            filas.forEach((fila) => {
                //VERIFICA SI LA FILA TIENE AL MENOS UNA CELDA CON UN VALOR
                if (fila.some((valor) => valor !== null && valor !== undefined)) {
                    conteoFilas++;
                }
            });
            //SE DECLARA EL CONTEO DE FILAS EN EL AMBITO BASADO EN 1
            for (let i = fila; i <= (conteoFilas +2); i++) {
                try {
                    let nombrePrueba = worksheet['E' + i]?.w || '';
                    let precondiciones = worksheet['F' + i]?.w || '';
                    let script = worksheet['H' + i]?.w || '';
                    await this.testStep.fill(script);
                    await this.testData.fill(nombrePrueba);
                    await this.testResult.fill(precondiciones);
                    await this.addSteps.click();

                } catch (error) {
                    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++' + error);
                }
            }
        } catch (error) {
            console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++' + error);
        }
    }

       

}
