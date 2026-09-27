"use client";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Image, Trash, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ImageGallery({ images, onImageSelect, onImageDelete }) {
  const [selectedImageId, setSelectedImageId] = useState(null);
  const { toast } = useToast();

  function handleImageClick(image) {
    setSelectedImageId(image.id);
    onImageSelect(image.url);
  }

  function copyImageUrlToCode(imageUrl) {
    const imgTag = `<img src="${imageUrl}" alt="Uploaded image" class="w-full h-auto rounded-md" />`;

    navigator.clipboard.writeText(imgTag)
      .then(() => {
        toast({
          title: "Copied to clipboard",
          description: "Image HTML tag copied! Paste it in your code editor.",
        });
      })
      .catch(function (err) {
        console.error("Could not copy URL: ", err);
        toast({
          variant: "destructive",
          title: "Copy failed",
          description: "Failed to copy image HTML tag to clipboard",
        });
      });
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Uploaded Images</h3>
        <span className="text-xs text-gray-400">{images.length} images</span>
      </div>

      {images.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-4 text-center border border-dashed border-gray-600 rounded-md">
          <Image className="h-8 w-8 text-gray-500 mb-2" />
          <p className="text-sm text-gray-400">No images uploaded yet</p>
        </div>
      ) : (
        <ScrollArea className="h-[200px]">
          <div className="grid grid-cols-2 gap-2">
            {images.map(function (image) {
              return (
                <div
                  key={image.id}
                  className={`relative group rounded-md overflow-hidden border border-gray-700
                    ${selectedImageId === image.id ? 'ring-2 ring-promptui-primary' : ''}
                  `}
                >
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-20 object-cover cursor-pointer"
                    onClick={() => handleImageClick(image)}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-white hover:bg-promptui-primary/20"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyImageUrlToCode(image.url);
                        }}
                        title="Copy image code"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-white hover:text-red-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          onImageDelete(image.id);
                        }}
                        title="Delete image"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-2 py-1 truncate">
                    <span className="text-xs text-gray-300">{image.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}

export default ImageGallery;
