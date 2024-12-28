"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  createCoupons,
  getACoupon,
  resetState,
  updateACoupon,
} from "../features/coupon/couponSlice";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomInput from "@/components/AddProduct/CustomInput";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

let userSchema = Yup.object({
  name: Yup.string().required("Coupon name is required"),
  expiry: Yup.date().required("Expiry date is required"),
  discount: Yup.number().required("Discount percent is required"),
});

export default function AddCoupon() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCouponId = location.pathname.split("/")[3];
  const newCoupon = useSelector((state) => state.coupon);
  const [initialValues, setInitialValues] = useState({
    name: "",
    expiry: "",
    discount: "",
  });

  const {
    isSuccess,
    isLoading,
    isError,
    createdCoupon,
    couponName,
    couponDiscount,
    couponExpiry,
    updatedCoupon,
    couponData,
  } = newCoupon;

  // Format date for input field
  const formatDateForInput = (date) => {
    if (!date) return "";
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return "";
      return d.toISOString().split("T")[0];
    } catch (error) {
      console.error("Date formatting error:", error);
      return "";
    }
  };

  // Fetch coupon data when editing
  useEffect(() => {
    if (getCouponId !== undefined) {
      console.log("Fetching coupon with ID:", getCouponId);
      dispatch(getACoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [getCouponId, dispatch]);

  // Update initial values when coupon data is loaded
  useEffect(() => {
    if (getCouponId !== undefined && couponData) {
      console.log("Coupon Data received:", couponData);
      const formattedDate = formatDateForInput(couponData.expiry);

      setInitialValues({
        name: couponData.name || "",
        expiry: formattedDate,
        discount: couponData.discount || "",
      });
    }
  }, [getCouponId, couponData]);

  // Handle success and error states
  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Coupon Added Successfully!");
    }

    if (isSuccess && updatedCoupon) {
      toast.success("Coupon Updated Successfully!");
      navigate("/admin/coupon-list");
    }

    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isLoading, isError, createdCoupon, updatedCoupon, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: userSchema,
    onSubmit: (values) => {
      console.log("Submitting values:", values);
      if (getCouponId !== undefined) {
        const data = { id: getCouponId, couponData: values };
        dispatch(updateACoupon(data));
      } else {
        dispatch(createCoupons(values));
        formik.resetForm();
      }
      setTimeout(() => {
        dispatch(resetState());
      }, 300);
    },
  });

  // Debug logging
  useEffect(() => {
    console.log("Current formik values:", formik.values);
    console.log("Initial values:", initialValues);
  }, [formik.values, initialValues]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {getCouponId !== undefined ? "Edit" : "Add"} Coupon
        </CardTitle>
        <CardDescription>
          Create or edit a coupon for your store
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="name">Coupon Name</Label>
            <CustomInput
              type="text"
              label="Enter coupon name"
              name="name"
              onChng={formik.handleChange("name")}
              onBlr={formik.handleBlur("name")}
              val={formik.values.name}
              id="name"
            />
            <div className="error text-red-500 text-sm">
              {formik.touched.name && formik.errors.name}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Expiry Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formik.values.expiry && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formik.values.expiry ? (
                    format(new Date(formik.values.expiry), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={
                    formik.values.expiry
                      ? new Date(formik.values.expiry)
                      : undefined
                  }
                  onSelect={(date) => {
                    formik.setFieldValue(
                      "expiry",
                      date ? format(date, "yyyy-MM-dd") : ""
                    );
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <div className="error text-red-500 text-sm">
              {formik.touched.expiry && formik.errors.expiry}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="discount">Discount Percentage</Label>
            <CustomInput
              type="number"
              label="Enter coupon discount"
              name="discount"
              onChng={formik.handleChange("discount")}
              onBlr={formik.handleBlur("discount")}
              val={formik.values.discount}
              id="discount"
            />
            <div className="error text-red-500 text-sm">
              {formik.touched.discount && formik.errors.discount}
            </div>
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading
              ? "Submitting..."
              : getCouponId !== undefined
              ? "Update"
              : "Add"}{" "}
            Coupon
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
