import React, { useEffect, useState , Fragment} from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { Listbox, Transition } from '@headlessui/react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import {
  createProducts,
  resetState,
  updateProducts,
  getAProduct,
} from "../features/product/productSlice";
import ImageUpload from "../components/ImageUpload";
import { Select } from "antd";
import MultipleTextInput from "../components/MultipleTextInput";
import IngredientsInput from "../components/IngredientsInput";
import ProblemToCureInput from '../components/ProblemToCureInput';

const careForOptions = [
  { value: "Gas", label: "Gas" },
  { value: "Acidity", label: "Acidity" },
  { value: "Constipation", label: "Constipation" },
  { value: "Piles", label: "Piles" },
  { value: "Fissure", label: "Fissure" },
  { value: "Fistula", label: "Fistula" },
  { value: "Bloating", label: "Bloating" },
  { value: "Burping", label: "Burping" },
  { value: "Indigetion", label: "Indigetion" },
  { value: "Abdominal Pain", label: "Abdominal Pain" },
  { value: "Abdominal Cramps", label: "Abdominal Cramps" },
  { value: "Urination", label: "Urination" },
  { value: "Diarrhea", label: "Diarrhea" },
  { value: "Nausea", label: "Nausea" },
  { value: "Vomiting", label: "Vomiting" },
  { value: "Headache", label: "Headache" },
  { value: "Bowels Blisters", label: "Bowels Blisters" },
  { value: "Instant Relief In Piles", label: "Instant Relief In Piles" },
  { value: "Stomach Problems", label: "Stomach Problems" },
  { value: "Weak Bowels", label: "Weak Bowels" },
]
// Validation schema for the product form
const imageSchema = Yup.object().shape({
  public_id: Yup.string().required("Image public ID is required"),
  url: Yup.string()
    .url("Must be a valid URL")
    .required("Image URL is required"),
});

let productSchema = Yup.object({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  price: Yup.number().required("Price is Required"),
  brand: Yup.string().required("Brand is Required"),
  category: Yup.string().required("Category is Required"),
  quantity: Yup.number().required("Quantity is Required"),
  care_for: Yup.array()
    .min(2, "At least two sCare_for is required")
    .required("Care_for are Required"),
  who_should_use: Yup.array()
    .min(2, "At least two sWho Should Use is required")
    .required("Who Should Use are Required"),
  dosage: Yup.array()
    .min(1, "At least two sWho Should Use is required")
    .required("Dosage is Required"),
  tags: Yup.string().required("Tag is Required"),
  ingredients: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup.string().required("Ingredient title is required"),
        description: Yup.string().required(
          "Ingredient description is required"
        ),
      })
    )
    .min(1, "At least one ingredient is required"),
  problem_to_cure: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup.string().required("Problem title is required"),
        description: Yup.string().required("Problem description is required"),
        images: Yup.array()
          .of(imageSchema)
          .min(1, "At least one image is required for each problem"),
      })
    )
    .min(1, "At least one problem to cure is required"),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getProductId = location.pathname.split("/")[3];
  const [images, setImages] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getAProduct(getProductId));
    } else {
      dispatch(resetState());
    }
  }, [getProductId, dispatch]);

  // Fetch brands and categories
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
  }, [dispatch]);

  const brandState = useSelector((state) => state.brand.brands);
  const categoryState = useSelector((state) => state.pCategory.pCategories);
  const productState = useSelector((state) => state.product);
  const { isSuccess, isError, createdProduct, productName, updatedProduct } = productState;

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfully!");
      navigate("/admin/list-product");
    }
    if (isSuccess && updatedProduct) {
      toast.success("Product Updated Successfully!");
      navigate("/admin/list-product");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, createdProduct, updatedProduct, navigate]);

  useEffect(() => {
    if (productName && getProductId) {
      setImages(productName.images || []);
      formik.setValues({
        title: productName.title || "",
        description: productName.description || "",
        price: productName.price || "",
        brand: productName.brand || "Sajivan Ayurveda",
        category: productName.category || "",
        care_for: productName.care_for || [],
        who_should_use: productName.who_should_use || [],
        quantity: productName.quantity || "",
        tags: productName.tags || "",
        dosage: productName.dosage || [],
        ingredients: productName.ingredients || [],
        problem_to_cure: productName.problem_to_cure || [],
      });
    }
  }, [productName, getProductId]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "Sajivan Ayurveda",
      category: "",
      care_for: [],
      who_should_use: [],
      quantity: "",
      tags: "",
      dosage: [],
      ingredients: [],
      problem_to_cure: [],
    },
    validationSchema: productSchema,
    onSubmit: (values) => {
      const productData = { ...values, images };
      if (getProductId !== undefined) {
        dispatch(updateProducts({ id: getProductId, productData }));
      } else {
        dispatch(createProducts(productData));
      }
    },
  });

  return (
    <div>
        <h3 className="mb-4 title">{getProductId ? "Edit" : "Add"} Product</h3>
      <form onSubmit={formik.handleSubmit}>
        {/* Product Name */}
        <CustomInput
          type="text"
          label="Enter Product Name"
          name="title"
          onChng={formik.handleChange("title")}
          onBlr={formik.handleBlur("title")}
          val={formik.values.title}
        />
        <div className="error my-3">
          {formik.touched.title && formik.errors.title}
        </div>

        {/* Description */}
        <ReactQuill
          theme="snow"
          name="description"
          onChange={formik.handleChange("description")}
          value={formik.values.description}
        />
        <div className="error my-2">
          {formik.touched.description && formik.errors.description}
        </div>

        {/* Price */}
        <CustomInput
          type="number"
          label="Enter Product Price"
          name="price"
          onChng={formik.handleChange("price")}
          onBlr={formik.handleBlur("price")}
          val={formik.values.price}
        />
        <div className="error my-3">
          {formik.touched.price && formik.errors.price}
        </div>

        {/* Brand Select */}
        <select
          name="brand"
          onChange={formik.handleChange("brand")}
          onBlur={formik.handleBlur("brand")}
          value={formik.values.brand}
          className="form-control py-3 mb-3"
        >
          <option value="">Select Brand</option>
          {brandState.map((brand) => (
            <option key={brand._id} value={brand.title}>
              {brand.title}
            </option>
          ))}
        </select>
        <div className="error my-3">
          {formik.touched.brand && formik.errors.brand}
        </div>

        {/* Category Select */}
        <select
          name="category"
          onChange={formik.handleChange("category")}
          onBlur={formik.handleBlur("category")}
          value={formik.values.category}
          className="form-control py-3 mb-3"
        >
          <option value="">Select Category</option>
          {categoryState.map((category) => (
            <option key={category._id} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>
        <div className="error my-3">
          {formik.touched.category && formik.errors.category}
        </div>

        {/* Quantity */}
        <CustomInput
          type="number"
          label="Enter Product Quantity"
          name="quantity"
          onChng={formik.handleChange("quantity")}
          onBlr={formik.handleBlur("quantity")}
          val={formik.values.quantity}
        />
        <div className="error my-3">
          {formik.touched.quantity && formik.errors.quantity}
        </div>

        {/* Tags */}
        <select
          name="tags"
          onChange={formik.handleChange("tags")}
          onBlur={formik.handleBlur("tags")}
          value={formik.values.tags}
          className="form-control py-3 mb-3"
        >
          <option value="" disabled>
            Select Tag
          </option>
          <option value="featured">Featured</option>
          <option value="popular">Popular</option>
          <option value="special">Special</option>
        </select>
        <div className="error my-3">
          {formik.touched.tags && formik.errors.tags}
        </div>
        {/* care for */}
        {/* <Select
          className="w-100"
          mode="multiple"
          allowClear
          placeholder="Select care_for"
          value={formik.values.care_for}
          onChange={(value) => formik.setFieldValue("care_for", value)}
          options={[
            { value: "Gas", label: "Gas" },
            { value: "Acidity", label: "Acidity" },
            { value: "Constipation", label: "Constipation" },
            { value: "Piles", label: "Piles" },
            { value: "Fissure", label: "Fissure" },
            { value: "Fistula", label: "Fistula" },
            { value: "Bloating", label: "Bloating" },
            { value: "Burping", label: "Burping" },
            { value: "Indigetion", label: "Indigetion" },
            { value: "Abdominal Pain", label: "Abdominal Pain" },
            { value: "Abdominal Cramps", label: "Abdominal Cramps" },
            { value: "Urination", label: "Urination" },
            { value: "Diarrhea", label: "Diarrhea" },
            { value: "Nausea", label: "Nausea" },
            { value: "Vomiting", label: "Vomiting" },
            { value: "Headache", label: "Headache" },
            { value: "Bowels Blisters", label: "Bowels Blisters" },
            {
              value: "Instant Relief In Piles",
              label: "Instant Relief In Piles",
            },
            { value: "Stomach Problems", label: "Stomach Problems" },
            { value: "Weak Bowels", label: "Weak Bowels" },
          ]}
        /> */}
              <div className="relative">
      <Listbox
        value={formik.values.care_for}
        onChange={(value) => formik.setFieldValue("care_for", value)}
        multiple
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">
              {formik.values.care_for.length > 0
                ? `${formik.values.care_for.length} selected`
                : "Select care_for"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <div className="h-5 w-5 text-gray-400" aria-hidden="true" >v</div>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {careForOptions.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={option.value}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <div className="h-5 w-5" aria-hidden="true" >v</div>
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      <div className="flex flex-wrap mt-2 gap-2">
        {formik.values.care_for.map((item) => (
          <span key={item} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {item}
            <button
              type="button"
              onClick={() => {
                formik.setFieldValue(
                  "care_for",
                  formik.values.care_for.filter((i) => i !== item)
                );
              }}
              className="flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white"
            >
              <span className="sr-only">Remove {item}</span>
              <div className="h-3 w-3" aria-hidden="true" >v</div>
            </button>
          </span>
        ))}
      </div>
    </div>
        <div className="error my-3">
          {formik.touched.care_for && formik.errors.care_for}
        </div>
      

        {/* ingredients */}
        <IngredientsInput
          ingredients={formik.values.ingredients}
          setFieldValue={formik.setFieldValue}
        />
        <div className="error my-3">
          {formik.touched.ingredients && formik.errors.ingredients}
        </div>

        {/* who_should_use */}
        <MultipleTextInput
          label="Enter who_should_use"
          name="who_should_use"
          values={formik.values.who_should_use}
          setFieldValue={formik.setFieldValue}
        />
        <div className="error my-3">
          {formik.touched.who_should_use && formik.errors.who_should_use}
        </div>

        {/* dosage */}
        <MultipleTextInput
          label="Enter dosage"
          name="dosage"
          values={formik.values.dosage}
          setFieldValue={formik.setFieldValue}
        />
        <div className="error my-3">
          {formik.touched.dosage && formik.errors.dosage}
        </div>

        {/* // ... in your form JSX */}
        <ProblemToCureInput
          problems={formik.values.problem_to_cure}
          setFieldValue={formik.setFieldValue}
        />
        <div className="error">
          {formik.touched.problem_to_cure && formik.errors.problem_to_cure}
        </div>
        {/* Image Upload */}
        <ImageUpload setImages={setImages} images={images} />

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-success border-0 rounded-3 my-4"
        >
          {getProductId !== undefined ? "Update" : "Add"} Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
