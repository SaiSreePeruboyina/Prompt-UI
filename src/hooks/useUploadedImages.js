"use client";

import { useState, useEffect } from "react";

export const useUploadedImages = () => {
  const [images, setImages] = useState([]);
  
  // Load images from localStorage on init
  useEffect(() => {
    const savedImages = localStorage.getItem("uploadedImages");
    if (savedImages) {
      try {
        setImages(JSON.parse(savedImages));
      } catch (error) {
        console.error("Failed to parse saved images:", error);
      }
    }
  }, []);
  
  // Save images to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("uploadedImages", JSON.stringify(images));
  }, [images]);
  
  const addImage = (image) => {
    setImages(prev => [...prev, image]);
  };
  
  const deleteImage = (imageId) => {
    setImages(prev => {
      const imageToDelete = prev.find(img => img.id === imageId);
      if (imageToDelete) {
        // Revoke object URL to prevent memory leaks
        URL.revokeObjectURL(imageToDelete.url);
      }
      return prev.filter(img => img.id !== imageId);
    });
  };
  
  const getImageUrl = (imageId) => {
    const image = images.find(img => img.id === imageId);
    return image ? image.url : null;
  };
  
  const getImageHtmlTag = (imageId) => {
    const image = images.find(img => img.id === imageId);
    return image 
      ? `<img src="${image.url}" alt="${image.name}" class="w-full h-auto rounded-md" />`
      : null;
  };
  
  return {
    images,
    addImage,
    deleteImage,
    getImageUrl,
    getImageHtmlTag
  };
};
