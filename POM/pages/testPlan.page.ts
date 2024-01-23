import { Locator, Page, test } from "@playwright/test";
import { RUTAS } from "../data/constantes";
import * as XLSX from 'xlsx';
import { BasePage } from "../pages/base.page"
//import { Workbook } from 'exceljs';

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

    // async registrarMatriz() {
    //     try {
    //         const filePath = RUTAS.matriz;
    //         const workbook = XLSX.readFile(filePath);
    //         const nameSheet = 'FUNCIONAL POSITIVO'
    //         const worksheet = workbook.Sheets[nameSheet];

    //         let numeroFilas = 0;
    //         const lastRow = XLSX.utils.sheet_to_json(worksheet).length;
    //         console.log(numeroFilas);
    //         for (let i = 2; i <= lastRow; i++) {
    //             try {
    //                 let nombrePrueba = worksheet['E' + i]?.w || '';
    //                 let precondiciones = worksheet['F' + i]?.w || '';
    //                 let script = worksheet['H' + i]?.w || '';
    //                 await this.testStep.fill(script);
    //                 await this.testData.fill(nombrePrueba);
    //                 await this.testResult.fill(precondiciones);
    //                 await this.addSteps.click();

    //             } catch (error) {
    //                 console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++' + error);
    //             }
    //         }
    //     } catch (error) {
    //         console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++' + error);
    //     }
    // }

    // async registrarMatriz() {
    //     try {
    //         const filesPath = RUTAS.matriz;
    //         const workbook = new Workbook();
    //         await workbook.xlsx.readFile(filesPath);
    //         const nameSheet2 = 'FUNCIONAL POSITIVO'
    //         const hoja = workbook.getWorksheet(nameSheet2);

    //         // Obtener el rango de celdas utilizado en la hoja
    //         const rangoCeldas = hoja['!ref'];
    //         const { s, e } = hoja['!range'];

    //         // Iterar sobre las filas y agregar aquellas con al menos una celda no vacía
    //         let conteoFilas = 0;
    //         for (let rowNum = s.r; rowNum <= e.r; rowNum++) {
    //             const fila = hoja.getRow(rowNum);

    //             if (fila.values.some((valor) => valor !== null && valor !== undefined)) {
    //                 conteoFilas++;
    //             }
    //         }

    //         for (let i = 2; i <= lastRow; i++) {
    //             try {
    //                 let nombrePrueba = hoja?.getCell('E' + i).value ?? "";
    //                 let precondiciones = hoja?.getCell('F' + i).value ?? "";
    //                 let script = hoja?.getCell('F' + i).value ?? "";
    //                 await this.testStep.fill(script.toString());
    //                 await this.testData.fill(nombrePrueba.toString());
    //                 await this.testResult.fill(precondiciones.toString());
    //                 await this.addSteps.click();

    //             } catch (error) {
    //                 console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++' + error);
    //             }
    //         }
    //     } catch (error) {
    //         console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++' + error);
    //     }
    // }

    async registrarMatriz() {
        try {
            type FilaExcel = Array<number | string | Date | boolean | null | undefined>;
            // const args = process.argv.slice(2);

            // if(args.length !== 1){
            //     console.error("No funcionó");
            //     process.exit(1);
            // }
            // const fileRuta = args[0];
            const filePath = RUTAS.matriz;
            const workbook = XLSX.readFile(filePath);
            const nameSheet = 'FUNCIONAL POSITIVO'
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
            //SE DECLARA EL AMBITO BASADO EN 1
            console.log("Conteo de filas " + (conteoFilas + 1 ));

            //SEGUNDA OPCION
            let indiceUltimaFila: number | null = null;

            //S = CELDA DE INICIO
            //E = CELDA FINAL
            //R = ROW O FILA
            //C = COLUMNA
            for (let rowNum = s.r; rowNum <= e.r; rowNum++) {
                const fila: FilaExcel = [];
                for (let colNum = s.c; colNum <= e.c; colNum++) {
                    const celda = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
                    const valorCelda = worksheet[celda] ? worksheet[celda].v : undefined;
                    fila.push(valorCelda);
                }
        
                //VERIFICA SI LA FILA TIENE AL MENOS UNA CELDA CON UN VALOR
                if (fila.some((valor) => valor !== null && valor !== undefined)) {
                    indiceUltimaFila = rowNum;
                }
            }
            //CONVERTIR DE BASADO EN 0 A BASADO EN 1
            indiceUltimaFila = (indiceUltimaFila || 0 + 1);
            console.log("La ultima fila es: " + indiceUltimaFila);

            //TRAE LOS DATOS PERO NO RESPETA LAS FILAS COMBINADAS
            const lastRow = XLSX.utils.sheet_to_json(worksheet).length;
            console.log("El lastrow es: " + lastRow);

            //SE DECLARA EL CONTEO DE FILAS BASADO EN 1
            for (let i = 16; i <= (conteoFilas +1); i++) {
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
