import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { CustomWorld } from '../customWorld';
import booksData from '../fixtures/books.json';
import loginData from '../fixtures/login.json';
import fs from 'fs/promises';
import path from 'path';
import { TIMEOUT } from 'dns';
import { TIMEOUTS } from '../helper/utils/utils';

class BookStorePage extends BasePage {

  private loginButton = '#login'; // On Books page and Login page
  private logoutButton = 'button:has-text("Log out")'; // On Profile page
  private usernameValue = '#userName-value'; // On Profile page

  private searchBox = '#searchBox';
  private bookRows = '.rt-tr-group';
  private bookTitleInRow = '.rt-td:nth-child(2) a';
  private bookAuthorInRow = '.rt-td:nth-child(3)';
  private bookPublisherInRow = '.rt-td:nth-child(4)';

  constructor(iWorld: CustomWorld) {
    super(iWorld.page, iWorld.logger);
  }

  async selectLoginButton() {
    await this.page.locator(this.loginButton).click();
    this.logger.info('Clicked Login button');
  }

  async validateUsername() {
    const expectedUsername = process.env.USER ?? loginData.username;
    await expect(this.page.locator(this.usernameValue)).toHaveText(expectedUsername);
    this.logger.info(`Validated username: ${expectedUsername}`);
  }

  async validateLogoutButton() {
    await expect(this.page.locator(this.logoutButton)).toBeVisible();
    this.logger.info('Logout button is visible');
  }

  async selectLogoutButton() {
    await this.page.locator(this.logoutButton).click();
    this.logger.info('Clicked Logout button');
  }

  async searchBook(bookName: string) {
    await this.page.locator(this.searchBox).fill('');
    await this.page.locator(this.searchBox).type(bookName);
    // Wait for at least one filtered row to appear
    await expect(this.page.locator(this.bookRows).first()).toBeVisible();
    this.logger.info(`Searched book: ${bookName}`);
  }

  async validateSearchResults(bookName: string) {
    const firstRow = this.page.locator(this.bookRows).first();
    await expect(firstRow).toBeVisible();
    const firstTitle = firstRow.locator(this.bookTitleInRow);
    await expect(firstTitle).toBeVisible({timeout : TIMEOUTS.EXPECT});
    await expect(firstTitle).toHaveText(bookName);
    this.logger.info(`Validated first search result title equals: ${bookName}`);
  }

  async validateLogoutSuccess() {
    await expect(this.page).toHaveURL(/\/login/);
    expect(await this.page.locator(this.logoutButton).count()).toBe(0);
    this.logger.info('Validated logout success (redirected to /login and no logout button)');
  }

  async printBookDetailsToFile() {
    const row = this.page.locator(this.bookRows).first();
    await expect(row).toBeVisible();

    const title = (await row.locator(this.bookTitleInRow).innerText()).trim();
    const author = (await row.locator(this.bookAuthorInRow).innerText()).trim();
    const publisher = (await row.locator(this.bookPublisherInRow).innerText()).trim();

    const bookDetails = { title, author, publisher };

    const outputFilePath = path.join(process.cwd(), 'test-results', 'book-details.json');
    await fs.mkdir(path.dirname(outputFilePath), { recursive: true });
    await fs.writeFile(outputFilePath, JSON.stringify(bookDetails, null, 2), { encoding: 'utf-8' });
    this.logger.info(`Book Details written to ${outputFilePath}: ${JSON.stringify(bookDetails)}`);

    // // Read target path from src/fixtures/books.json -> { "bookDetailsFile": "test-results/book-details.json" }
    // const cfgPath = path.join(process.cwd(), 'src', 'fixtures', 'books.json');
    // const cfgRaw = await fs.readFile(cfgPath, { encoding: 'utf-8' });
    // const booksData = JSON.parse(cfgRaw) as { bookDetailsFile: string };

    // const resolvedOutFile = outputPath ?? path.join(process.cwd(), booksData.bookDetailsFile);

    // // Ensure parent directory exists
    // await fs.mkdir(path.dirname(resolvedOutFile), { recursive: true });

    // await fs.writeFile(resolvedOutFile, JSON.stringify(bookDetails, null, 2), { encoding: 'utf-8' });
    // this.logger.info(`Book Details written to ${resolvedOutFile}: ${JSON.stringify(bookDetails)}`);
  }
}

export default BookStorePage;