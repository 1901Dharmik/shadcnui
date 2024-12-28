import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

// const getBlogs = async () => {
//   const response = await axios.get(`${base_url}blog/`);

//   return response.data;
// };
const getBlogs = async (params = {}) => {
  // Construct query string from params
  const queryParams = new URLSearchParams();
  
  if (params.page) queryParams.append('page', params.page);
  if (params.limit) queryParams.append('limit', params.limit);
  if (params.search) queryParams.append('search', params.search);
  if (params.publish) queryParams.append('publish', params.publish);

  const queryString = queryParams.toString();
  const url = `${base_url}blog/${queryString ? `?${queryString}` : ''}`;
  
  const response = await axios.get(url);
  return response.data;
};

const createBlog = async (blog) => {
  // console.log(blog);
  const response = await axios.post(`${base_url}blog/`, blog, config);

  return response.data;
};

const updateBlog = async (blog) => {
  const response = await axios.put(
    `${base_url}blog/${blog.id}`,
    {
      title: blog.blogData.title,
      description: blog.blogData.description,
      category: blog.blogData.category,
      images: blog.blogData.images,
      status: blog.blogData.status,
      publish: blog.blogData.publish,
    },
    config
  );

  return response.data;
};

const getBlog = async (id) => {
  const response = await axios.get(`${base_url}blog/${id}`, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(`${base_url}blog/${id}`, config);
  return response.data;
};

// const publishBlog = async (id) => {
//   const response = await axios.patch(`${base_url}${id}/publish/`, config);
//   return response.data;
// }

// const draftBlog = async (id) => {
//   const response = await axios.patch(`${base_url}${id}/draft/`, config);
//   return response.data;
// }




const blogService = {
  getBlogs,
  createBlog,
  updateBlog,
  getBlog,
  deleteBlog,
  // publishBlog,
  // draftBlog,
};

export default blogService;
