import { Locator, Page } from "@playwright/test";
import {URL, CREDENTIALS} from "../data/constantes"
import * as XLSX from 'xlsx';
import { RUTAS } from "../data/constantes";

export class BasePage{
  readonly page: Page;
  readonly btnIniciarSesion: Locator;
  readonly btnContinue: Locator;
  readonly btnGoogleContinuar: Locator;
  txtPassword: Locator;
  btnLogIn: Locator;

  constructor(page : Page) {
    this.page = page;
    this.btnIniciarSesion = page.getByPlaceholder('Enter your email')
    this.btnContinue = page.getByRole('button', { name: 'Continue' })
    this.btnGoogleContinuar = page.getByRole('button', { name: 'Continuar con Google' });
    this.txtPassword = page.getByPlaceholder('Enter password')
    this.btnLogIn = page.getByRole('button', { name: 'Log in' })
    }

  async iniciarSesison(pestania: string){ 
    const testCase = await this.obtenerTestCase(pestania);  // await this.obtenerTestCase(pestania).then((valor: string) => valor);
    console.log(testCase)
    await this.page.goto('https://e-global.atlassian.net/browse/'+testCase); //esto no está bien
    await this.btnIniciarSesion.fill(CREDENTIALS.CORREO);
    await this.btnContinue.click();
    await this.txtPassword.fill(CREDENTIALS.PASSWORD)
    await this.btnLogIn.click();
  }   

  async obtenerTestCase(pestania:string){
    type FilaExcel = Array<number | string | Date | boolean | null | undefined>;
    const filePath = RUTAS.matriz;
    const workbook = XLSX.readFile(filePath);
    const nameSheet = pestania;
    const worksheet = workbook.Sheets[nameSheet];
    const test_case = worksheet['B' + 5]?.w || '';
    return test_case;
  } 

  async handleError(message: string, error: any) {
    console.error(message, error);
    //await this.cerrarSesion();
    //await this.cerrarNavegador();
  }

}
