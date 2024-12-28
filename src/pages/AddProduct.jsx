import React, { useEffect, useState, Fragment } from "react";
import CustomInput from "../components/AddProduct/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { Listbox, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createProducts,
  resetState,
  updateProducts,
  getAProduct,
} from "../features/product/productSlice";
import ImageUpload from "../components/AddProduct/ImageUpload";

import MultipleTextInput from "../components/AddProduct/MultipleTextInput";
import IngredientsInput from "../components/AddProduct/IngredientsInput";
import ProblemToCureInput from "../components/AddProduct/ProblemToCureInput";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import MultiSelectCombobox from "@/components/MultiSelectComboBox";

const careForOptions = [
  { value: "Acidity", label: "Acidity " },
  { value: "Heart Burning", label: "Heart Burning" },
  { value: "Coughing", label: "Coughing" },
  { value: "Hiccups", label: "Hiccups" },

  { value: "Gas", label: "Gas " },
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
];
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
  // category: Yup.string().required("Category is Required"),
  category: Yup.array().of(Yup.string()).required(),
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
  // problem_to_cure: Yup.array()
  //   .of(
  //     Yup.object().shape({
  //       title: Yup.string().required("Problem title is required"),
  //       description: Yup.string().required("Problem description is required"),
  //       images: Yup.array()
  //         .of(imageSchema)
  //         .min(1, "At least one image is required for each problem"),
  //     })
  //   )
  //   .min(1, "At least one problem to cure is required"),
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
  const { isSuccess, isError, createdProduct, productName, updatedProduct } =
    productState;

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
        // category: productName.category || "",
        category: productName.category || [],
        care_for: productName.care_for || [],
        who_should_use: productName.who_should_use || [],
        quantity: productName.quantity || "",
        tags: productName.tags || "",
        dosage: productName.dosage || [],
        ingredients: productName.ingredients || [],
        // problem_to_cure: productName.problem_to_cure || [],
      });
    }
  }, [productName, getProductId]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "Sajivan Ayurveda",
      // category: "",
      category: [],
      care_for: [],
      who_should_use: [],
      quantity: "",
      tags: "",
      dosage: [],
      ingredients: [],
      // problem_to_cure: [],
      //   care_for: ["", ""],
      //   who_should_use: ["", ""],
      //   dosage: [""],
      //   ingredients: [{ title: "", description: "" }],
      //   problem_to_cure: [
      //     { title: "", description: "", images: [{ public_id: "", url: "" }] },
      //   ],
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
      <h2 className="mb-4 mt-6 lg:mt-0 ml-6 text-2xl font-semibold">
        {getProductId ? "Edit" : "Add"} Product
      </h2>
      <div className="p-3">
        <form onSubmit={formik.handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
                <div className="">
                  {" "}
                  {/* Product Name */}
                  <Label htmlFor="title">Title</Label>
                  <CustomInput
                    className=""
                    type="text"
                    name="title"
                    label="Product Name"
                    onChng={formik.handleChange("title")}
                    onBlr={formik.handleBlur("title")}
                    val={formik.values.title}
                  />
                  <div className="error my-3">
                    {formik.touched.title && formik.errors.title}
                  </div>
                </div>
                <div className="">
                  {/* Price */}
                  <Label htmlFor="price">Price</Label>
                  <CustomInput
                    type="number"
                    name="price"
                    label="Product Price"
                    onChng={formik.handleChange("price")}
                    onBlr={formik.handleBlur("price")}
                    val={formik.values.price}
                  />
                  <div className="error my-3">
                    {formik.touched.price && formik.errors.price}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardContent>
              {/* Description */}
              <Label htmlFor="description">Description</Label>
              <Textarea
                name="description"
                placeholder="Product Description"
                onChange={formik.handleChange("description")}
                value={formik.values.description}
              />
              <div className="error my-2">
                {formik.touched.description && formik.errors.description}
              </div>
            </CardContent>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
                <div className="">
                  {/* Brand Select */}
                  <Label htmlFor="brand">Brand</Label>
                  <Select
                    onValueChange={(value) =>
                      formik.setFieldValue("brand", value)
                    } // Update formik value on change
                    onBlur={formik.handleBlur("brand")} // Handle blur for validation
                    value={formik.values.brand} // Bind the value from formik
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Brand">
                        {formik.values.brand || "Select a Brand"}{" "}
                        {/* Display selected value */}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Brands</SelectLabel>
                        {brandState.map((brand) => (
                          <SelectItem key={brand._id} value={brand.title}>
                            {brand.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <div className="error my-3">
                    {formik.touched.brand && formik.errors.brand}
                  </div>
                </div>
                <div className="">
                  {/* Category Select */}
                  {/* <Label htmlFor="category">Category</Label> */}
                  {/* <select
                    name="category"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.category}
                    className="p-2 border rounded"
                  >
                    <option value="">Select a Category</option>
                    {categoryState.map((category) => (
                      <option key={category._id} value={category.title}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                  <div className="error my-3">
                    {formik.touched.category && formik.errors.category}
                  </div> */}

                  <MultiSelectCombobox
                    label="Category"
                    items={categoryState.map((category) => ({
                      value: category.title,
                      label: category.title,
                    }))}
                    placeholder="Select categories..."
                    onSelectionChange={(selected) =>
                      formik.setFieldValue(
                        "category",
                        selected.map((item) => item.value)
                      )
                    }
                  />
                  <div className="error my-3">
                    {formik.touched.category && formik.errors.category}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
                <div className="">
                  {/* Quantity */}
                  <Label htmlFor="quantity">Quantity</Label>
                  <CustomInput
                    type="Number"
                    name="quantity"
                    label="Add Quantity"
                    onChng={formik.handleChange("quantity")}
                    onBlr={formik.handleBlur("quantity")}
                    val={formik.values.quantity}
                  />
                  <div className="error my-3">
                    {formik.touched.quantity && formik.errors.quantity}
                  </div>
                </div>
                <div className="">
                  {/* Tags */}
                  <Label htmlFor="Tages">Tags</Label>
                  <Select
                    onValueChange={(value) =>
                      formik.setFieldValue("tags", value)
                    } // Update formik value on change
                    onBlur={formik.handleBlur("tags")} // Handle blur for validation
                    value={formik.values.tags} // Bind the value from formik
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a tags">
                        {formik.values.tags || "Select a tags"}{" "}
                        {/* Display selected value */}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Tages</SelectLabel>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="popular">Popular</SelectItem>
                        <SelectItem value="special">Special</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <div className="error my-3">
                    {formik.touched.tags && formik.errors.tags}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardContent>
              {/* <div className="relative lg:w-1/2">
                <Label htmlFor="care_for">Care For</Label>
                <Listbox
                  name="care_for"
                  value={formik.values.care_for}
                  onChange={(value) => formik.setFieldValue("care_for", value)}
                  multiple
                >
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-background py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate ml-2">
                        {formik.values.care_for.length > 0
                          ? `${formik.values.care_for.length} selected`
                          : "Select Care For"}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <div
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        >
                          <span class="icon-[solar--alt-arrow-down-line-duotone] h-4 w-4 text-gray-600"></span>
                        </div>
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 z-10 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {careForOptions.map((option, optionIdx) => (
                          <Listbox.Option
                            key={optionIdx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-green-100 text-green-900"
                                  : "text-gray-900"
                              }`
                            }
                            value={option.value}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {option.label}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                                    <div className="h-5 w-5" aria-hidden="true">
                                      <span class="icon-[solar--check-read-line-duotone] h-7 w-7"></span>
                                    </div>
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
                    <span
                      key={item}
                      className="inline-flex items-center pl-4 px-2 py-1 rounded-full text-sm font-medium bg-green-100 shadow-sm border  text-green-800"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => {
                          formik.setFieldValue(
                            "care_for",
                            formik.values.care_for.filter((i) => i !== item)
                          );
                        }}
                        className="flex-shrink-0 h-6 w-6 ml-2 rounded-full inline-flex items-center justify-center text-green-400 hover:bg-green-200 hover:text-green-500 focus:outline-none focus:bg-green-500 focus:text-white"
                      >
                        <span className="sr-only">Remove {item}</span>
                       
                        <span class="icon-[solar--close-circle-bold-duotone] h-6 w-6 text-green-700"></span>
                       
                      </button>
                    </span>
                  ))}
                </div>
              </div> */}
              <MultiSelectCombobox
                label="Care For"
                items={careForOptions.map((carefor) => ({
                  value: carefor.value,
                  label: carefor.label,
                }))}
                placeholder="Select categories..."
                onSelectionChange={(selected) =>
                  formik.setFieldValue(
                    "care_for",
                    selected.map((item) => item.value)
                  )
                }
              />
              <div className="error my-3">
                {formik.touched.care_for && formik.errors.care_for}
              </div>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>

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
          {/* <ProblemToCureInput
            problems={formik.values.problem_to_cure}
            setFieldValue={formik.setFieldValue}
          />
          <div className="error">
            {formik.touched.problem_to_cure && formik.errors.problem_to_cure}
          </div> */}
          {/* Image Upload */}
          <Card>
            <CardContent>
              <ImageUpload setImages={setImages} images={images} />
            </CardContent>
            {/* <CardFooter>
              <p>Card Footer</p>
            </CardFooter> */}
          </Card>

          {/* Submit Button */}
          <Button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-4"
          >
            {getProductId !== undefined ? "Update" : "Add"} Product
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
