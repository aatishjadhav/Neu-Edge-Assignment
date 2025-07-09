import axios from "axios";
import { BASE_URL } from "../config";

export const generateProducts = () => axios.post(`${BASE_URL}/generate`);
export const getProducts = async (params) => {
  const { data } = await axios.get(BASE_URL, { params });
  return data;
};
export const decreaseStock = () => axios.put(`${BASE_URL}/decrease`);
export const increaseEvenStock = () => axios.put(`${BASE_URL}/increase-even`);