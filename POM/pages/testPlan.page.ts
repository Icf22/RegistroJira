import { Locator, Page, test } from "@playwright/test";
import { RUTAS } from "../data/constantes";
import * as XLSX from 'xlsx';
import {BasePage} from "../pages/base.page"

export class TestPlan extends BasePage{
    readonly page : Page;
    txtCorreo: Locator;
    txtBusqueda: Locator;
    txtFielStep1: Locator;
    txtFieldData2: Locator;
    txtFieldResult3: Locator;
    btnAdd: Locator;
    page_carga: Locator;
    testStep: Locator;
    testData: Locator;
    testResult: Locator;
    addSteps: Locator;

    constructor(page : Page) {
       super(page);
       this.testStep = page.frameLocator("//iframe[contains(@id, 'com.thed.zephyr.je__viewissue-teststep-issuecontent-bdd-two-7698253642720034326__')]").locator('#zs-field-step--1')
       this.testData = page.frameLocator("//iframe[contains(@id, 'com.thed.zephyr.je__viewissue-teststep-issuecontent-bdd-two-7698253642720034326__')]").locator('#zs-field-data--1')
       this.testResult = page.frameLocator("//iframe[contains(@id, 'com.thed.zephyr.je__viewissue-teststep-issuecontent-bdd-two-7698253642720034326__')]").locator('#zs-field-result--1')
       this.addSteps = page.frameLocator("//iframe[contains(@id, 'com.thed.zephyr.je__viewissue-teststep-issuecontent-bdd-two-7698253642720034326__')]").locator("//div[@title='Add Steps']")
       this.txtBusqueda = page.locator('[data-test-id="search-dialog-input"]');
       this.page_carga = page.getByTestId('issue.views.issue-base.foundation.breadcrumbs.project.item')
       this.btnAdd = page.getByTitle('Add Steps').getByRole('img');
    }

    async registrarMatriz(){
        try {
            const filePath = RUTAS.matriz;
            const workbook = XLSX.readFile(filePath);
            const nameSheet = 'FUNCIONAL POSITIVO'
            const worksheet = workbook.Sheets[nameSheet];
            const lastRow = XLSX.utils.sheet_to_json(worksheet).length;
            console.log(lastRow);
            for (let i = 2; i <= lastRow ; i++) {  
                try {
                    let nombrePrueba = worksheet['E' + i] ?. w || '';
                    let precondiciones = worksheet['F' + i] ?. w || '';
                    let script = worksheet['H' + i] ?. w || '';
                    await this.testStep.fill(script);
                    await this.testData.fill(nombrePrueba);
                    await this.testResult.fill(precondiciones);
                    await this.addSteps.click();
        
                } catch (error) {
                    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++' + error);
                }
            }
        } catch (error) {
            console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++'+ error);
        }
    }
}


  