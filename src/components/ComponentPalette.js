"use client";

import { 
    LayoutGrid, 
    Type, 
    Image, 
    ListOrdered, 
    Square as ButtonIcon, 
    FormInput, 
    Table, 
    CreditCard 
  } from "lucide-react";
  
  function ComponentPalette() {
    // These would normally have drag functionality
    const components = [
      { id: "heading", name: "Heading", icon: Type },
      { id: "paragraph", name: "Paragraph", icon: Type },
      { id: "container", name: "Container", icon: LayoutGrid },
      { id: "button", name: "Button", icon: ButtonIcon },
      { id: "image", name: "Image", icon: Image },
      { id: "input", name: "Input", icon: FormInput },
      { id: "list", name: "List", icon: ListOrdered },
      { id: "card", name: "Card", icon: CreditCard },
      { id: "table", name: "Table", icon: Table },
    ];
  
    return (
      <div className="grid grid-cols-2 gap-2">
        {components.map(function (component) {
          const Icon = component.icon;
          return (
            <div
              key={component.id}
              className="component-pill flex items-center"
              draggable="true"
            >
              <Icon className="h-4 w-4 mr-2 text-promptui-secondary" />
              <span className="text-sm">{component.name}</span>
            </div>
          );
        })}
      </div>
    );
  }
  
  export default ComponentPalette;
  