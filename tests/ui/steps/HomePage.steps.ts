import { Given, When, Then, Before } from '@cucumber/cucumber';
import HomePage from '../pages/HomePage';
import { CustomWorld } from '../customWorld';

let homePage: HomePage;

Before(async function (this: CustomWorld) {
    homePage = new HomePage(this);
});

Given('user lands on the homepage', async () => {
    await homePage.navigateToHome();
});

When('user navigates to Book Store Application', async () => {
    await homePage.openBookStoreApplication();
});