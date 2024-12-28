import React, { useEffect, useState } from 'react';
import CustomInput from '../../components/AddProduct/CustomInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropzone from 'react-dropzone';
import { delImg, uploadImg } from '../../features/upload/uploadSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import {
  createBlogs,
  getABlog,
  resetState,
  updateABlog,
} from '../../features/blogs/blogSlice';
import { getCategories } from '../../features/bcategory/bcategorySlice';

let userSchema = Yup.object({
  title: Yup.string().required('Title is Required'),
  description: Yup.string().required('Description is Required'),
  category: Yup.string().required('Category is Required'),
  publish: Yup.string().required('Publish status is Required'),
});

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogId = location.pathname.split('/')[3];

  const imgState = useSelector((state) => state.upload.images);
  const bCatState = useSelector((state) => state.bCategory.bCategories);
  const blogState = useSelector((state) => state.blog);
  
  const {
    isSuccess,
    isLoading,
    isError,
    createdBlog,
    blogName,
    blogDescription,
    blogCategory,
    blogImages,
    updatedBlog,
  } = blogState;

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getABlog(getBlogId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogId, dispatch]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    // Initialize images if editing an existing blog with images
    if (blogImages && blogImages.length > 0) {
      setImages(blogImages);
    }
  }, [blogImages]);

  useEffect(() => {
    formik.setFieldValue('images', images);
  }, [images]);

  const handleImageUpload = (acceptedFiles) => {
    dispatch(uploadImg(acceptedFiles));
  };

  useEffect(() => {
    // Only update images if imgState has newly uploaded images
    if (imgState.length > 0) {
      setImages((prevImages) => [...prevImages, ...imgState]);
    }
  }, [imgState]);

  const handleImageDelete = (public_id) => {
    dispatch(delImg(public_id));
    setImages((prevImages) => prevImages.filter(img => img.public_id !== public_id));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || '',
      description: blogDescription || '',
      category: blogCategory || '',
      images: images || [],
      publish: blogState.blogpublish || 'draft',
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: { ...values, images } };
        dispatch(updateABlog(data));
      } else {
        dispatch(createBlogs({ ...values, images }));
        formik.resetForm();
        setImages([]); // Clear images after adding
      }
      setTimeout(() => {
        dispatch(resetState());
      }, 300);
    },
  });

  return (
    <div>
      <h3 className="mb-4 text-2xl font-semibold">
        {getBlogId !== undefined ? 'Edit' : 'Add'} Blog
      </h3>

      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <CustomInput
              type="text"
              label="Enter blog name"
              name="title"
              onChng={formik.handleChange('title')}
              onBlr={formik.handleBlur('title')}
              val={formik.values.title}
            />
            <div className="error my-3">
              {formik.touched.title && formik.errors.title}
            </div>
          </div>
          <select
            name="category"
            onChange={formik.handleChange('category')}
            onBlur={formik.handleBlur('category')}
            value={formik.values.category}
            className="form-control mb-3 mt-3"
          >
            <option value="">Select blog category</option>
            {bCatState.map((category, index) => (
              <option key={index} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
          <div className="error my-3">
            {formik.touched.category && formik.errors.category}
          </div>
          <div>
            <textarea
            //   theme="snow"
              name="description"
              onChange={formik.handleChange('description')}
              value={formik.values.description}
            />
            <div className="error my-2">
              {formik.touched.description && formik.errors.description}
            </div>
          </div>
          <div className="form-group mt-3">
            <label>Publish</label>
            <select
              name="publish"
              onChange={formik.handleChange('publish')}
              onBlur={formik.handleBlur('publish')}
              value={formik.values.publish}
              className="form-control"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <div className="error my-2">
              {formik.touched.publish && formik.errors.publish}
            </div>
          </div>
          <div className="bg-white border-1 p-5 text-center my-3">
            <Dropzone onDrop={handleImageUpload}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {images.map((image, index) => (
              <div key={index} className="position-relative">
                <button
                  type="button"
                  onClick={() => handleImageDelete(image.public_id)}
                  className="btn-close position-absolute"
                  style={{ top: '5px', right: '5px' }}
                ></button>
                <img src={image.url} alt="" width={200} height={200} />
              </div>
            ))}
          </div>
          <Button type="submit" className="button w-100 rounded-3 my-4 px-3">
            {getBlogId !== undefined ? 'Edit' : 'Add'} Blog
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
