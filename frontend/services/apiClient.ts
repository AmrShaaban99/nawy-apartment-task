
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions, QueryKey } from '@tanstack/react-query';

// Create Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic query function
export function useApiQuery<TData = unknown, TError = unknown>(
  key: QueryKey,
  url: string,
  config?: AxiosRequestConfig,
  options?: Omit<UseQueryOptions<AxiosResponse<TData>, TError, TData, QueryKey>, 'queryKey' | 'queryFn'>
) {
  return useQuery<AxiosResponse<TData>, TError, TData, QueryKey>({
    queryKey: key,
    queryFn: async () => {
      const response = await apiClient.request<TData>({ url, ...config });
      return response;
    },
    select: (data) => data.data,
    ...options,
  });
}

// Generic mutation function
export function useApiMutation<TData = unknown, TVariables = void, TError = unknown, TContext = unknown>(
  url: string,
  config?: AxiosRequestConfig,
  options?: UseMutationOptions<AxiosResponse<TData>, TError, TVariables, TContext>
) {
  return useMutation<AxiosResponse<TData>, TError, TVariables, TContext>({
    mutationFn: async (variables: TVariables) => {
      const response = await apiClient.request<TData>({ url, data: variables, ...config });
      return response;
    },
    ...options,
  });
}

export default apiClient;
