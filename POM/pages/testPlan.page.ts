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
    btnDelete: Locator;

    constructor(page: Page) {
        super(page);
        this.btnDelete = page.frameLocator("//iframe[contains(@id, 'com.thed.zephyr.je__viewissue-teststep-issuecontent-bdd-two-7698253642720034326__')]").locator("//div[@title='Delete']")
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

            // CONVIERTE LA HOJA DE EXCEL EN UN ARREGLO any[][] ESTO INDICA QUE ES UN ARREGLO DE CUALQUIER TIPO DE DATO Y POR ESO MISMO TRAE TODO EL RANGO DE FILAS
            const data: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            //SE DECLARA LA VARIABLE EN -1 PARA INDICAR QUE NO HAY FILAS CON DATOS
            let ultimaFila = -1;

            //LO HACE A LA INVERSA PARA ENCONTRAR LA ULTIMA LINEA OCUPADA POR INFORMACION
            for (let i = data.length - 1; i >= 0; i--) {
                const fila = data[i];
                //VALIDA QUE LA FILA TENGA ALMENOS UN DATO EN SUS CELDAS
                if (fila.some(celda => celda !== undefined && celda !== '')) {
                    ultimaFila = i + 1; //SE CONVIERTE EN AMBITO BASADO EN 1
                    break; //TERMINA EL BUCLE
                }
            }
            //OBJETO PARA CREAR ARREGLO CON VARIOS PARAMETROS
            interface Dato {
                nombrePrueba: string;
                precondiciones: string;
                script: string;
            }
            //ARREGLO PARA ALMACENAR LOS DATOS
            const datos: Dato[] = [];

            //CARGA LOS DATOS EN LA VARIABLE DATOS
            for (let i = fila; i <= ultimaFila; i++) {
                const nombrePrueba: string = worksheet['E' + i]?.w;
                const precondiciones: string = worksheet['F' + i]?.w;
                const script: string = worksheet['H' + i]?.w;
                datos.push({ nombrePrueba, precondiciones, script });
            }
            
            //FUNCION DONDE LLENA LOS CAMPOS
            const LlenarCampos = async (dato: Dato) => {
                const { nombrePrueba, precondiciones, script } = dato;

                await this.testStep.fill(script);
                await this.testData.fill(nombrePrueba);
                await this.testResult.fill(precondiciones);
                await this.addSteps.click();
            };
            //LLAMA LA FUNCION PARA LLENAR LOS DATOS, DESPUES DE LLENAR UNO, DA UN TIEMPO DE ESPERA A QUE SE REGISTRE EL DATO ANTERIOR PARA QUE NO REGISTRE DATOS EN BLANCO
              //const frame = this.page.frameLocator("//iframe[contains(@id, 'com.thed.zephyr.je__viewissue-teststep-issuecontent-bdd-two-7698253642720034326__')]");
              //await frame.waitForLoadState('networkidle');
              await this.testData.click();
              const registros_iniciales =  await this.obtenerRegistros();
              console.log("Numero de registros encontrados antes de iniciar el proceso son:" + " " + registros_iniciales)
         
           const tiempoEspera = 1500;
            for (const dato of datos) {
                await LlenarCampos(dato);
                await new Promise(resolve => setTimeout(resolve, tiempoEspera));
            }
            const registros_finales =  await this.obtenerRegistros();
            console.log("Numero de registros encontrados al final del proceso son:" + " " + registros_finales)
        } catch (error) {
            console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++' + error);
        }
    }

    async obtenerRegistros() {
        try {
          const btnDeleteElements = await this.btnDelete.all();
          return btnDeleteElements.length;
        } catch (error) {
          await this.handleError(
            "Ocurrió un error al obtener el número de registros:",
            error
          );
          throw error;
        }
      }
}
