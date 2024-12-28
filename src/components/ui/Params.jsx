// components/Sidebar.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const routes = [
  { name: "Home", path: "/" },
  { name: "DataTableDemo", path: "/datatabledemo" },
  { name: "Category", path: "/category" },
  { name: "Customer", path: "/customer" },
  { name: "OldDataTable", path: "/olddatatable" },
  { name: "Products", path: "/products" },
  { name: "Users", path: "/users" },
  { name: "StanStack", path: "/stack" },
  { name: "Product Edit", path: "/product-edit" },
  { name: "Product List", path: "/productlist" },
  { name: "Login", path: "/auth/login" },
  { name: "Register", path: "/auth/register" },
];

const Params = () => {
  const [query, setQuery] = useState("");
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    const filtered = routes.filter((route) =>
      route.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRoutes(filtered);
  };

  const handleRouteClick = (path) => {
    setQuery("");
    setFilteredRoutes([]);
    navigate(path);
  };

  return (
    <>
    <aside className="sidebar">
      {/* <nav>
        <ul>
          {routes.map((route) => (
            <li key={route.path}>
              <button onClick={() => handleRouteClick(route.path)}>
                {route.name}
              </button>
            </li>
          ))}
        </ul>
      </nav> */}
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search pages..."
          className="search-input"
        />
        {filteredRoutes.length > 0 && (
          <ul className="search-results">
            {filteredRoutes.map((route) => (
              <li
                key={route.path}
                onClick={() => handleRouteClick(route.path)}
                className="search-result-item"
              >
                {route.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
    {/* <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet> */}
    </>
  );
};

export default Params;
