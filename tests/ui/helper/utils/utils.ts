import { faker } from '@faker-js/faker';

export const TIMEOUTS = {
    EXPECT: 15000,
};

export const generateRandomUsername = (): string => {
    return `user${faker.string.alphanumeric(8)}${Date.now()}`;
};

export const generateRandomFirstName = () => {
    return faker.person.firstName();
};

export const generateRandomLastName = () => {
    return faker.person.lastName();
};

export const generateRandomPassword = () => {
    return `${faker.string.alpha({ length: 1, casing: 'upper' })}${faker.string.symbol()}${faker.internet.password({ length: 7 })}${faker.string.numeric()}`;
};

export const generateInvalidName = (): string => {
    const names = ['John123', 'Test@User', '!@#$%', '12345', 'User'];
    const index = Math.floor(Math.random() * names.length);
    return names[index];
};