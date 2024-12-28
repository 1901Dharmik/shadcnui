import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteACoupon, getCoupons } from "../features/coupon/couponSlice";
import { resetState } from "../features/brand/brandSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";

export default function Couponlist() {

    const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [couponId, setCouponId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCoupons());
  }, [dispatch]);

  const couponState = useSelector((state) => state.coupon.coupons);

  const showModal = (id) => {
    setOpen(true);
    setCouponId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteCoupon = () => {
    dispatch(deleteACoupon(couponId));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCoupons());
    }, 100);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
        <CardTitle>Coupons</CardTitle>
        <Button onClick={() => navigate("/admin/coupon")}>Add Coupon</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">SNo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Expiry</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {couponState.map((coupon, index) => (
              <TableRow key={coupon._id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{coupon.name}</TableCell>
                <TableCell>{coupon.discount}%</TableCell>
                <TableCell>
                  {new Date(coupon.expiry).toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" asChild className="mr-2">
                    <Link to={`/admin/coupon/${coupon._id}`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => showModal(coupon._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this coupon?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              coupon.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={hideModal}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteCoupon}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
