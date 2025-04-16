import { useToast } from "@/hooks/use-toast";
import { addNewAddress, deleteAddress, editaAddress, fetchAllAddresses } from "@/store/shopping/addressSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import { addressFormControls } from "@/config";
import AddressCard from "./addressCard";


const initialAddressFormData = {
    address: "",
    city: "",
    phone: "",
    pincode: "",
    notes: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
    const [formData, setFormData] = useState(initialAddressFormData);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { addressList } = useSelector((state) => state.shoppingAddress);
    const { toast } = useToast();

    function handleManageAddress(event) {
        event.preventDefault();

        if (addressList.length >= 4 && currentEditedId === null) {
            setFormData(initialAddressFormData);
            toast({
                title: "You can add max 4 addresses",
                variant: "destructive",
            });

            return;
        }

        currentEditedId !== null
            ? dispatch(
                editaAddress({
                    userId: user?.id,
                    addressId: currentEditedId,
                    formData,
                })
            ).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllAddresses(user?.id));
                    setCurrentEditedId(null);
                    setFormData(initialAddressFormData);
                    toast({
                        title: "Address updated successfully",
                    });
                }
            })
            : dispatch(
                addNewAddress({
                    ...formData,
                    userId: user?.id,
                })
            ).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllAddresses(user?.id));
                    setFormData(initialAddressFormData);
                    toast({
                        title: "Address added successfully",
                    });
                }
            });
    }

    function handleDeleteAddress(getCurrentAddress) {
        dispatch(
            deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
            
        ).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllAddresses(user?.id));
                //setFormData(initialAddressFormData);// modified by me at the time of checking 
                // currentEditedId = null// modified by me at the time of checking 
                toast({
                    title: "Address deleted successfully",
                });
            }
        });
    }

    function handleEditAddress(getCurrAddress) {
        setCurrentEditedId(getCurrAddress?._id);
        setFormData({
            ...formData,
            address: getCurrAddress?.address,
            city: getCurrAddress?.city,
            phone: getCurrAddress?.phone,
            pincode: getCurrAddress?.pincode,
            notes: getCurrAddress?.notes,
        });
    }

    function isFormValid() {
        return Object.keys(formData)
            .map((key) => {
                const value = formData[key];
                return typeof value === "string" ? value.trim() !== "" : value !== null && value !== undefined;
            })
            .every((item) => item);
    }
    

    useEffect(() => {
        dispatch(fetchAllAddresses(user?.id));
    }, [dispatch]);

    // console.log(addressList, "addressList");

    return (
        <Card>
            <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
                {addressList && addressList.length > 0
                    ? addressList.map((singleAddressItem) => (
                        <AddressCard
                            selectedId={selectedId}
                            handleDeleteAddress={handleDeleteAddress}
                            addressInfo={singleAddressItem}
                            handleEditAddress={handleEditAddress}
                            setCurrentSelectedAddress={setCurrentSelectedAddress}
                        />
                    ))
                    : null}
            </div>
            <CardHeader>
                <CardTitle>
                    {currentEditedId !== null ? "Edit Address" : "Add New Address"}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <CommonForm
                    formControls={addressFormControls}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText={currentEditedId !== null ? "Update" : "Add"}
                    onSubmit={handleManageAddress}
                    isBtnDisabled={!isFormValid()}
                />
            </CardContent>
        </Card>
    );
}

export default Address;
