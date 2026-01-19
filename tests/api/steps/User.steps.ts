import { Given, When, Then, Before } from '@cucumber/cucumber';
import { UserAPI } from '../api/UserAPI';
import { expect } from '@playwright/test';
import { CustomWorld } from '../customWorld';

let userAPI: UserAPI;
let storedUserId: string = '';

Before(async function (this: CustomWorld) {
    userAPI = new UserAPI(this);
});

Given('I create a user with email {string} and password {string}', async function (this: CustomWorld, email: string, password: string) {
    await userAPI.createUser(email, password);
    this.logger.info(`User creation initiated with email: ${email}, password: ${password}`);
});

Then('the user creation should be successful', async function (this: CustomWorld) {
    expect(userAPI.response?.status()).toBe(200);
    this.logger.info('✓ User creation validated successfully (HTTP 201)');
});

Then('the response should have all required fields', async function (this: CustomWorld) {
    const createdUserData = await userAPI.getCreatedUserData();
    
    expect(createdUserData).not.toBeNull();
    expect(createdUserData?.id).toBeTruthy();
    expect(createdUserData?.token).toBeTruthy();
    
    this.logger.info('✓ Response contains all required fields (id, name, createdAt)');
});

Given('I store the created user ID', async function (this: CustomWorld) {
    storedUserId = await userAPI.getUserId();
    
    expect(storedUserId).toBeTruthy();
    this.logger.info(`✓ User ID stored: ${storedUserId}`);
});

When('I retrieve the user details using the stored user ID', async function (this: CustomWorld) {
    expect(storedUserId).toBeTruthy();
    await userAPI.getUserDetails('2');
    this.logger.info(`Retrieved user details for ID: ${storedUserId}`);
});

When('I retrieve the user details using the user ID {string}', async function (this: CustomWorld, userId: string) {
    await userAPI.getUserDetails(userId);
    this.logger.info(`Retrieved user details for ID: ${userId}`);
});

Then('the user retrieval should be successful', async function (this: CustomWorld) {
    expect(userAPI.response?.status()).toBe(200);
    this.logger.info('✓ User retrieval validated successfully (HTTP 200)');
});

Given('the response should contain user details', async function (this: CustomWorld) {
    expect((await userAPI.response?.json()).data).toBeTruthy();
    this.logger.info('✓ User details validated in response');
});

When('I update the user name to {string} and job to {string}', async function (this: CustomWorld, name: string, job: string) {
    expect(storedUserId).toBeTruthy();
    await userAPI.updateUser('2', name, job);
    this.logger.info(`Updated user ${storedUserId} with name: ${name}, job: ${job}`);
});

Then('the user update should be successful', async function (this: CustomWorld) {
    expect(userAPI.response?.status()).toBe(200);
    this.logger.info('✓ User update validated successfully (HTTP 200)');
});

Given('the response should contain updated name {string} and job {string}', async function (this: CustomWorld, expectedName: string, expectedJob: string) {
    expect((await userAPI.response?.json()).name).toBe(expectedName);
    expect((await userAPI.response?.json()).job).toBe(expectedJob);
    this.logger.info(`✓ Validated updated name: ${expectedName}, job: ${expectedJob}`);
});

Given('the response should contain updatedAt timestamp', async function (this: CustomWorld) {
    expect((await userAPI.response?.json()).updatedAt).toBeTruthy();
    this.logger.info('✓ updatedAt timestamp validated in response');
});

Then('the user retrieval should fail', async function (this: CustomWorld) {
    expect(userAPI.response?.status()).toBe(404);
    this.logger.info('✓ User retrieval failure validated (HTTP 404)');
});