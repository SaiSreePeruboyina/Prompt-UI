"use client";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const PreviewCanvas = ({ code }) => {
  const openInNewTab = () => {
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>UI Preview</title>
        </head>
        <body>
          ${code}
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  return (
    <div className="w-full h-full bg-[#222] flex items-center justify-center p-4 relative">
      <Button 
        className="absolute top-4 right-4 bg-promptui-primary hover:bg-promptui-primary/90"
        onClick={openInNewTab}
      >
        <ExternalLink className="h-4 w-4 mr-2" /> Open in new tab
      </Button>
      <iframe
        srcDoc={code}
        className="w-full h-full border-0 rounded-md bg-white shadow-xl"
        title="Preview"
      />
    </div>
  );
};

export default PreviewCanvas;
