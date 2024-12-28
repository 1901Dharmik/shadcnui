import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

const Attendence = () => {
  return (
    <div>
      <Table className="border">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow >
            <TableHead className="w-[100px] border-r">Index</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody >
          <TableRow >
            <TableCell className="font-medium border-r">1</TableCell>
            <TableCell>12/11/2022</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Attendence;
