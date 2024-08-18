import axios, { AxiosResponse } from "axios";
import { ITransaction, ITransactionMeta } from "../pages/Transaction/TransactionsInterface";

const endpoint = "/transactions/";

// Define types for the transaction data and metadata

// Function to create a transaction
export const createTransactionFn = (body: ITransaction): Promise<AxiosResponse<ITransaction>> => {
  return axios.post(endpoint, body);
};

// Function to get all transactions with metadata
export const getAllTransactionFn = async (params?: any): Promise<{ data: ITransaction[]; meta: ITransactionMeta }> => {
  const { data } = await axios.get(endpoint, { params });
  return {
    data: data.data || [],
    meta: data.meta || {},
  };
};

// Function to get a single transaction by ID
export const getSingleTransactionFn = async (id: string): Promise<ITransaction> => {
  const { data } = await axios.get(endpoint + id);
  return data?.data || {};
};

// Function to update a transaction
export const updateTransactionFn = ({ _id, ...body }: ITransaction): Promise<AxiosResponse<ITransaction>> => {
  return axios.put(endpoint + _id, body);
};

// Function to delete a transaction
export const deleteTransactionFn = (id: string): Promise<AxiosResponse<void>> => {
  return axios.delete(endpoint + id);
};

// Function to get transaction summary
export const getTransactionSummaryFn = async (): Promise<ITransaction> => {
  const { data } = await axios.get(endpoint + "summary");
  return data?.data || {};
};

// Function to get overall transaction summary
export const getTransactionOverallSummaryFn = async (): Promise<ITransaction> => {
  const { data } = await axios.get(endpoint + "overall");
  return data?.data || {};
};
