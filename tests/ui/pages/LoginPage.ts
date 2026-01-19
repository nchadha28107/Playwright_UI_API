import { BasePage } from "./BasePage";
import { CustomWorld } from "../customWorld";
import loginData from '../fixtures/login.json';

class LoginPage extends BasePage {

    private userName = '#userName';
    private password = '#password';
    private loginButton = '#login';

    constructor(iWorld: CustomWorld) {
        super(iWorld.page, iWorld.logger);
    }

    async selectLoginButton() {
        await this.page.locator(this.loginButton).click();
        this.logger.info("Clicked Login button");
    }

    async enterUsername(username?: string) {
        const value = username ?? process.env.USER ?? loginData.username;
        await this.page.locator(this.userName).fill(value);
        this.logger.info("Entered username");
    }

    async enterPassword(password?: string) {
        const value = password ?? process.env.PWD ?? loginData.password;
        await this.page.locator(this.password).fill(value);
        this.logger.info("Entered password");
    }

    async enterCredentialsAndLogin(username?: string, password?: string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.selectLoginButton();
        this.logger.info("Submitted login form");
    }
}

export default LoginPage;