import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemContents from "./cartItemsContents";
import { Separator } from "../ui/separator";
import { IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";

function UserCartWrapper({ cartItems,setOpenCartSheet }) {
    const navigate = useNavigate()

    const cartTotalAmount =
        cartItems && cartItems.length > 0
            ? cartItems.reduce(
                (sum, currentItem) =>
                    sum +
                    (currentItem?.salePrice > 0
                        ? currentItem?.salePrice
                        : currentItem?.price) *
                    currentItem?.quantity,
                0 // initial amount as zero 
            )
            : 0;

    return (
        <SheetContent className="sm:max-w-md max-h-full overflow-y-auto">
            <SheetHeader>
                <SheetTitle>Your Cart Items</SheetTitle>
            </SheetHeader>
            <div className="mt-8 space-y-4">
                {cartItems && cartItems.length > 0
                    ? cartItems.map((item) => <UserCartItemContents cartItem={item} />)
                    : null}
            </div>
            <Separator className='my-2' />
            <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="flex justify-center items-center">
                    <IndianRupee className="h-5 " />
                    <span className="font-bold"> {cartTotalAmount.toFixed(2)}</span>
                </span>
            </div>
            <Button
                disabled={cartTotalAmount === 0}
                onClick={() => {
                    navigate('/shop/checkout')
                    setOpenCartSheet(false)
                }}
                className="w-full">
                Checkout
            </Button>
        </SheetContent>
    );
}

export default UserCartWrapper;
