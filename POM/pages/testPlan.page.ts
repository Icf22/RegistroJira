import { Locator, Page, test, ElementHandle } from "@playwright/test";
import { EXCEL, CONSOLA, TIEMPOESPERA, RUTAS, XPATH } from "../data/constantes";
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
        this.btnDelete = page.frameLocator(XPATH.xFrameId).locator(XPATH.xBtnDelete)
        this.testStep = page.frameLocator(XPATH.xFrameId).locator(XPATH.xBtnTestStep)
        this.testData = page.frameLocator(XPATH.xFrameId).locator(XPATH.xBtnTestData)
        this.testResult = page.frameLocator(XPATH.xFrameId).locator(XPATH.xBtnTestResult)
        this.addSteps = page.frameLocator(XPATH.xFrameId).locator(XPATH.xBtnAddStep)
        this.txtBusqueda = page.locator(XPATH.xTxtBusqueda);
        this.page_carga = page.getByTestId('issue.views.issue-base.foundation.breadcrumbs.project.item')
        this.btnAdd = page.getByTitle('Add Steps').getByRole('img');
    }

    async tratarExcel(hoja_excell: string, fila: number){
        type FilaExcel = Array<number | string | Date | boolean | null | undefined>;
            const filePath = RUTAS.matriz;
            const workbook = XLSX.readFile(filePath);
            const nameSheet = hoja_excell;
            const worksheet = workbook.Sheets[nameSheet];

            const data: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            let ultimaFila = -1;

            for (let i = data.length - 1; i >= 0; i--) {
                const fila = data[i];
                //VALIDA QUE LA FILA TENGA ALMENOS UN DATO EN SUS CELDAS
                if (fila.some(celda => celda !== undefined && celda !== '')) {
                    ultimaFila = i + 1; //SE CONVIERTE EN AMBITO BASADO EN 1
                    break; //TERMINA EL BUCLE
                }
            }
            return{workbook, worksheet, data, ultimaFila};
    }

    async registrarMatriz(hoja_excell: string, fila: number) {
        try {
            const {workbook, worksheet, data, ultimaFila} = await this.tratarExcel(hoja_excell, fila);

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
                const nombrePrueba: string = worksheet[EXCEL.NOMBREPRUEBA + i]?.w;
                const precondiciones: string = worksheet[EXCEL.PRECONDICION + i]?.w;
                const script: string = worksheet[EXCEL.SCRIPT + i]?.w;
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

            const registros_iniciales = await this.obtenerRegistros();
            CONSOLA.EspacioConNombreHoja(hoja_excell);
            CONSOLA.CasosActuales(hoja_excell,registros_iniciales);
            CONSOLA.CasosPorAfectar((ultimaFila - fila + 1 ));
            const tiempoEspera = TIEMPOESPERA.TiempoEsperaRegistro;
            var count =  1;
            for (const dato of datos) {
                CONSOLA.CargandoDato(count);
                await LlenarCampos(dato);
                CONSOLA.EliminarLineaAnterior();
                CONSOLA.DatoRegistrado(count);
                await new Promise(resolve => setTimeout(resolve, tiempoEspera));
                CONSOLA.EliminarLineaAnterior();
                count++;
            }
            const registros_finales = await this.obtenerRegistros();
            CONSOLA.CasosProcesados(hoja_excell,(registros_finales-registros_iniciales));
            CONSOLA.TotalRegistrados(hoja_excell, (registros_finales));
            CONSOLA.EspacioAsteriscos();

        } catch (error) {
            CONSOLA.ErrorMsj(error);
        }
    }

    async obtenerRegistros() {
        try {
            //ESPERA A QUE EL ELEMENTO FRAME CARGUE
            const frameContent = await this.EsperarFrame(XPATH.xFrameId, XPATH.xBtnDelete); 
            const btnDeleteElements = await this.btnDelete.all(); // este es el que se usaba
            const btnDeleteElements2 = await frameContent?.$$(XPATH.xBtnDelete); //este es el parche (analizarlo) por cuestiones de tiempo
            //return btnDeleteElements.length;
            return btnDeleteElements2?.length == undefined ? 0 : btnDeleteElements2.length;
        } catch (error) {
            await this.handleError(
                CONSOLA.ErrorNumRegistros,
                error
            );
            throw error;
        }
    }

    async EsperarFrame(frameId : string, element: string){
        const frame = await this.page.waitForSelector(frameId);
        const frameContent = await frame.contentFrame();
        //PARA OBTENER SIEMPRE EL FRAMECONTENT, CASO CONTRARIO QUE ENVÍE NULO
        if (!frameContent) {
            CONSOLA.ErrorFrame();
            return null;
        }
        
        await frameContent.waitForLoadState('networkidle');

        //VALIDA QUE EXISTAN DATOS, SI DESPUES DE 10 SEGUNDOS NO ENCUENTRA NADA SIGUE EL PROCESO
        let elementInsideFrame; 
        try{elementInsideFrame = await frameContent.waitForSelector(element, { timeout: 10000 });}
        catch(error){return frameContent;}
        return frameContent;
    }

    async eliminarRegistros(nombrePrueba: String, idJira: String) {
        const frameContent = await this.EsperarFrame(XPATH.xFrameId, XPATH.xBtnDelete);
        const tiempoEspera = 1000;
        let btnDeleteElement = await frameContent?.$(XPATH.xBtnDelete);
        let btnDeleteElementTotal = await frameContent?.$$(XPATH.xBtnDelete);
        let cantidadTotal = btnDeleteElementTotal?.length != null ? btnDeleteElementTotal?.length /*+ 1*/ : btnDeleteElementTotal?.length;
        let contEliminados = 0;
        let count = 1;
        CONSOLA.MsjEliminando(nombrePrueba, idJira);
        CONSOLA.CantidadEliminar(cantidadTotal);
        while (btnDeleteElement) {
            CONSOLA.EliminandoDato();
            await btnDeleteElement.click();
            const btnDeleteElementDelete = await frameContent?.$(XPATH.xBtnDeleteModal);
            btnDeleteElementDelete?.click();
            CONSOLA.EliminarLineaAnterior();
            CONSOLA.DatoEliminado(count);
            await frameContent?.waitForTimeout(tiempoEspera);
            // Vuelve a buscar el botón de eliminar después de hacer clic en uno
            btnDeleteElement = await frameContent?.$(XPATH.xBtnDelete);
            contEliminados++;
            count++;
            CONSOLA.EliminarLineaAnterior();
        }
        contEliminados == 1 ? 
        CONSOLA.UnDatoEliminado(contEliminados,nombrePrueba):
        CONSOLA.DatosEliminados(contEliminados,nombrePrueba);
        CONSOLA.Eliminado(nombrePrueba, idJira);
    }

    async abrirCiclo(hoja_excell: string, idJira: string){
        const frameContent = await this.EsperarFrame(XPATH.xFrameExecId, XPATH.xBtnExecute);
        const tiempoEspera = 1000;
        let btnExecuteElementTotal = await frameContent?.$$(XPATH.xBtnExecute);
        if (btnExecuteElementTotal == null) {
            CONSOLA.ErrorElementos();
            return;
        }
        let cantidadTotal = btnExecuteElementTotal.length;
        if (cantidadTotal > 0) {
            const ultimoElemento = btnExecuteElementTotal[cantidadTotal - 1];
            await ultimoElemento.click();
        } else {
            CONSOLA.ErrorElementos();
        }
    }

    async validarRegistro(registros_excel: number, registros_ejecucion: number){
        let seValida = false
        if(registros_excel == registros_ejecucion){
            seValida = true;
        }
        return seValida;
    }

    async registrarCiclo(hoja_excell: string, fila: number){
        try {
            const {workbook, worksheet, data, ultimaFila} = await this.tratarExcel(hoja_excell, fila);
            //OBJETO PARA CREAR ARREGLO CON VARIOS PARAMETROS
            interface Dato {
                resultadoActual: string;
            }
            //ARREGLO PARA ALMACENAR LOS DATOS
            const datos: Dato[] = [];

            //CARGA LOS DATOS EN LA VARIABLE DATOS
            for (let i = fila; i <= ultimaFila; i++) {
                const resultadoActual: string = worksheet[EXCEL.RESULACTUAL + i]?.w;
                datos.push({ resultadoActual });
            }
            
            //ESPERAMOS A QUE EL FRAME DE EJECUCION CARGUE
            const frameContent = await this.EsperarFrame(XPATH.xFrameExecReg, XPATH.xTxtExecute);
            let txtExecute = await frameContent?.$$(XPATH.xTxtExecute);
            if (!txtExecute || txtExecute.length == 0) {
                CONSOLA.ErrorElementos();
                return;
            }
            else{
                //VALIDA QUE EL NUMERO DE REGISTROS EXISTENTES SEA EL MISMO NUMERO DE LOS REGISTROS DE LAMATRIZ
                let validado = await this.validarRegistro((ultimaFila - fila + 1), (txtExecute.length - 1));
                if(!validado){
                    CONSOLA.EspacioAsteriscos();
                    CONSOLA.ElementosNoCoinciden((ultimaFila - fila + 1), (txtExecute.length - 1));
                    CONSOLA.EspacioAsteriscos();
                    return;
                }
            }
            //FUNCION DONDE LLENA LOS CAMPOS
            const LlenarCampos = async (dato: Dato, count: number) => {
                const { resultadoActual } = dato;
                const element = txtExecute[count];
                await element.click();
                await element.waitForElementState("visible");
                await element.click();
                await this.page.keyboard.type(resultadoActual);
                await this.page.mouse.click(50, 50);
            };

            CONSOLA.EspacioConNombreHoja(hoja_excell + "REGISTRO DE EJECUCION");
            CONSOLA.CasosPorAfectar((ultimaFila - fila + 1 ));
            const tiempoEspera = TIEMPOESPERA.TiempoEsperaRegistro;
            var count =  1;
            for (const dato of datos) {
                CONSOLA.CargandoDato(count);
                await LlenarCampos(dato, count);
                CONSOLA.EliminarLineaAnterior();
                CONSOLA.DatoRegistrado(count);
                await new Promise(resolve => setTimeout(resolve, tiempoEspera));
                CONSOLA.EliminarLineaAnterior();
                count++;
            }
            CONSOLA.EspacioAsteriscos();

        } catch (error) {
            CONSOLA.ErrorMsj(error);
        }
    }
}
