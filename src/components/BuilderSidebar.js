"use client";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Trash2 } from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function BuilderSidebar({ 
  pages, 
  currentPageId, 
  onSelectPage, 
  onCreatePage,
  onDeletePage
}) {
  return (
    <div className="w-[240px] bg-promptui-dark/60 border-r border-white/10 flex flex-col">
      <div className="p-4 border-b border-white/10">
        <h3 className="font-medium text-sm text-gray-400 mb-3">PROJECT PAGES</h3>
        
        <div className="space-y-1">
          {pages.map(page => (
            <div key={page.id} className="flex items-center group">
              <button
                onClick={() => onSelectPage(page)}
                className={`flex-1 flex items-center text-left px-3 py-2 rounded-md text-sm ${
                  page.id === currentPageId 
                    ? "bg-promptui-primary/20 text-white" 
                    : "text-gray-400 hover:bg-promptui-light/10 hover:text-gray-200"
                }`}
              >
                <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">{page.name}</span>
              </button>
              
              {pages.length > 1 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 hover:bg-transparent"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Page</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{page.name}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDeletePage(page.id)}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          ))}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onCreatePage}
          className="w-full justify-start mt-4 text-promptui-secondary hover:bg-promptui-secondary/10 hover:text-promptui-secondary"
        >
          <Plus className="h-4 w-4 mr-2" /> New Page
        </Button>
      </div>
    </div>
  );
}

export default BuilderSidebar;
