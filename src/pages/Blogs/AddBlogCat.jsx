import { React, useEffect } from "react";
import CustomInput from "../../components/AddProduct/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import * as yup from "yup";
import { useFormik } from "formik";

import {
  createNewblogCat,
  getABlogCat,
  resetState,
  updateABlogCat,
} from "../../features/bcategory/bcategorySlice";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
let schema = yup.object().shape({
  title: yup.string().required("Category Name is Required"),
});
const Addblogcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogCatId = location.pathname.split("/")[3];
  const newBlogCategory = useSelector((state) => state.bCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createBlogCategory,
    blogCatName,
    updatedBlogCategory,
  } = newBlogCategory;
  useEffect(() => {
    if (getBlogCatId !== undefined) {
      dispatch(getABlogCat(getBlogCatId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogCatId]);
  useEffect(() => {
    if (isSuccess && createBlogCategory) {
      toast.success("Blog Category Added Successfullly!");
      navigate("/admin/blogcategory");
    }
    if (isSuccess && updatedBlogCategory) {
      toast.success("Blog Category Updated Successfullly!");
      navigate("/admin/blogcategory");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCatName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { id: getBlogCatId, blogCatData: values };
      if (getBlogCatId !== undefined) {
        dispatch(updateABlogCat(data));
        dispatch(resetState());
      } else {
        dispatch(createNewblogCat(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="mb-4 text-xl font-semibold">
          {getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            label="Enter Blog Category"
            id="blogcat"
          />

          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>

          <Button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Addblogcat;
