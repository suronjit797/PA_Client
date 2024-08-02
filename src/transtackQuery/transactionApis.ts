import axios from "axios";

const endpoint = "/transactions/";

export const createTransactionFn = (body) => {
  return axios.post(endpoint, body);
};

export const getAllTransactionFn = async (params) => {
  const { data } = await axios.get(endpoint, { params });
  return {
    data: data.data || [],
    meta: data.meta || {},
  };
};

export const getSingleUTransactionFn = async (id) => {
  const { data } = await axios.get(endpoint + id);
  return data?.data || {};
};

export const updateTransactionFn = ({ _id, ...body }) => {
  return axios.put(endpoint + _id, body);
};

export const deleteTransactionFn = (id) => {
  return axios.delete(endpoint + id);
};

export const getTransactionSummaryFn = async () => {
  const { data } = await axios.get(endpoint + "summary");
  return data?.data || {};
};


export const getTransactionOverallSummaryFn = async () => {
  const { data } = await axios.get(endpoint + "overall");
  return data?.data || {};
};
