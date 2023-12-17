import axios from 'axios';

export interface Lead {
  id: number;
  name: string;
  contacts: string[];
  responsible_user_name: string;
  created_at: any;
}

const apiInstance = axios.create({
  baseURL: 'http://localhost:3000/api/',
});

export const getLeads = async (query?: string): Promise<any> => {
  const url = query ? `leads?query=${query}` : 'leads';

  try {
    const response = await apiInstance.get(url);
    
    return response;
  } catch (error) {
    console.error('Ошибка при получении данных о лидах', error);
    throw error;
  }
};

export const searchLeads = async (query: string): Promise<any> => {
  const url = `leads?query=${query}`;

  try {
    const response = await apiInstance.get(url);

    return response;
  } catch (error) {
    console.error('Ошибка при поиске лидов', error);
    throw error;
  }
};


