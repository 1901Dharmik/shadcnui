import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';
import axiosInstance from "../../utils/axiosInstance";
const getBrands = async () => {
  const response = await axios.get(`${base_url}brand/`);
  return response.data;
};

const createBrand = async (brand) => {
  const response = await axios.post(`${base_url}brand/`, brand, config);
  return response.data;
};

const updateBrand = async (brand) => {
  const response = await axios.put(
    `${base_url}brand/${brand.id}`,
    { title: brand.brandData.title },
    config
  );

  return response.data;
};

const getBrand = async (id) => {
  const response = await axios.get(`${base_url}brand/${id}`, config);
  return response.data;
};

const deleteBrand = async (id) => {
  const response = await axiosInstance.delete(`${base_url}brand/${id}`, config);
  return response.data;
};

const brandService = {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
};

export default brandService;
