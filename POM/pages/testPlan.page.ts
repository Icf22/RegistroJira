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
                const nombrePrueba: string = worksheet['H' + i]?.w;
                const precondiciones: string = worksheet['F' + i]?.w;
                const script: string = worksheet['I' + i]?.w;
                datos.push({ nombrePrueba, precondiciones, script });
            }

            //FUNCION DONDE LLENA LOS CAMPOS
            const LlenarCampos = async (dato: Dato) => {
                const { nombrePrueba, precondiciones, script } = dato;

                await this.testStep.fill(nombrePrueba);
                await this.testData.fill(precondiciones);
                await this.testResult.fill(script);
                await this.addSteps.click();
            };
            //LLAMA LA FUNCION PARA LLENAR LOS DATOS, DESPUES DE LLENAR UNO, DA UN TIEMPO DE ESPERA A QUE SE REGISTRE EL DATO ANTERIOR PARA QUE NO REGISTRE DATOS EN BLANCO
            //const frame = this.page.frameLocator("//iframe[contains(@id, 'com.thed.zephyr.je__viewissue-teststep-issuecontent-bdd-two-7698253642720034326__')]");
            //await frame.waitForLoadState('networkidle');
            //await this.testData.click();
            const registros_iniciales = await this.obtenerRegistros();
            console.log(`\n************************** ${hoja_excell} *****************************`)
            console.log("Casos actuales en jira para los registros tipo"+ " " + hoja_excell + ": " + registros_iniciales)
            console.log("Casos para registrar disponibles en la matriz:" + " " + (ultimaFila - fila + 1 ) + '\n')
            const tiempoEspera = 1500;
            var count =  1;
            for (const dato of datos) {
                console.log(`Cargando dato ${count}...`)
                await LlenarCampos(dato);
                process.stdout.write('\u001b[A\u001b[K\u001b[A');
                console.log(`Dato ${count} cargado \u2713`)
                await new Promise(resolve => setTimeout(resolve, tiempoEspera));
                process.stdout.write('\u001b[A\u001b[K\u001b[A');
                count++;
            }
            const registros_finales = await this.obtenerRegistros();
            console.log("Casos procesados/cargados en jira para el tipo " + hoja_excell + " " +  "son" + " " + (registros_finales-registros_iniciales))
            console.log("Total de casos registrados en jira para el test case tipo " +" " + hoja_excell + " " + (registros_finales));
            console.log(`************************************************************************`);
        } catch (error) {
            console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++' + error);
        }
    }

    async obtenerRegistros() {
        try {
            //ESPERA A QUE EL ELEMENTO FRAME CARGUE
            const frameContent = await this.EsperarFrame(); 
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

    async EsperarFrame(){
        const frame = await this.page.waitForSelector("//iframe[contains(@id, 'com.thed.zephyr.je__viewissue-teststep-issuecontent-bdd-two-7698253642720034326__')]");
        const frameContent = await frame.contentFrame();
        //PARA OBTENER SIEMPRE EL FRAMECONTENT, CASO CONTRARIO QUE ENVÍE NULO
        if (!frameContent) {
            console.error('El contenido del frame no se pudo obtener.');
            return null;
        }

        //VALIDA QUE EXISTAN DATOS, SI DESPUES DE 10 SEGUNDOS NO ENCUENTRA NADA SIGUE EL PROCESO
        let elementInsideFrame; 
        try{elementInsideFrame = await frameContent.waitForSelector("//div[@title='Delete']", { timeout: 10000 });}
        catch(error){return frameContent;}

        return frameContent;
    }

    async eliminarRegistros(nombrePrueba: String) {
        const frameContent = await this.EsperarFrame();
        const tiempoEspera = 1000;
        let btnDeleteElement = await frameContent?.$('//div[@title="Delete"]');
        let btnDeleteElementTotal = await frameContent?.$$('//div[@title="Delete"]');
        let cantidadTotal = btnDeleteElementTotal?.length != null ? btnDeleteElementTotal?.length + 1 : btnDeleteElementTotal?.length;
        let contEliminados = 0;
        let count = 1;
        console.log(`\n************************** ELIMINANDO ${nombrePrueba} *****************************`)
        console.log(`\nCantidad total a eliminar: ${cantidadTotal}`)
        while (btnDeleteElement) {
            console.log(`Eliminando dato`);
            await btnDeleteElement.click();
            const btnDeleteElementDelete = await frameContent?.$('button[type="button"].ak-button.ak-button__appearance-primary');
            btnDeleteElementDelete?.click();
            process.stdout.write('\u001b[A\u001b[K\u001b[A');
            console.log(`Dato ${count} Eliminado \u2713`);
            await frameContent?.waitForTimeout(tiempoEspera);
            // Vuelve a buscar el botón de eliminar después de hacer clic en uno
            btnDeleteElement = await frameContent?.$('//div[@title="Delete"]');
            contEliminados++;
            count++;
            process.stdout.write('\u001b[A\u001b[K\u001b[A');
        }
        contEliminados == 1 ? 
        console.log(`Se eliminó ${contEliminados} registro del test case ${nombrePrueba}`) : 
        console.log(`Se eliminaron ${contEliminados} registros del test case ${nombrePrueba}`);
        console.log(`\n************************** ${nombrePrueba} ELIMINADO ******************************`)
    }
}
