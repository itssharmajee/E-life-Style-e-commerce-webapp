import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllOrdersForAdmin,
    getOrderDetailsForAdmin,
    updateOrderStatus,
} from "@/store/admin/orderSlice";
import { useToast } from "@/hooks/use-toast";

const initialFormData = {
    status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
    const [formData, setFormData] = useState(initialFormData);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { toast } = useToast();


    function handleUpdateStatus(event) {
        event.preventDefault();
        const { status } = formData;

        if (orderDetails?.orderStatus === 'confirmed') {
            toast({
                title: 'This order has already been confirmed and cannot be modified.',
                status: 'error',
                variant: "destructive",
            });
            return;  // Exit the function to prevent further execution
        }

        dispatch(
            updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
        ).then((data) => {
            if (data?.payload?.success) {
                dispatch(getOrderDetailsForAdmin(orderDetails?._id));
                dispatch(getAllOrdersForAdmin());
                setFormData(initialFormData);
                toast({
                    title: data?.payload?.message,
                });
            }
        });
    }


    
    return (
        <DialogContent className="sm:max-w-[500px] max-h-screen">
            <div className="grid gap-2 ">
                <div className="grid">
                    <div className="flex mt-3 items-center justify-between">
                        <p className="font-medium">Order ID</p>
                        <Label>{orderDetails?._id}</Label>
                    </div>
                    <div className="flex mt-1 items-center justify-between">
                        <p className="font-medium">Order Date</p>
                        <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
                    </div>
                    <div className="flex mt-1 items-center justify-between">
                        <p className="font-medium">Order Price</p>
                        <Label>₹{orderDetails?.totalAmount.toFixed(2)}</Label>
                    </div>
                    <div className="flex mt-1 items-center justify-between">
                        <p className="font-medium">Payment method</p>
                        <Label>{orderDetails?.paymentMethod}</Label>
                    </div>
                    <div className="flex mt-1 items-center justify-between">
                        <p className="font-medium">Payment Status</p>
                        <Label>{orderDetails?.paymentStatus}</Label>
                    </div>
                    <div className="flex mt-1 items-center justify-between">
                        <p className="font-medium">Order Status</p>
                        <Label>
                            <Badge
                                className={`py-1 px-2 ${orderDetails?.orderStatus === "confirmed"
                                        ? "bg-green-500"
                                        : orderDetails?.orderStatus === "rejected"
                                            ? "bg-red-600"
                                            : "bg-black"
                                    }`}
                            >
                                {orderDetails?.orderStatus}
                            </Badge>
                        </Label>
                    </div>
                </div>
                <Separator />
                <div className="grid">
                    <div className="grid">
                        <div className="font-medium">Order Details</div>
                        <ul className="grid max-h-24 overflow-auto">
                            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                                ? orderDetails?.cartItems.map((item) => (
                                    <li className="flex items-center justify-between">
                                        <span>Title: {item.title}</span>
                                        <span>Quantity: {item.quantity}</span>
                                        <span>Price: ₹{item.price}</span>
                                    </li>
                                ))
                                : null}
                        </ul>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Separator />
                        <div className="font-medium">Shipping Info</div>
                        <div className="grid gap-0.5 text-muted-foreground">
                            <span>
                                {user.userName},{orderDetails?.addressInfo?.address},
                                {orderDetails?.addressInfo?.city},
                                {orderDetails?.addressInfo?.pincode},
                                {orderDetails?.addressInfo?.phone},
                                <div className="grid text-muted-foreground">
                                <span className="truncate overflow-hidden text-ellipsis whitespace-nowrap">
                                {orderDetails?.addressInfo?.notes}
                                </span>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>

                <div>
                    <CommonForm
                        formControls={[
                            {
                                label: "Order Status",
                                name: "status",
                                componentType: "select",
                                options: [
                                    { id: "pending", label: "Pending" },
                                    { id: "inProcess", label: "In Process" },
                                    { id: "inShipping", label: "In Shipping" },
                                    { id: "delivered", label: "Delivered" },
                                    { id: "rejected", label: "Rejected" },
                                    { id: "confirmed", label: "confirmed" },
                                ],
                            },
                        ]}
                        formData={formData}
                        setFormData={setFormData}
                        buttonText={"Update Order Status"}
                        onSubmit={handleUpdateStatus}
                    />
                </div>
            </div>
        </DialogContent>
    );
}

export default AdminOrderDetailsView;
