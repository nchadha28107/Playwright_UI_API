import { Given, When, Then, Before } from '@cucumber/cucumber';
import LoginPage from '../pages/LoginPage';
import { CustomWorld } from '../customWorld';

let loginPage: LoginPage;

Before(async function (this: CustomWorld) {
    loginPage = new LoginPage(this);
});

Given('user logs in with valid credentials', async () => {
    loginPage.enterCredentialsAndLogin();
});