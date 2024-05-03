//TODAS LAS URLS UTILIZADAS EN EL SISTEMA
export const URL= {
    JIRAURL: 'https://id.atlassian.com/login',
    TESTPLAN:'https://e-global.atlassian.net/browse/'
}

//RUTAS CORRESPONDIENTES A LOS RECURSOS UTILIZADOS COMO EL EXCEL
export const RUTAS = {
    matriz : 'C:\\InsumoCargaJira\\MatrizDeEjecucion.xlsx',
    matrizPruebas : './resources/MatrizDeEjecucion.xlsx'
 }

 //TEST EXISTENTES, EN ESTE CASO SON 4 ACTUALMENTE
export const TEST = {
    POSITIVO: 'FUNCIONAL POSITIVO',
    NEGATIVO: 'FUNCIONAL NEGATIVO',
    EXCEPCION: 'EXCEPCIÓN',
    AFECTACION: 'NO AFECTACIÓN'
}

//CORRESPONDE A LA LINEA DEL EXCEL EN DONDE INICIARÁ EL REGISTRO
 export const INICIO = {
    POSITIVO: 16,
    NEGATIVO: 16,
    EXCEPCION: 16,
    AFECTACION: 16
 }

 //CORRESPONDE A LA COLUMNA O FILA QUE SE UTILIZA PARA OBTENER LOS DATOS DEL EXCEL
 export const EXCEL = {
    CADENAVACIA: '',
    OBTENERCASE: 'E',
    NUMBERCASE: 5,
    NOMBREPRUEBA: 'H',
    PRECONDICION:'F',
    SCRIPT: 'I',
    RESULACTUAL: 'J'
 }

 //TOTAL DE MENSAJES QUE MUESTRA EL SISTEMA SE REPRESENTARA COMO CONSOLA
 export const CONSOLA = {
    EspacioConNombreHoja: (hoja_excell: string) => 
        console.log(`\n************************** ${hoja_excell} *****************************`),
    CasosActuales: (hoja_excell: string, registros_iniciales: number) => 
        console.log(`Casos actuales en jira para los registros tipo ${hoja_excell} : ${registros_iniciales}`),
    CasosPorAfectar: (total: number) => 
        console.log(`Casos para registrar disponibles en la matriz: ${total}\n`),
    CargandoDato: (numberDato:number) => 
        console.log(`Cargando dato ${numberDato}...`),
    EliminarLineaAnterior: () => 
        process.stdout.write('\u001b[A\u001b[K\u001b[A'),
    DatoRegistrado: (numberDato: number) =>
        console.log(`Dato ${numberDato} cargado \u2713`),
    CasosProcesados: (hoja_excell: string, total: number) =>
        console.log(`Casos procesados/cargados en jira para el tipo ${hoja_excell} son ${total}`),
    TotalRegistrados: (hoja_excell: string, total: number) =>
        console.log(`Total de casos registrados en jira para el test case tipo ${hoja_excell}: ${total}`),
    EspacioAsteriscos: () => 
        console.log(`************************************************************************`),
    MsjEliminando: (nombrePrueba: String, idJira: String) =>
        console.log(`\n************************** ELIMINANDO ${nombrePrueba} (${idJira})*****************************`),
    CantidadEliminar: (total:number | undefined) => 
        console.log(`\nCantidad total a eliminar: ${total}`), 
    EliminandoDato: () => console.log(`Eliminando dato`),
    DatoEliminado: (count : number) => console.log(`Dato ${count} Eliminado \u2713`),
    UnDatoEliminado: (contEliminados: number, nombrePrueba: String) => 
        console.log(`Se eliminó ${contEliminados} registro del test case ${nombrePrueba}`) ,
    DatosEliminados: (contEliminados: number, nombrePrueba: String) => 
        console.log(`Se eliminaron ${contEliminados} registros del test case ${nombrePrueba}`),
    Eliminado:(nombrePrueba: String, idJira: String) =>
        console.log(`\n************************** ${nombrePrueba} (${idJira}) ELIMINADO ******************************`),
    ErrorMsj: (error: any) =>
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++' + error),
    ErrorNumRegistros: "Ocurrió un error al obtener el número de registros:",
    ErrorFrame: () => console.error('El contenido del frame no se pudo obtener.'),
    ErrorElementos: () => console.error('No hay elementos.'),
    ElementosNoCoinciden: (matriz: number, ciclo: number) => 
        console.log(`Los elementos en la matriz (${matriz}) no coinciden con los elementos en el ciclo (${ciclo}) revisa que la matriz sea correcta.`)
 }

 //TIEMPOS DE ESPERA ESTABLECIDOS EN EL SISTEMA
 export const TIEMPOESPERA ={
    TiempoEsperaRegistro: 1500
 }

 //LOCALIZADORES, XPATH O CSS UTILIZADOS PARA IDENTIFICAR CADA ELEMENTO
 export const XPATH = {
    xBtnDelete: '//div[@title="Delete"]',
    xFrameId: "//iframe[contains(@id, 'com.thed.zephyr.je__viewissue-teststep-issuecontent-bdd-two')]",
    xFrameExecId: "//iframe[contains(@id, 'com.thed.zephyr.je__viewissue-executions-projectCentric-issuecontent')]",
    xFrameExecReg: "//iframe[contains(@id, 'com.thed.zephyr.je__general-search-test-executions')]",
    xBtnDeleteModal: 'button[type="button"].ak-button.ak-button__appearance-primary',
    xBtnTestStep: '#zs-field-step--1',
    xBtnTestData: '#zs-field-data--1',
    xBtnTestResult: '#zs-field-result--1',
    xBtnAddStep: "//div[@title='Add Steps']",
    xTxtBusqueda: '[data-test-id="search-dialog-input"]',
    xBtnExecute: 'a.eButton[target="_parent"]',
    xTxtExecute: 'div[data-testid="zs-wiki"]',
 }