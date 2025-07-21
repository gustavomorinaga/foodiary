import axios from 'axios';

export const httpClient = axios.create({
	baseURL: 'https://vtz1a242y0.execute-api.us-east-1.amazonaws.com',
});
