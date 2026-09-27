"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

const ImageUploader = ({ onImageUploaded }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please select an image file",
      });
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Image must be less than 5MB",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Create a local URL for the uploaded image
      const url = URL.createObjectURL(file);

      // Create unique ID for the image
      const id = `img-${Date.now()}`;

      // Create image object
      const uploadedImage = {
        id,
        name: file.name,
        url,
      };

      // Pass the image object to the parent component
      onImageUploaded(uploadedImage);

      // Clear the input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast({
        title: "Image uploaded",
        description: `${file.name} has been uploaded successfully`,
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "Failed to upload image",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <Button
        onClick={triggerFileInput}
        variant="outline"
        className="w-full border-promptui-light text-gray-300 hover:bg-promptui-light/20 flex items-center gap-2"
        disabled={isUploading}
      >
        <Upload className="h-4 w-4" />
        {isUploading ? "Uploading..." : "Upload Image"}
      </Button>
      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;
