import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
    imageFile,
    setImageFile,
    uploadedImageUrl,
    setUploadedImageUrl,
    setImageLoadingState,
    imageLoadingState,
    isEditMode,
    isCustomStyling = false
}) {
    const inputRef = useRef(null);

    function handleImageFileChange(e) {
        // console.log(e.target.files);// this will log info about images
        const selectedFile = e.target.files?.[0];
        console.log(selectedFile);

        if (selectedFile) setImageFile(selectedFile);
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile) setImageFile(droppedFile);
    }

    function handleImageRemove() {
        setImageFile(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    const URL = import.meta.env.VITE_API_URL;


    async function uploadImageToCloudinary() {
        setImageLoadingState(true);
        const data = new FormData();
        data.append("my_file", imageFile);
        const response = await axios.post(
            `${URL}/api/admin/products/upload-image`,
            data
        );
        // console.log("response from image upload ", response);
        if (response?.data?.success) {
            setUploadedImageUrl(response.data.result.url);
            setImageLoadingState(false);
        }
    }

    useEffect(() => {
        if (imageFile !== null) uploadImageToCloudinary();
    }, [imageFile]);

    return (
        <div className={`w-full mt-5 ${isCustomStyling ? " ":'max-w-md mx-auto'} `}>
            <Label className="text-md font-semibold mb-2 block">Upload Image</Label>
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-4 ${isEditMode ? "opacity-65":''}`}
            >
                <Input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    ref={inputRef}
                    onChange={handleImageFileChange}
                    disabled = {isEditMode}
                />
                {!imageFile ? (
                    <Label
                        htmlFor="image-upload"
                        className={`flex flex-col items-center justify-center cursor-pointer ${isEditMode ? "cursor-not-allowed" : ''}`}
                    >
                        <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
                        <span>Drag & Drop or Click to Upload Image</span>
                    </Label>
                ) : imageLoadingState ? (
                    <Skeleton className="h-10 bg-gray-100" />
                ) : (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <FileIcon className="w-8 h-8 text-primary mr-2" />
                        </div>
                        <p className="text-sm font-medium">{imageFile.name}</p>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-foreground"
                            onClick={handleImageRemove}
                        >
                            <XIcon className="w-4 h-4" />
                            <span className="sr-only">Remove File</span>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductImageUpload;
