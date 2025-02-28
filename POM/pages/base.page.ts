import { Locator, Page } from "@playwright/test";
import {EXCEL, URL} from "../data/constantes"
import {CREDENTIALS} from "../data/credenciales"
import * as XLSX from 'xlsx';
import { RUTAS } from "../data/constantes";

export class BasePage{
  readonly page: Page;
  readonly btnIniciarSesion: Locator;
  readonly btnContinue: Locator;
  readonly btnGoogleContinuar: Locator;
  txtPassword: Locator;
  btnLogIn: Locator;
  btnContinueSin2FA: Locator;

  constructor(page : Page) {
    this.page = page;
    this.btnIniciarSesion = page.getByPlaceholder('Enter your email')
    this.btnContinue = page.getByRole('button', { name: 'Continue' })
    this.btnGoogleContinuar = page.getByRole('button', { name: 'Continuar con Google' });
    this.txtPassword = page.getByPlaceholder('Enter password')
    this.btnLogIn = page.getByRole('button', { name: 'Log in' })
    this.btnContinueSin2FA = page.locator('button#mfa-promote-dismiss');
    }

  async iniciarSesison(pestania: string){ 
    const testCase = await this.obtenerTestCase(pestania);  // await this.obtenerTestCase(pestania).then((valor: string) => valor);
    await this.page.goto(URL.TESTPLAN + testCase);
    await this.btnIniciarSesion.fill(CREDENTIALS.CORREO);
    await this.btnContinue.click();
    await this.txtPassword.fill(CREDENTIALS.PASSWORD)
    await this.btnLogIn.click();
    await this.page.pause();
    return testCase;
  }

  async saltarLaDobleAutentificacion() {
    try {
      await Promise.race([
        this.btnContinueSin2FA.click(),
        new Promise((_, reject) => setTimeout(() => reject('Botón no encontrado después de 2 segundos'), 3000))
      ]);
    } catch (error) {
    }
  }

  async obtenerTestCase(pestania:string){
    type FilaExcel = Array<number | string | Date | boolean | null | undefined>;
    const filePath = RUTAS.matriz;
    const workbook = XLSX.readFile(filePath);
    const nameSheet = pestania;
    const worksheet = workbook.Sheets[nameSheet];
    const test_case = worksheet[EXCEL.OBTENERCASE + EXCEL.NUMBERCASE]?.w || EXCEL.CADENAVACIA;
    return test_case;
  } 

  async handleError(message: string, error: any) {
    console.error(message, error);
  }

}
