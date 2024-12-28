import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
  deleteABrand,
  getBrands,
  resetState,
} from "../features/brand/brandSlice";
import { useNavigate } from "react-router-dom";

export default function brandlist() {
  const [open, setOpen] = useState(false);
  //   const [pCatId, setPCatId] = useState("");
  const navigate = useNavigate();
  const [brandId, setBrandId] = useState("");
  const [currentbrandTitle, setCurrentbrandTitle] = useState(""); // State for current brand title

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
  }, [dispatch]);

  const brandState = useSelector((state) => state.brand.brands);

  const showModal = (id, title) => {
    setOpen(true);
    setBrandId(id);
    setCurrentbrandTitle(title); // Set the current brand title
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteBrand = (e) => {
    dispatch(deleteABrand(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
      <h3 className="mb-4 text-2xl font-bold">Brands</h3>
     
     <Button onClick={()=> navigate("/admin/brand")}>Add Brand</Button>
    
      </div>
      <Table className="border rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Index</TableHead>

            <TableHead>Brands</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {brandState?.map((brand, index) => (
            <TableRow key={brand._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="">{brand.title}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end items-end space-x-2">
                  <Link
                    to={`/admin/brand/${brand._id}`}
                    className="px-2 flex items-center justify-center"
                  >
                    <span className="icon-[solar--pen-bold-duotone] text-xl text-primary mr-1"></span>
                    Edit
                  </Link>
                  <button
                    className="ms-3 fs-3 text-danger border-0 bg-transparent px-2 flex items-center justify-center"
                    onClick={() => showModal(brand._id, brand.title)} // Pass the title to showModal
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
        title={`Are you sure you want to delete ${currentbrandTitle} ?`} // Use the current brand title
        hideModal={hideModal}
        open={open}
        performAction={() => deleteBrand(brandId)}
      />
    </div>
  );
}
