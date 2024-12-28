import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import CustomModel from "../components/ui/alert-dialog";
import {
  deleteAProductCategory,
  getCategories,
} from "../features/pcategory/pcategorySlice";
import { resetState } from "../features/brand/brandSlice";

export default function Categorylist() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [pCatId, setPCatId] = useState("");
  const [currentCategoryTitle, setCurrentCategoryTitle] = useState(""); // State for current category title

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, [dispatch]);

  const categoryState = useSelector((state) => state.pCategory.pCategories);

  const showModal = (id, title) => {
    setOpen(true);
    setPCatId(id);
    setCurrentCategoryTitle(title); // Set the current category title
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteProductCategory = (e) => {
    dispatch(deleteAProductCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="mb-4 text-2xl font-semibold">Product Categories</h3>

        <Button onClick={() => navigate("/admin/category")}>
          Add Category
        </Button>
      </div>
      <Table className="border rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Index</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Categories</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categoryState.map((category, index) => (
            <TableRow key={category._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <img
                  src={category.images[0]?.url || "/placeholder.svg"}
                  alt={category.title}
                  // width={50}
                  // height={50}
                  className="rounded-md h-6 w-6"
                />
              </TableCell>
              <TableCell className="">{category.title}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end items-end space-x-2">
                  <Link
                    to={`/admin/category/${category._id}`}
                    className="px-2 flex items-center justify-center"
                  >
                    <span className="icon-[solar--pen-bold-duotone] text-xl text-primary mr-1"></span>
                    Edit
                  </Link>
                  <button
                    className="ms-3 fs-3 text-danger border-0 bg-transparent px-2 flex items-center justify-center"
                    onClick={() => showModal(category._id, category.title)} // Pass the title to showModal
                  >
                    <span className="icon-[solar--trash-bin-minimalistic-bold-duotone] text-xl text-red-500 mr-1"></span>
                    Delete
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CustomModel
        title={`Are you sure you want to delete ${currentCategoryTitle} ?`} // Use the current category title
        hideModal={hideModal}
        open={open}
        performAction={() => deleteProductCategory(pCatId)}
      />
    </div>
  );
}
