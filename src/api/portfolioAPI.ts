import axios from 'axios';
import type { PortfolioData } from '../types/portfolio';
import type { ContactPayload } from '../types/contact';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15_000,
});

export const getPortfolioData = async (signal?: AbortSignal): Promise<PortfolioData> => {
  const { data } = await api.get<{ data: PortfolioData }>('/portfolio', { signal });
  return data.data;
};

export const sendContactForm = async (payload: ContactPayload) => {
  const { data } = await api.post('/contact', payload);
  return data;
};