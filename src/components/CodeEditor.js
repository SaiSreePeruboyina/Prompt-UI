"use client";

import { useEffect, useRef } from "react";

function CodeEditor({ code, onChange }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    // Set initial height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [code]);

  function handleChange(e) {
    onChange(e.target.value);

    // Auto-resize textarea
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  return (
    <div className="w-full h-full bg-promptui-background flex flex-col overflow-hidden">
      <div className="w-full h-full overflow-auto bg-[#1E1E1E] code-preview">
        <textarea
          ref={textareaRef}
          className="w-full h-full resize-none border-0 bg-transparent focus:outline-none focus:ring-0 font-mono text-sm text-gray-300 p-4 min-h-full"
          value={code}
          onChange={handleChange}
          spellCheck="false"
        />
      </div>
    </div>
  );
}

export default CodeEditor;
