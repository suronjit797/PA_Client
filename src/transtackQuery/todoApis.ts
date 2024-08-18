import axios, { AxiosResponse } from "axios";
import { ITodo } from "../pages/Todo/TodoInterface";
import { IMeta } from "../interfaces/interfaces";

const endpoint = "/todo/";

export const createTodoFn = (body: ITodo): Promise<AxiosResponse<ITodo>> => {
  return axios.post(endpoint, body);
};

export const getAllTodoFn = async (params?: any): Promise<{ data: ITodo[]; meta: IMeta }> => {
  const { data } = await axios.get(endpoint, { params });
  return {
    data: data.data || [],
    meta: data.meta || {},
  };
};

export const getSingleUTodoFn = async (id: string): Promise<ITodo> => {
  const { data } = await axios.get(endpoint + id);
  return data?.data || {};
};

export const updateTodoFn = ({ _id, ...body }: Partial<ITodo>): Promise<AxiosResponse<ITodo>> => {
  return axios.put(endpoint + _id, body);
};

export const deleteTodoFn = (id: string): Promise<AxiosResponse<void>> => {
  return axios.delete(endpoint + id);
};

export const getTodoSummaryFn = async (): Promise<ITodo> => {
  const { data } = await axios.get(endpoint + "summary");
  return data?.data || {};
};

export const getTodoOverallSummaryFn = async (): Promise<ITodo> => {
  const { data } = await axios.get(endpoint + "overall");
  return data?.data || {};
};
