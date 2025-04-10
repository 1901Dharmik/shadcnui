import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getProductCategories = async () => {
  const response = await axios.get(`${base_url}category/`, config);
  return response.data;
};

const createCategory = async (category) => {
  const response = await axios.post(`${base_url}category/`, category);
  return response.data;
};

// const updateProductCategory = async (category) => {
//   const response = await axios.put(
//     `${base_url}category/${category.id}`,
//     catData,
//     // { title: category.pCatData.title },
//     // {images : category.pCatData.images},
//     config
//   );

//   return response.data;
// };
const updateProductCategory = async (category) => {
  const response = await axios.put(
    `${base_url}category/${category.id}`,
    category.categoryData,
    config
  );

  return response.data;
};
const getProductCategory = async (id) => {
  const response = await axios.get(`${base_url}category/${id}`, config);
  return response.data;
};

const deleteProductCategory = async (id) => {
  const response = await axios.delete(`${base_url}category/${id}`, config);
  return response.data;
};

const pcategoryService = {
  getProductCategories,
  createCategory,
  updateProductCategory,
  getProductCategory,
  deleteProductCategory,
};

export default pcategoryService;
