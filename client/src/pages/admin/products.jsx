import ProductImageUpload from "@/components/admin/imageUpload";
import AdminProductTile from "@/components/admin/productTile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "@/store/admin/productSlice";
import { data } from "autoprefixer";
import { CirclePlus } from "lucide-react";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function AdminProducts() {
  const [openCreatePDialog, setOpenCreatePDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null); // for editing purpose
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();


  function onSubmit(event) {
    event.preventDefault();
    currentEditedId !== null ?
      dispatch(editProduct({ id: currentEditedId, formData })).then((data) => {
        // console.log(data,"edit");
        if (data?.payload?.success) {
          dispatch(fetchAllProducts())
          setFormData(initialFormData)
          setOpenCreatePDialog(false)
          setCurrentEditedId(null)
        }

      }) :
      dispatch(
        addNewProduct({
          ...formData,
          image: uploadedImageUrl,
        })
      ).then((data) => {
        console.log(data);
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          setOpenCreatePDialog(false);
          setImageFile(null);
          setFormData(initialFormData);
          toast({
            title: "Product added Successfully",
          });
        }
      });
  }

  // this is for form all field if all fields are filled button will enable else disable

  function isFormValid(){
    return Object.keys(formData)
      .map((key)=> formData[key] !== "")
      .every((item)=> item);
  }

  // handling product delete 

  function handelDelete(getCurrentProductId){
    // console.log(getCurrentProductId);
    dispatch(deleteProduct(getCurrentProductId)).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchAllProducts())
      }
    }

    )
    
  }


  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // console.log('productList',productList,uploadedImageUrl);
  console.log(formData, "formData");


  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreatePDialog(true)}>
          <CirclePlus />
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
            <AdminProductTile
              key={productItem._id}
              product={productItem}
              setCurrentEditedId={setCurrentEditedId}
              setOpenCreatePDialog={setOpenCreatePDialog}
              setFormData={setFormData}
              handelDelete = {handelDelete}
            />
          ))
          : null}
      </div>
      <Sheet
        open={openCreatePDialog}
        onOpenChange={() => {
          setOpenCreatePDialog(false);
          setCurrentEditedId(null)
          setFormData(initialFormData)
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>{currentEditedId !== null ? "Edit Product" : "Add New Product"}</SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              formData={formData}
              onSubmit={onSubmit}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Update" : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled = {!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
