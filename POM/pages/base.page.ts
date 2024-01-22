import { Locator, Page } from "@playwright/test";
import {URL, CREDENTIALS} from "../data/constantes"

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

  async iniciarSesison(){
    await this.page.goto('https://e-global.atlassian.net/browse/GSC-17697');
    await this.btnIniciarSesion.fill(CREDENTIALS.CORREO);
    await this.btnContinue.click();
    await this.txtPassword.fill(CREDENTIALS.PASSWORD)
    await this.btnLogIn.click();
      // if (await this.txtPassword.isVisible()){
      // }
  }   

  async handleError(message: string, error: any) {
    console.error(message, error);
    //await this.cerrarSesion();
    //await this.cerrarNavegador();
  }
}
