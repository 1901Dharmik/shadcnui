import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, CreditCard, Edit, Printer } from "lucide-react";
import { useEffect, useState } from "react";
import { config } from "../utils/axiosconfig";
import { useNavigate } from "react-router-dom";
import OrderStatusChange from "../components/AddProduct/OrderStatusChange";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { base_url } from "../utils/base_url"
export default function OrderSummary() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    // Get order ID from URL params (assuming you're using react-router)
    const orderId = window.location.pathname.split("/").pop();

    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `${base_url}user/getaorder/${orderId}`,
          config
        );
        const data = await response.json();
        setOrder(data.orders);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, []);
  console.log("data", order);

  if (loading) return <div>Loading...</div>;
  if (!order) return <div>Order not found</div>;
  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ChevronLeft className="h-6 w-6" onClick={() => navigate(-1)} />
          <h1 className="text-2xl font-bold">
            Order <span className="text-lg font-light">#{order._id}</span>
          </h1>
          <Badge variant="secondary">{order.orderStatus}</Badge>
        </div>
        <div className="flex space-x-2">
          <OrderStatusChange
            orderId={order._id}
            initialStatus={order?.orderStatus}
          />
          {/* <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
          <Button>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button> */}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Details</CardTitle>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 py-2">
                  <div className="h-16 w-16 bg-gray-100 ">
                    <img
                      src={item?.product?.images[0]?.url}
                      className="rounded-xl"
                      alt=""
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">
                      {item.product?.title || "Product Not Found"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.product?._id || "N/A"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p>x{item.quantity}</p>
                    <p className="font-medium">₹ {item.price}</p>
                  </div>
                </div>
              ))}
              <Separator className="my-4" />
              <div className="space-y-2 ">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹ {order.totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span>
                    ₹ {order.totalPrice - order.totalPriceAfterDiscount}
                  </span>
                </div>

                <div className="flex justify-between ">
                  <span>Shipping</span>
                  <span className="text-primary">Free</span>
                </div>

                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>$10</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-primary">
                  <span>Total</span>
                  <span>₹ {order.totalPriceAfterDiscount} /-</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="my-4">
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className={`h-2 w-2 rounded-full bg-green-500`} />
                  <div>
                    <p className="font-medium">{order.orderStatus}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Customer info
              </CardTitle>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground capitalize">
                    {order.shippingInfo.firstName?.[0]}
                    {order.shippingInfo.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {order.shippingInfo.firstName} {order.shippingInfo.lastName}
                  </p>
                  {order.user?.email && (
                    <p className="text-xs text-muted-foreground">
                      {order.user.email}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Shipping Info
              </CardTitle>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p>{order.shippingInfo.address}</p>
              <p>
                {order.shippingInfo.landmark}, {order.shippingInfo.city},
              </p>
              <p> {order.shippingInfo.state}</p>
              <p className="mt-2">Pincode: {order.shippingInfo.pincode}</p>
              <p className="mt-2">Phone NO: {order.shippingInfo?.phone}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-sm font-medium">Delivery By</CardTitle>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Ship by</span>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a Delivery Option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Delivery Options</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                {/* <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Speedy</span>
                  <span>Standard</span>
                </div> */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Tracking No.
                  </span>
                  <span className="w-[180px]">
                    <Input type="text" placeholder="Enter tracking no." />
                  </span>
                </div>
                <div className="flex justify-end">
                  <Button>Update</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Payment Method</CardTitle>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <CreditCard className="h-8 w-8" />
                <div>
                  <p className="font-medium">{order.paymentMethod}</p>
                  {order.paymentInfo.razorpayPaymentId && (
                    <p className="text-sm text-muted-foreground">
                      Payment ID: {order.paymentInfo.razorpayPaymentId}
                      <br />
                      Order ID : {order.paymentInfo.razorpayOrderId}
                    </p>
                  )}
                  {order.paymentInfo.stripePaymentIntentId && (
                    <p className="text-sm text-muted-foreground">
                      Payment ID: {order.paymentInfo?.stripePaymentIntentId}
                      <br />
                      {/* Order ID : {order.paymentInfo?.stripePaymentStatus} */}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
