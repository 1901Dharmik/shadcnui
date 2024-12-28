import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/ui/Header";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import DataTableDemo from "./pages/DataTableDemo";
import Category from "./pages/Category";
import Customer from "./pages/Customer";
import OldDataTable from "./pages/OldDataTable";
import Products from "./pages/Products";
import User from "./pages/User";
import Login from "./pages/Login";
import AuthLayout from "./components/ui/AuthLayout";
import Register from "./pages/Register";
import ThemeProvider from "./components/ui/theme-provider";
import StanStack from "./pages/StanStack";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";

import Product_Edit from "./pages/Product_Edit";
import ProductList from "./pages/ProductList";
import Crud from "./pages/Customer";
import Application from "./context/NotProvider";
// import { Toaster } from "./components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import fetchProductsData from "./pages/fetchProducts";
import Todo from "./pages/Todo";
import NoteList from "./pages/NoteList";
import AddNote from "./pages/AddNote";
import EditNote from "./pages/EditNote";
import ViewNote from "./pages/ViewNote";
import { useDispatch } from "react-redux";
// import { fetchNotes } from "./features/notes/notesSlice";
import UserForm from "./pages/UserForm";
import VerifyOTP from "./pages/auth/Verifyotp";
import BlogList from "./pages/Blogs/BlogList";
function Layout() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlHeader = () => {
    if (window.scrollY > lastScrollY) {
      // Scroll down
      setIsVisible(false);
    } else {
      // Scroll up
      setIsVisible(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlHeader);
    return () => {
      window.removeEventListener("scroll", controlHeader);
    };
  }, [lastScrollY]);

  // useEffect(() => {
  //   dispatch(fetchNotes());
  // }, [dispatch]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      {/* <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="flex h-screen overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="bg-muted/40">
            <ResizablePanel defaultSize={10} minSize={15} maxSize={25}>
              <aside className="h-full border-r bg-muted/30 ">
                <Sidebar />
              </aside>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel>
              <div className="flex flex-col h-full">
                <header className="border-b bg-opacity-65 bg-muted/30 backdrop-blur-lg z-40 sticky top-0">
                  <Header />
                </header>

                <main className="flex-1 overflow-y-auto no-scrollbar scrollbar-none">
                  <div className="p-8">
                    <Outlet />
                  </div>
                </main>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <Toaster />
      </ThemeProvider> */}
        <ThemeProvider defaultTheme="light"  storageKey="vite-ui-theme">
        <div className="flex h-screen overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="bg-muted/40">
            <ResizablePanel defaultSize={10} minSize={15} maxSize={25}>
            {/* defaultSize={(window.innerWidth < 768 ? 0 : window.innerWidth < 1024 ? 15 : 17)} */}
              <aside className="h-full border-r bg-muted/30 ">
                <Sidebar />
              </aside>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel>
              <div className="flex flex-col h-full">
                <header className="border-b bg-opacity-65 bg-muted/30 backdrop-blur-lg z-40 sticky top-0">
                  <Header />
                </header>
                <main className="flex-1 overflow-y-auto no-scrollbar scrollbar-none">
                  <div className="p-8">
                    <Outlet />
                  </div>
                </main>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <Toaster /> {/* Make sure it's here, at the root level */}
      </ThemeProvider>
    </>
  );
}

export const routes = createBrowserRouter([
  {
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        name: "Home",
        path: "/",
        element: <Home />,
      },
      {
        name: "datatabledemo",
        path: "/datatabledemo",
        element: <DataTableDemo />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        name: "Customer",
        path: "/customer",
        element: <Customer />,
      },
      {
        name: "OldDataTable",
        path: "/olddatatable",
        element: <OldDataTable />,
      },
      {
        name: "Products",
        path: "/products",
        element: <Products />,
      },
      {
        name: "Blogs",
        path: "/blog-list",
        element: <BlogList />,
      },
      {
        name: "Users",
        path: "/users",
        element: <User />,
      },
      {
        path: "/userform",
        element: <UserForm />,
      },
      {
        name: "StanStack",
        path: "/stack",
        element: <StanStack />,
      },
      {
        name: "Product Edit",
        path: "/product-edit",
        element: <Product_Edit />,
      },
      {
        name: "Product-List",
        path: "/productlist",
        element: <ProductList />,
      },
      {
        name: "Crud",
        path: "/crudoperations",
        element: <Crud />,
      },
      // {
      //   name: "application",
      //   path: "app",
      //   element: <NoteProvider/>,
      // },
      {
        name: "fetchproduct",
        path: "/fetchproducts",
        element: <fetchProductsData />,
      },
      {
        name: "notes",
        path: "/notes",
        element: <NoteList />,
      },
      {
        name: "addnote",
        path: "/notes/add",
        element: <AddNote />,
      },
      { name: "editnote", path: "/notes/edit/:id", element: <EditNote /> },
      {
        name: "viewnote",
        path: "/notes/view/:id",
        element: <ViewNote />,
      },
      // {
      //   name:"login",
      //   path: "/login",
      //   element: <Login />
      // },
      // {
      //   name:"verifyotp",
      //   path: "/verifyotp",
      //   element: <VerifyOTP />
      // }
      {
        name: "Todo",
        path: "/todo",
        element: <Todo />,
      },
    ],
  },
  {
    name: "Auth",
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        name: "Login",
        path: "login",
        element: <Login />,
      },
      {
        name: "Register",
        path: "register",
        element: <Register />,
      },
      {
        name: "addtodo",
        path: "todo/:id",
        element: <Todo />,
      },
    ],
  },
]);
// Function to search routes
// const searchRoutes = (routes, searchTerm) => {
//   const results = [];

//   const search = (route, basePath = '') => {
//     const fullPath = basePath + (route.path || '');
//     if (route.name && route.name.toLowerCase().includes(searchTerm.toLowerCase())) {
//       results.push({ name: route.name, path: fullPath });
//     }
//     if (route.children) {
//       route.children.forEach(childRoute => search(childRoute, fullPath));
//     }
//   };

//   routes.forEach(route => search(route));

//   return results;
// };

// Example usage
// const searchTerm = 'note';
// const searchResults = searchRoutes(routes, searchTerm);
// console.log(searchResults);
