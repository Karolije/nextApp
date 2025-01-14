import { apiClient } from '@/app/lib/apiClient';

export const addUser = async (newUser: { name: string }) => {
  try {
    const response = await apiClient.post('/users', newUser); 
    return response.data;
  } catch (error: any) {
    console.error('Error object:', error); 
    const errorMessage =
      error.response?.data?.message ||
      error.response?.statusText ||
      'Wystąpił nieznany błąd';
    throw new Error(`Failed to add user: ${errorMessage}`);
  }
};
