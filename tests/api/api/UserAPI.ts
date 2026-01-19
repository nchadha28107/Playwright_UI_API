import { APIResponse } from '@playwright/test';
import { BaseAPI } from './BaseAPI';
import { CustomWorld } from '../customWorld';

interface User {
    email?: string;
    password?: string;
    id?: string;
    name?: string;
    job?: string;
    createdAt?: string;
    token?: string;
}

export class UserAPI extends BaseAPI {
    
    private createdUserId: string | undefined = '';
    private userData: User | null = null;
    public response: APIResponse | undefined;

    constructor(iWorld: CustomWorld) {
        super(iWorld.apiContext, iWorld.logger);
    }

    async createUser(email: string, password: string): Promise<void> {
        const endpoint = '/api/register';
        const requestData: User = { email, password };

        this.logRequest('POST', endpoint, requestData);

        this.response = await this.apiContext.post(endpoint, {
            data: requestData,
        });

        await this.logResponse(this.response);
    } 

    async getUserId(): Promise<string> {
        this.userData = await this.response?.json() as User;
        this.createdUserId = this.userData.id;
        if (!this.createdUserId) {
            throw new Error('User ID not available. Please create a user first.');
        }
        return this.createdUserId;
    }

    async getUserDetails(userId: string): Promise<void> {
        const endpoint = `/api/user/${userId}`;

        this.logRequest('GET', endpoint);

        this.response = await this.apiContext.get(endpoint);

        await this.logResponse(this.response);
    }

    async updateUser(userId: string, name: string, job: string): Promise<void> {
        const endpoint = `/api/user/${userId}`;
        const requestData: User = { name, job };

        this.logRequest('PUT', endpoint, requestData);

        this.response = await this.apiContext.put(endpoint, {
            data: requestData,
        });

        await this.logResponse(this.response);
    }

    async getCreatedUserData(): Promise<User> {
        this.userData = await this.response?.json() as User;
        return this.userData;
    }
}