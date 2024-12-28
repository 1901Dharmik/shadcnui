import React from 'react';
import axios from 'axios';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TableCell } from '@/components/ui/table';
import { config } from "../../utils/axiosconfig";
import { toast } from "sonner";
const OrderStatusUpdate = ({ orderId, initialStatus }) => {
  const handleStatusChange = async (value) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/user/updateorder/${orderId}`, {
        status: value
      }, config);
      
      if (response.data.orders) {
        console.log('Order status updated successfully');
        toast.success('Order status updated successfully');
        // You might want to update your local state or trigger a re-fetch of orders here
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Error updating order status');
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <TableCell>
      <Select onValueChange={handleStatusChange} defaultValue={initialStatus || "Submitted"}>
        <SelectTrigger>
          <SelectValue placeholder="Change status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Submitted">Submitted</SelectItem>
          <SelectItem value="Ordered">Ordered</SelectItem>
          <SelectItem value="Processing">Processing</SelectItem>
          <SelectItem value="Shipped">Shipped</SelectItem>
          <SelectItem value="Delivered">Delivered</SelectItem>
          <SelectItem value="Cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>
    </TableCell>
  );
};

export default OrderStatusUpdate;