// jest.setup.js
import fetchMock from 'jest-fetch-mock';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

fetchMock.enableMocks();
