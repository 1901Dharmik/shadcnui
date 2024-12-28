import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
// Highlight matching text in a string
const Highlight = ({ text = "", searchTerm = "" }) => {
  if (!searchTerm || !text) return text;

  const parts = text.toString().split(new RegExp(`(${searchTerm})`, "gi"));

  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <span key={index} className="bg-yellow-200 dark:bg-yellow-800">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
};

export default function OrderTable() {
  const [customerNumber, setCustomerNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [orderData, setOrderData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(12);
  const [selectedRows, setSelectedRows] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/sajivanorders",
          {
            params: {
              customerNumber,
              customerName,
              page: currentPage,
              limit,
            },
          }
        );

        const { data } = response.data;
        setOrderData(data.orders);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    const debounce = setTimeout(() => {
      fetchOrders();
    }, 300);

    return () => clearTimeout(debounce);
  }, [customerNumber, customerName, currentPage, limit]);

  // const handleCustomerNumberChange = (e) => {
  //   setCustomerNumber(e.target.value);
  //   setCurrentPage(1);
  // };

  // const handleCustomerNameChange = (e) => {
  //   setCustomerName(e.target.value);
  //   setCurrentPage(1);
  // };

  const handleCustomerNumberChange = (e) => {
    setCustomerNumber(e.target.value.replace(/^\s+/g, ""));
    setCurrentPage(1);
  };
  
  const handleCustomerNameChange = (e) => {
    setCustomerName(e.target.value.replace(/^\s+/g, ""));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleResetFilter = () => {
    setCustomerNumber("");
    setCustomerName("");
    setCurrentPage(1);
    setSelectedRows([]); // Optional: Clears selected rows if applicable
  };
  

   // Handler to toggle individual row selection
   const toggleRowSelection = (index) => {
    setSelectedRows((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  // Handler to toggle all rows selection
  const toggleAllRows = () => {
    if (selectedRows.length === orderData.length) {
      setSelectedRows([]); // Deselect all
    } else {
      setSelectedRows(orderData.map((_, index) => index)); // Select all
    }
  };
  return (
    <div className="mx-8 py-6">
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search by Customer Number"
          value={customerNumber}
          onChange={handleCustomerNumberChange}
          className="max-w-sm"
        />
        <Input
          placeholder="Search by Customer Name"
          value={customerName}
          onChange={handleCustomerNameChange}
          className="max-w-sm"
        />
      <Button variant="secondary" onClick={handleResetFilter}>Reset</Button>
      </div>
      

      <div className="border">
        <Table className="relative overflow-auto border-collapse">
          <TableHeader className="sticky font-semibold top-0 bg-background border-r border-gray-300 z-10">
          <TableRow className="border-r border-gray-300"> 
          <TableHead className="truncate border-r">
            <Checkbox
              checked={selectedRows.length === orderData.length}
              onCheckedChange={toggleAllRows}
            />
          </TableHead>
              <TableHead className="truncate border-r">	Index</TableHead>
              <TableHead className="truncate border-r">	Prepaid</TableHead>
              <TableHead className="truncate border-r">	Status</TableHead>
              <TableHead className="truncate border-r">	Source</TableHead>
              <TableHead className="truncate border-r">	Type</TableHead>
              <TableHead className="truncate border-r">	Date</TableHead>
              <TableHead className="truncate border-r">	Price</TableHead>
              <TableHead className="truncate border-r">	Agent</TableHead>
              <TableHead className="truncate border-r">	Customer Name</TableHead>
              <TableHead className="truncate border-r">	Customer No.</TableHead>
              <TableHead className="truncate border-r">	Alt No.</TableHead>
              <TableHead className="truncate border-r">	Disease</TableHead>
              <TableHead className="truncate border-r">	Gasofine Powder</TableHead>
              <TableHead className="truncate border-r">	Refresh Powder</TableHead>
              <TableHead className="truncate border-r">	IceRose Powder</TableHead>
              <TableHead className="truncate border-r">	Amrutam Tablet</TableHead>
              <TableHead className="truncate border-r">	Lexolite Tablet</TableHead>
              <TableHead className="truncate border-r">	Constirelex Powder</TableHead>
              <TableHead className="truncate border-r">	Courier Name</TableHead>
              <TableHead className="truncate border-r">	Tracking Id</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderData?.map((order, index) => (
              <TableRow key={index}>
                <TableCell className="truncate border-r">
              <Checkbox className="mr-4"
                checked={selectedRows.includes(index)}
                onCheckedChange={() => toggleRowSelection(index)}
              />
            </TableCell>
                <TableCell className="truncate border-r">	{(currentPage - 1) * limit + index + 1}</TableCell>
                <TableCell className="truncate border-r">	{order?.prepaid || "-"}</TableCell>
                <TableCell className="truncate border-r">	
                  <Badge
                    variant={
                      order?.status === "Delivered" ? "success" : "secondary"
                    }
                  >
                    {order?.status || "-"}
                  </Badge>
                </TableCell>
                <TableCell className="truncate border-r">	{order?.source || "-"}</TableCell>
                <TableCell className="truncate border-r">	{order?.type || "-"}</TableCell>
                <TableCell className="truncate border-r">	{order?.date || "-"}</TableCell>
                <TableCell className="truncate border-r">	₹  {order?.price || "-"}</TableCell>
                <TableCell className="truncate border-r">	{order?.agent || "-"}</TableCell>
                <TableCell className="truncate border-r">	
                  <Highlight
                    text={order?.customerName || "-"}
                    searchTerm={customerName}
                  />
                </TableCell>
                <TableCell className="truncate border-r">	
                  <Highlight
                    text={order?.customerNumber || "-"}
                    searchTerm={customerNumber}
                  />
                </TableCell>
                <TableCell className="truncate border-r">	{order?.alternateNumber || "-"}</TableCell>
                <TableCell className="truncate border-r">	{order?.disease || "-"}</TableCell>
                <TableCell className="truncate border-r">	{order?.gasofinePowder || "-"}</TableCell>
                <TableCell className="truncate border-r">	{order?.refreshPowder || "-"}</TableCell>
                <TableCell className="truncate border-r">	{order?.iceRosePowder || "-"}</TableCell>
                <TableCell className="truncate border-r">	{order?.amrutamTablet || "-"}</TableCell>
                <TableCell className="truncate border-r">	{order?.lexoliteTablet || "-"}</TableCell>
                <TableCell className="truncate border-r">	{order?.constirelexPowder || "-"}</TableCell>
                <TableCell className="truncate border-r">	{order?.courierName || "-"}</TableCell>
                <TableCell className="truncate border-r">	
                  <a
                    href={order?.trackingId}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Track Order
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center items-center mt-4">
        <Button
          variant="outline"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="mr-2"
        >
          First
        </Button>
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2"
        >
          Previous
        </Button>
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="ml-2"
        >
          Next
        </Button>
        <Button
          variant="outline"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="ml-2"
        >
          Last
        </Button>
      </div>
    </div>
  );
}
