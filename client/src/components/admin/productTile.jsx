import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

function AdminProductTile({
    product,
    setCurrentEditedId,
    setOpenCreatePDialog,
    setFormData,
    handelDelete
}) {
    return (
        <Card className="w-full max-w-sm mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div>
                <div className="relative">
                    <img
                        src={product?.image}
                        alt={product?.title || "Product Image"}
                        className="w-full h-[300px] object-cover rounded-t-lg"
                    />
                </div>
                <CardContent className="p-4">
                    <h2 className="text-xl font-bold mb-2">
                        {product?.title || "Product Title"}
                    </h2>
                    <div className="flex justify-between items-center mb-2">
                        <span
                            className={`${product?.salePrice > 0 ? "line-through" : ""
                                } text-lg font-semibold text-primary`}
                        >
                            ₹{product?.price.toFixed(2)}
                        </span>
                        {/*you can also not use dollar symbol here it is just for diaplay purpose so that price will show in dollar */}
                        {product?.salePrice > 0 ? (
                            <span className="text-lg font-bold text-red-600">
                                ₹{product?.salePrice.toFixed(2)}
                            </span>
                        ) : null}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center p-4">
                    <Button 
                    onClick={()=>{
                        setOpenCreatePDialog(true)
                        setCurrentEditedId(product?._id)
                        setFormData(product)
                    }}
                    variant="outline" className=" bg-gray-300 hover:bg-gray-500">
                        Edit
                    </Button>
                    <Button
                    onClick = {()=>{
                        handelDelete(product?._id)
                    }}
                        variant="danger"
                        className=" bg-gray-300 hover:bg-red-500 hover:text-white"
                    >
                        Delete
                    </Button>
                </CardFooter>
            </div>
        </Card>
    );
}

export default AdminProductTile;
