import { Given, When, Then, Before } from '@cucumber/cucumber';
import BookStorePage from '../pages/BookStorePage';
import { CustomWorld } from '../customWorld';

let bookStore: BookStorePage;

Before(async function (this: CustomWorld) {
    bookStore = new BookStorePage(this);
});

Given('user clicks Login Button', async () => {
    await bookStore.selectLoginButton();
});

Then('user validates username is correct', async () => {
    await bookStore.validateUsername();
});

Then('user validates Logout Button', async () => {
    await bookStore.validateLogoutButton();
});

Then('user clicks Logout Button', async () => {
    await bookStore.selectLogoutButton();
});

Then('user should be logged out successfully', async () => {
    await bookStore.validateLogoutSuccess();
});

When('user searches for {string}', async (bookName: string) => {
    await bookStore.searchBook(bookName);
});

Then('search results should contain the book {string}', async(bookName: string) => {
    await bookStore.validateSearchResults(bookName);
});

Then('book details should be printed to file', async () => {
    await bookStore.printBookDetailsToFile();
});