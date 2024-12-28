import React, { useEffect, useState } from "react";
import "./App.css";

import Dashboard from "./pages/Dashboard";

// import {  BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Products from "./pages/Products";
import Category from "./pages/Category";
import User from "./pages/User";
import Customer from "./pages/Customer";
import Home from "./pages/Home";
import DataTableDemo from "./pages/DataTableDemo";
import OldDataTable from "./pages/OldDataTable";
import StanStack from "./pages/StanStack";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Home2 from "./pages/Home2";
import OrderList from "./pages/OrderList";
import UserList from "./pages/UserList";
import AddProduct from "./pages/AddProduct";
import AddProduct2 from "./pages/AddProduct";
import OpenRoutes from "./routing/openRoutes";
import ProtectedRoute from "./routing/privateRoutes";
import Addcat from "./pages/AddCat";
import Categorylist from "./pages/CategoryList";
import Brandlist from "./pages/BrandList";
import Enquiries from "./pages/Enquiries";
import Invoice from "./pages/Invoice";
import RoleManagement from "./pages/RoleManagement";
import OrderDetails from "./pages/OrderDetails";
import Block from "./pages/Block";
import Calendar from "./pages/Calender";
import AddBrand from "./pages/AddBrand";
import AddCoupon from "./pages/AddCoupon";
import Couponlist from "./pages/Coupon-List";
import { Toaster } from "@/components/ui/toaster";
import ThemeProvider from "./components/ui/theme-provider";
import AccessDenied from "./pages/AccessDenied";
import PageNotFound from "./pages/NotFound";
import BlogList from "./components/BlogList";
import ActivityLogs from "./pages/ActivityLogs";
import Blogcatlist from "./pages/Blogs/BlogCategory";
import Addblogcat from "./pages/Blogs/AddBlogCat";
import AddBlog from "./pages/Blogs/AddBlog";
import Upload from "./pages/Upload";
import { checkTokenAndRedirect } from "./utils/tokenUtils";
import ViewNote from "./pages/ViewNote";
import MaintenanceModeControl from "./pages/MaintenanceModeControl";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import Application from "./pages/Application";
import AttendanceTable from "./pages/Attendence";
// const NavigateWrapper = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/"); // Redirect to login if token is absent
//     }
//   }, []);

//   return <div />;
// };
function App() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     navigate("/"); // Redirect to login if token is absent
  //   }

  //   // // Disable caching for restricted pages
  //   // const noCacheHeaders = () => {
  //   //   document.title = "Your App Title"; // Ensure title reloads on every page
  //   //   const noCacheMeta = document.createElement("meta");
  //   //   noCacheMeta.httpEquiv = "Cache-Control";
  //   //   noCacheMeta.content = "no-cache, no-store, must-revalidate";
  //   //   document.getElementsByTagName("head")[0].appendChild(noCacheMeta);

  //   //   return () => {
  //   //     document.getElementsByTagName("head")[0].removeChild(noCacheMeta);
  //   //   };
  //   // };

  //   // return noCacheHeaders();
  // }, [navigate]);

  // useEffect(() => {
  //   checkTokenAndRedirect(); // Check token at app startup
  // }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <OpenRoutes>
              <Login />
            </OpenRoutes>
          }
        />
        <Route path="reset-password" element={<Resetpassword />} />
        <Route path="forgot-password" element={<Forgotpassword />} />
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product" element={<AddProduct2 />} />
          <Route path="product/:id" element={<AddProduct2 />} />
          {/* <Route path="product-list" element={<Products />} /> */}
          <Route
            path="product-list"
            element={
              <ProtectedRoute
                requiredResource="product"
                requiredActions={["menuVisible", "read"]}
              >
                <Products />
              </ProtectedRoute>
            }
          />

          <Route path="order-list" element={<OrderList />} />
          <Route path="order-list/:id" element={<OrderDetails />} />

          <Route path="user" element={<User />} />
          <Route path="user-list" element={<UserList />} />
          <Route path="user/:id" element={<User />} />

          <Route path="category" element={<Addcat />} />
          <Route path="category/:id" element={<Addcat />} />
          {/* <Route path="category-list" element={<Categorylist />} /> */}
          <Route
            path="category-list"
            element={
              <ProtectedRoute
                requiredResource="category"
                requiredActions={["read"]}
              >
                <Categorylist />
              </ProtectedRoute>
            }
          />

          <Route path="category" element={<Category />} />

          <Route
            path="brand"
            element={
              <ProtectedRoute
                requiredResource="brands"
                requiredActions={["create"]}
              >
                <AddBrand />
              </ProtectedRoute>
            }
          />
          <Route
            path="brand-list"
            element={
              <ProtectedRoute
                requiredResource="brands"
                requiredActions={["menuVisible", "read"]}
              >
                <Brandlist />
              </ProtectedRoute>
            }
          />
          <Route path="brand/:id" element={<AddBrand />} />

          <Route path="enquiries" element={<Enquiries />} />
          <Route path="customer" element={<Customer />} />
          <Route path="datatabledemo" element={<DataTableDemo />} />
          <Route path="olddata" element={<OldDataTable />} />
          <Route path="stack" element={<StanStack />} />
          <Route path="home2" element={<Home2 />} />

          <Route path="coupon" element={<AddCoupon />} />
          <Route path="coupon/:id" element={<AddCoupon />} />
          <Route path="coupon-list" element={<Couponlist />} />

          <Route path="blogs" element={<BlogList />} />
          <Route path="addblog" element={<AddBlog />} />
          <Route path="addblog/:id" element={<AddBlog />} />
          <Route path="blogcategory" element={<Blogcatlist />} />
          <Route path="addblogcat" element={<Addblogcat />} />
          <Route path="addblogcat/:id" element={<Addblogcat />} />
          <Route path="maintain" element={<MaintenanceModeControl />} />
          <Route path="activity-logs" element={<ActivityLogs />} />

          <Route path="invoice" element={<Invoice />} />
          <Route path="role-management" element={<RoleManagement />} />
          <Route path="calender" element={<Calendar />} />
          <Route path="aceess-denied" element={<AccessDenied />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="upload" element={<Upload />} />
          <Route path="card" element={<ViewNote />} />
          <Route path="attendence" element={<AttendanceTable />} />
 
          {/* <Route path="addproduct2" element={<AddProduct2 />} /> */}
        </Route>

        <Route path="block" element={<Block />} />
        <Route path="app" element={<Application />} />
        <Route path="/not-found" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
      <Toaster />{" "}
    </>
  );
}

export default App;
