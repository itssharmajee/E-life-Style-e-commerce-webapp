import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { addToCart, fetchCartItems } from "@/store/shopping/cartSlice";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { setProductDetails } from "@/store/shopping/productSlice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/starRating";
import { addReview, getReviews } from "@/store/shopping/reviewSlice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
    const { user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.shoppingCart);
    const { reviews } = useSelector((state) => state.shoppingReview);
    const { toast } = useToast();
    const dispatch = useDispatch();
    const [reviewMsg, setReviewMsg] = useState("")
    const [rating, setRating] = useState(0);

    function handleRatingChange(getRating) {
        setRating(getRating)
    }
    function handleAddtoCart(getCurrentProductId, getTotalStock) {

        let getCartItems = cartItems.items || [];

        if (getCartItems.length) {
            const indexOfCurrentItem = getCartItems.findIndex(
                (item) => item.productId === getCurrentProductId
            );
            if (indexOfCurrentItem > -1) {
                const getQuantity = getCartItems[indexOfCurrentItem].quantity;
                if (getQuantity + 1 > getTotalStock) {
                    toast({
                        title: `Only ${getQuantity} quantity can be added for this item`,
                        variant: "destructive",
                    });

                    return;
                }
            }
        }

        dispatch(
            addToCart({
                userId: user?.id,
                productId: getCurrentProductId,
                quantity: 1,
            })
        ).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchCartItems(user?.id));
                toast({
                    title: "Added to Cart",
                });
            }
        });
    }

    function handleDialogClose() {
        setOpen(false);
        dispatch(setProductDetails());
        setRating(0)
        setReviewMsg("")
    }

    function handleAddReview() {
        dispatch(addReview({
            productId: productDetails?._id,
            userId: user?.id,
            userName: user?.userName,
            reviewMessage: reviewMsg,
            reviewValue: rating,
        })).then(data => {
            if (data.payload.success) {
                setRating(0)
                setReviewMsg("")
                dispatch(getReviews(productDetails?._id))
                toast({
                    title: "Review added Successfully"
                })
            }

        })
    }

    useEffect(() => {
        if (productDetails !== null) dispatch(getReviews(productDetails?._id))
    }, [productDetails])

    // console.log(reviews, "reviews");
    const averageReview =
        reviews && reviews.length > 0
            ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
            reviews.length
            : 0;



    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[50vw]">
                <div className="relative overflow-hidden rounded-lg">
                    <img
                        src={productDetails?.image}
                        alt={productDetails?.title}
                        width={600}
                        height={600}
                        className="aspect-square w-full object-cover"
                    />
                </div>
                <div className="">
                    <div>
                        <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
                        <p className="text-muted-foreground text-xl mb-5 mt-4 cursor-pointer max-h-28 overflow-y-auto p-2 ">
                            {productDetails?.description ? productDetails?.description : " "}
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p
                            className={`text-3xl font-bold text-primary ${productDetails?.salePrice > 0 ? "line-through" : ""
                                }`}
                        >
                            ₹ {productDetails?.price.toFixed(2)}
                        </p>
                        {productDetails?.salePrice > 0 ? (
                            <p className="text-2xl font-bold text-muted-foreground">
                                ₹ {productDetails?.salePrice.toFixed(2)}
                            </p>
                        ) : null}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-0.5">
                            <StarRatingComponent rating={averageReview}/>
                        </div>
                        <span className="text-muted-foreground text-sm">{averageReview.toFixed(1)}</span>
                    </div>
                    <div className="my-3">
                        {productDetails?.totalStock === 0 ? (
                            <Button className="w-full opacity-60 cursor-not-allowed">
                                Out of Stock
                            </Button>
                        ) : (
                            <Button
                                onClick={() => handleAddtoCart(productDetails?._id, productDetails?.totalStock)}
                                className="w-full"
                            >
                                Add to Cart
                            </Button>
                        )}
                    </div>
                    <Separator />
                    <div className="max-h-[300px] overflow-y-auto overflow-hidden">
                        <h2 className="text-xl font-bold mb-4">Reviews</h2>
                        <div className="grid gap-6 ">
                            <div className="flex gap-4">
                                {reviews && reviews.length > 0 ? (
                                    reviews.map((reviewItem) => (
                                        <div className="flex gap-2">
                                            <Avatar className="w-10 h-10 border">
                                                <AvatarFallback>
                                                    {reviewItem?.userName[0].toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="grid gap-1">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold">{reviewItem?.userName}</h3>
                                                </div>
                                                <div className="flex items-center gap-0.5">
                                                    <StarRatingComponent rating={reviewItem?.reviewValue} />
                                                </div>
                                                <p className="text-muted-foreground">
                                                    {reviewItem.reviewMessage}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <h1>No Reviews</h1>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-6">
                            <Label>Write a review</Label>
                            <div className="flex gap-1">
                                <StarRatingComponent rating={rating} handleRatingChange={handleRatingChange} />
                            </div>
                            <Input name="reviewMsg" value={reviewMsg} onChange={(e) => setReviewMsg(e.target.value)} placeholder="write a review..." />
                            <Button onClick={handleAddReview} disabled={reviewMsg.trim() === ''}>Submit</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ProductDetailsDialog;
