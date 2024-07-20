import axios from "axios";

const endpoint = "/users/";

export const createTopicFn = (body) => {
  return axios.post(endpoint, body);
};

export const getAllUserFn = async () => {
  const { data } = await axios.get(endpoint);
  return data;
};

export const getSingleUserFn = async (id) => {
  const { data } = await axios.get(endpoint + id);
  return data?.data || {};
};

export const getProfileUserFn = async () => {
  const { data } = await axios.get(endpoint + "profile");
  return data?.data || {};
};

export const updateUserFn = ({ id, body }) => {
  return axios.put(endpoint + id, body);
};

export const deleteUserFn = (id) => {
  return axios.delete(endpoint + id);
};
