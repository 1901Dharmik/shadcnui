// import React, { useEffect, useState } from "react";
// import CustomInput from "@/components/AddProduct/CustomInput";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import * as Yup from "yup";
// import { useFormik } from "formik";
// import {
//   createCategory,
//   getAProductCategory,
//   resetState,
//   updateAProductCategory,
// } from "../features/pcategory/pcategorySlice";
// import ImageUpload from "../components/AddProduct/ImageUpload"; // Import your custom ImageUpload component

// // Validation schema for form fields
// const userSchema = Yup.object({
//   title: Yup.string().required("Category name is Required"),
// });

// const Addcat = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const getPcatId = location.pathname.split("/")[3];

//   // State to manage images
//   const [images, setImages] = useState([]);

//   // Selector to get category and upload state
//   const newCategory = useSelector((state) => state.pCategory);
//   const imgState = useSelector((state) => state.upload.images);

//   const {
//     isSuccess,
//     isLoading,
//     isError,
//     createdCategory,
//     updatedProductCategory,
//     categoryName,
//   } = newCategory;

//   useEffect(() => {
//     if (getPcatId !== undefined) {
//       dispatch(getAProductCategory(getPcatId));
//     } else {
//       dispatch(resetState());
//     }
//   }, [dispatch, getPcatId]);

//   useEffect(() => {
//     if (isSuccess && createdCategory) {
//       toast.success("Category Added Successfully!");
//       navigate("/admin/list-category");
//     }
//     if (isSuccess && updatedProductCategory) {
//       toast.success("Category Updated Successfully!");
//       navigate("/admin/list-category");
//     }
//     if (isError) {
//       toast.error("Something went wrong!");
//     }
//   }, [isSuccess, isError, createdCategory, updatedProductCategory, navigate]);

//   useEffect(() => {
//     formik.setFieldValue("images", images?.map((img) => img.url));
//   }, [images]);

//   const formik = useFormik({
//     enableReinitialize: true,
//     initialValues: {
//       title: categoryName || "",
//       images: [],
//     },
//     validationSchema: userSchema,
//     onSubmit: (values) => {
//         const pCatData = {...values, images}
//       if (getPcatId !== undefined) {
//         const data = { id: getPcatId, pCatData };
//         dispatch(updateAProductCategory(data));
//         dispatch(resetState());
//       } else {
//         dispatch(createCategory(values));
//         formik.resetForm();
//         setTimeout(() => {
//           dispatch(resetState());
//         }, 300);
//       }
//     },
//   });

//   return (
//     <div>
//       <h3 className="mb-3 title">
//         {getPcatId !== undefined ? "Edit" : "Add"} Category
//       </h3>
//       <div>
//         <form onSubmit={formik.handleSubmit}>
//           <CustomInput
//             type="text"
//             label="Enter product category"
//             name="title"
//             onChng={formik.handleChange("title")}
//             onBlr={formik.handleBlur("title")}
//             val={formik.values.title}
//           />
//           <div className="error my-3">
//             {formik.touched.title && formik.errors.title}
//           </div>

//           {/* Integrate the custom ImageUpload component */}
//           <ImageUpload setImages={setImages} images={images} />

//           <button type="submit" className="button my-3 px-3">
//             {getPcatId !== undefined ? "Edit" : "Add"} Category
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Addcat;
import React, { useEffect, useState } from "react";
import CustomInput from "@/components/AddProduct/CustomInput";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  createCategory,
  getAProductCategory,
  resetState,
  updateAProductCategory,
} from "../features/pcategory/pcategorySlice";
import ImageUpload from "../components/AddProduct/ImageUpload"; // Import your custom ImageUpload component

// Validation schema for form fields
const userSchema = Yup.object({
  title: Yup.string().required("Category name is Required"),
});

const Addcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getPcatId = location.pathname.split("/")[3];

  // State to manage images
  const [images, setImages] = useState([]);

  // Selector to get category and upload state
  const newCategory = useSelector((state) => state.pCategory);
  const imgState = useSelector((state) => state.upload.images);

  const {
    isSuccess,
    isLoading,
    isError,
    createdCategory,
    updatedProductCategory,
    categoryName,
  } = newCategory;

  // Fetch category if editing
  useEffect(() => {
    if (getPcatId !== undefined) {
      dispatch(getAProductCategory(getPcatId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getPcatId]);

  // Success/Error handling after adding/updating
  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Category Added Successfully!");
      navigate("/admin/list-category");
    }
    if (isSuccess && updatedProductCategory) {
      toast.success("Category Updated Successfully!");
      navigate("/admin/list-category");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, createdCategory, updatedProductCategory, navigate]);

  // Update formik value for images when images state changes
  useEffect(() => {
    formik.setFieldValue("images", images?.map((img) => img.url));
  }, [images]);

  // Formik setup
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
      images: [], // Ensure images are initialized
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      // Prepare the data with images
      const categoryData = { ...values, images };

      if (getPcatId !== undefined) {
        // Update category
        const data = { id: getPcatId, categoryData };
        dispatch(updateAProductCategory(data));
      } else {
        // Add new category
        dispatch(createCategory(categoryData));
      }

      // Reset form and state
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 300);
    },
  });

  return (
    <div>
      <h3 className="mb-3 title">
        {getPcatId !== undefined ? "Edit" : "Add"} Category
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="w-1/3">
          <CustomInput 
            type="text"
            label="Enter product category"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          </div>
          <div className="error my-3">
            {formik.touched.title && formik.errors.title}
          </div>

          {/* Integrate the custom ImageUpload component */}
          <ImageUpload setImages={setImages} images={images} />

          <Button type="submit" className="button my-3 px-3">
            {getPcatId !== undefined ? "Edit" : "Add"} Category
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Addcat;

