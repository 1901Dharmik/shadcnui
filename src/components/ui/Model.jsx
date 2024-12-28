import React from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { Kbd } from "flowbite-react";
import { useState, useEffect, Fragment } from "react";
import { SearchIcon } from "lucide-react";

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
const Model = () => {
  let [isOpen, setIsOpen] = useState(true);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [query, setQuery] = useState("");
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

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "q" && (event.ctrlKey || event.metaKey)) {
        setIsOpen((prevIsOpen) => !prevIsOpen);
      }
    }

    window.addEventListener("keydown", onKeyDown);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);
  return (
    <div>
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          className="fixed inset-0 pt-[24vh] p-4 overflow-y-auto"
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <TransitionChild
            as="div"
            enter="ease-out duration-300"
            enterFrom="opacity-0 "
            enterTo="opacity-100 "
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 bg-gray-200/65 backdrop-blur-sm" />
          </TransitionChild>
          <TransitionChild
            as="div"
            enter="transition ease-in-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in-out duration-300"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Combobox
              as="div"
              className="relative rounded-2xl shadow-2xl ring-1 ring-black/5 max-w-sm mx-auto bg-white divide-y divide-gray-100 overflow-hidden"
              value={filteredRoutes}
              //   onChange={setSelectedPerson}
              onClose={() => setQuery("")}
              onChange={(route) => {
                handleRouteClick(route.path);
              }}
            >
              <div className="flex items-center px-4">
                <SearchIcon className="h-6 w-6 text-gray-500" />
                <ComboboxInput
                  aria-label="Assignee"
                  displayValue={(route) => route?.name}
                  //   onChange={(event) => setQuery(event.target.value)}
                  // value={quary}

                  onChange={handleInputChange}
                  className="w-full bg-transparent border-0 focus:ring-0 text-lg text-gray-800 placeholder:text-gray-400 h-10"
                  placeholder="search..."
                />
                {/* <kbd class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-500 dark:text-gray-100 dark:border-gray-500">
                  Ctrl
                </kbd>{" "}
                <span className="text-black px-1">+</span>{" "}
                <kbd class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-500 dark:text-gray-100 dark:border-gray-500">
                  Q
                </kbd> */}
                <button
                  className="ml-2 dark:text-black"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
              {filteredRoutes.length > 0 && (
                <ComboboxOptions className="py-4 text-lg max-h-90 overflow-auto">
                  {filteredRoutes.map((route) => (
                    <>
                      <ComboboxOption
                        className="px-4 "
                        data-active
                        key={route.path}
                        onClick={() => {
                          setIsOpen(false);
                          handleRouteClick(route.path);
                        }}
                        value={route}
                      >
                        <div
                          className="space-x-1  px-2 py-2 bg-white hover:bg-gray-100 rounded-2xl
                        hover:border-2"
                        >
                          <span className="text-md font-md text-gray-900">
                            {route.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {route.path}
                          </span>
                        </div>
                      </ComboboxOption>
                    </>
                  ))}
                </ComboboxOptions>
              )}
              {query && filteredRoutes.length === 0 && (
                <p className="p-4">No Result Found</p>
              )}
            </Combobox>
          </TransitionChild>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Model;
