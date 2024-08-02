import axios from "axios";

const endpoint = "/todo/";

export const createTodoFn = (body) => {
  return axios.post(endpoint, body);
};

export const getAllTodoFn = async (params) => {
  const { data } = await axios.get(endpoint, { params });
  return {
    data: data.data || [],
    meta: data.meta || {},
  };
};

export const getSingleUTodoFn = async (id) => {
  const { data } = await axios.get(endpoint + id);
  return data?.data || {};
};

export const updateTodoFn = ({ _id, ...body }) => {
  return axios.put(endpoint + _id, body);
};

export const deleteTodoFn = (id) => {
  return axios.delete(endpoint + id);
};

export const getTodoSummaryFn = async () => {
  const { data } = await axios.get(endpoint + "summary");
  return data?.data || {};
};


export const getTodoOverallSummaryFn = async () => {
  const { data } = await axios.get(endpoint + "overall");
  return data?.data || {};
};
