import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import CustomModel from "../components/ui/alert-dialog";
import {
  deleteAEnquiry,
  getEnquiries,
  updateAEnquiry,
} from "../features/enquiry/enquirySlice";

export default function Enquirieslist() {
  const [open, setOpen] = useState(false);
  const [Isopen, setIsOpen] = useState(false);
  const [enqId, setenqId] = useState("");
  const [currentEnquiriesTitle, setCurrentEnquiriesTitle] = useState(""); // State for current Enquiries title

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(resetState());
    dispatch(getEnquiries());
  }, [dispatch]);

  const enquiryState = useSelector((state) => state.enquiry.enquiries);

  const showModal = (id, title) => {
    setOpen(true);
    setenqId(id);
    setCurrentEnquiriesTitle(title); // Set the current Enquiries title
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteEnquiries = async (e) => {
    await dispatch(deleteAEnquiry(e));
    setOpen(false);
    await dispatch(getEnquiries());
  };

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateAEnquiry({ id, enqData: newStatus }));
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 500);
  };

  return (
    <div className="py-10">
      <h3 className="mb-4 text-2xl font-bold">Enquiries</h3>
      <Table className="border rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Index</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Mobile</TableHead>
            {/* <TableHead>Comment</TableHead> */}
            <TableHead>Status</TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enquiryState?.map((Enquiries, index) => (
            <TableRow key={Enquiries._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="truncate">{Enquiries.name}</TableCell>
              <TableCell className="">{Enquiries.email}</TableCell>
              <TableCell className="">{Enquiries.mobile}</TableCell>
              {/* <TableCell className="">{Enquiries.comment}</TableCell> */}
              <TableCell>
                <Select
                  onValueChange={(value) =>
                    handleStatusChange(Enquiries._id, value)
                  }
                  defaultValue={Enquiries.status || "Submitted"}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Submitted">Submitted</SelectItem>
                    <SelectItem value="Contacted">Contacted</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end items-end space-x-2">
                  <Dialog open={Isopen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                      <button className="px-2 flex items-center justify-center">
                        <span class="icon-[solar--eye-bold-duotone] text-2xl text-primary mr-1"></span>{" "}
                        View
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[425px] lg:max-w-[800px]">
                      <DialogHeader className="sticky top-0 mt-6 z-10 bg-background pb-4">
                        <DialogTitle>Scrollable Dialog</DialogTitle>
                        <DialogDescription>
                          This dialog has a fixed header and footer with
                          scrollable content.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="max-h-[60vh] overflow-y-auto py-4">
                        <div className="space-y-2">
                          {enquiryState
                            .map((Enquiries, index) => (
                              <div key={index}>
                               <div className="">
                              { Enquiries?.comment}
                               </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <button
                    className="ms-3 fs-3 text-danger border-0 bg-transparent px-2 flex items-center justify-center"
                    onClick={() => showModal(Enquiries._id, Enquiries.name)} // Pass the title to showModal
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
        title={`Are you sure you want to delete ${currentEnquiriesTitle} ?`} // Use the current Enquiries title
        hideModal={hideModal}
        open={open}
        performAction={() => deleteEnquiries(enqId)}
      />
    </div>
  );
}
