

// "use client";
// import React, { useState } from "react";
// import dynamic from "next/dynamic";
// import { LiveProvider, LiveError, LivePreview } from "react-live";

// // Dynamically import Monaco Editor with SSR disabled
// const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

// export default function Home() {
//   const [codeTab, setCodeTab] = useState(true);
//   const [sidebarWidth] = useState(260);
//   const [language, setLanguage] = useState("React");
//   const [model, setModel] = useState("React");
//   const [prompt, setPrompt] = useState("");
//   const [generatedCode, setGeneratedCode] = useState("");
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [savedItems, setSavedItems] = useState([]);
//   const handleSave = () => {
//     const newItem = `Folder ${savedItems.length + 1}`;
//     setSavedItems([...savedItems, newItem]);
//   };

//   // const handleGenerate = async () => {
//   //   try {
//   //     const res = await fetch("/api/groq", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({
//   //         prompt: `Generate a ${language} UI based on: ${prompt}`,model,
//   //       }),
//   //     });

//   //     if (!res.ok) {
//   //       throw new Error("Failed to generate code");
//   //     }

//   //     const data = await res.json();
//   //     const rawCode = data.generatedCode || "";

//   //     if (!rawCode.trim()) {
//   //       alert("Groq didn't return any code.");
//   //       return;
//   //     }
//   //     const cleanCode = rawCode.replace(/```[\s\S]*?\n([\s\S]*?)```/, "$1").trim();
//   //     setGeneratedCode(cleanCode);
//   //   } catch (err) {
//   //     console.error("Error calling Groq API:", err);
//   //     alert("Failed to generate code.");
//   //   }
//   // };
//   const handleGenerate = async () => {
//     try {
//       // Send POST request to generate code
//       const res = await fetch("/api/groq", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           prompt: `Generate a ${language} UI based on: ${prompt}`,  // Adjust prompt dynamically
//           model: model,  // Make sure to set selectedModel to "Groq" or "OpenAI"
//         }),
//       });
  
//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.error || "Failed to generate code");
//       }
  
//       // Parse the response JSON
//       const data = await res.json();
//       const rawCode = data.generatedCode || "";
  
//       // Check if the response contains generated code
//       if (!rawCode.trim()) {
//         alert("No code generated.");
//         return;
//       }
  
//       // Clean the code output (remove markdown if present)
//       const cleanCode = rawCode.replace(/```[\s\S]*?\n([\s\S]*?)```/, "$1").trim();
      
//       // Update the UI with the cleaned code
//       setGeneratedCode(cleanCode);
  
//     } catch (err) {
//       console.error("Error calling Groq/OpenAI API:", err);
//       alert(`Failed to generate code: ${err.message}`);
//     }
//   };
  
//   const handleCopy = () => {
//     navigator.clipboard.writeText(generatedCode);
//     alert("Code copied to clipboard!");
//   };
//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const newImages = files.map((file) => ({
//       name: file.name,
//       url: URL.createObjectURL(file),
//     }));
//     setUploadedImages((prev) => [...prev, ...newImages]);
//   };
//   return (
//     <div className="flex h-screen text-white bg-gray-950 font-sans">
//       <aside
//         style={{ width: `${sidebarWidth}px` }}
//         className="p-4 bg-gray-900 border-r border-gray-800 flex flex-col"
//       ><div className="text-lg font-bold mb-6 flex items-center gap-2">
//           <div className="bg-purple-600 px-2 py-1 rounded text-sm">UI</div>
//           UI Generator
//         </div><label className="text-sm mb-2 font-medium">Language:</label>
//         <select
//           value={language}
//           onChange={(e) => setLanguage(e.target.value)}
//           className="bg-gray-800 border border-gray-700 rounded px-2 py-1 mb-4 text-white"
//         ><option>React</option>
//           <option>Flutter</option>
//           <option>Html</option>
//         </select><label className="text-sm mb-2 font-medium">Model:</label>
//         <select
//           value={model}
//           onChange={(e) => setModel(e.target.value)}
//           className="bg-gray-800 border border-gray-700 rounded px-2 py-1 mb-4 text-white"
//         ><option>Groq</option>
//           {/* <option>Open AI</option>
          
//           <option >Claude</option>
//           <option >Gemini</option> */}
//         </select>
//         <label className="text-sm font-medium mb-2">Describe the UI you want to create:</label>
//         <textarea
//           placeholder="Describe the UI component or page you want to generate..."
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           className="bg-gray-800 border border-gray-700 rounded p-2 text-sm resize-none h-24 mb-4"
//         /> <button
//           onClick={handleGenerate}
//           className="w-full bg-purple-600 hover:bg-purple-700 transition-all py-2 rounded mb-4"
//         >
//          Generate UI
//         </button>
//         <div className="mb-6">
//           <label className="text-sm font-medium mb-2 block">Upload Images</label>
//           <div className="border-2 border-dashed border-gray-700 rounded p-4 flex flex-col items-center justify-center text-gray-400 hover:border-purple-600 hover:text-white transition cursor-pointer"
//             onClick={() => document.getElementById("imageUploadInput").click()}
//           ><svg xmlns="http://www.w3.org/2000/svg"className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24"
//               stroke="currentColor"><path strokeLinecap="round"strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M3 15a4 4 0 004 4h10a4 4 0 004-4M12 11V3m0 0L8 7m4-4l4 4"
//               /></svg>
//             <p className="text-sm">Click or drag to upload images</p>
//           </div><input
//             id="imageUploadInput"
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={handleImageUpload}
//             className="hidden"
//           /> {uploadedImages.length > 0 && (
//             <div className="bg-gray-800 mt-4 rounded p-2 max-h-40 overflow-y-auto">
//               <h4 className="text-sm font-semibold mb-2 text-white">Uploaded Images</h4>
//               <div className="grid grid-cols-2 gap-2">
//                 {uploadedImages.map((img, idx) => (
//                   <div key={idx} className="relative group">
//                     <img
//                       src={img.url}
//                       alt= {img.name}
//                       className="w-full h-20 object-cover rounded border border-gray-700 group-hover:opacity-75 transition"
//                     />
//                     <div className="absolute bottom-0 left-0 w-full text-xs text-center bg-black bg-opacity-50 text-white p-1 opacity-0 group-hover:opacity-100 transition">
//                       {img.name}
//                     </div>
//                   </div>))}
//               </div>
//             </div>
//           )}
//         </div>
//       </aside>
//       <main className="flex-1 flex flex-col">
//         <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
//           <div className="flex gap-4">
//             <button
//               onClick={() => setCodeTab(true)}
//               className={`px-4 py-1 rounded ${codeTab ? "bg-purple-600" : "bg-gray-800"}`}
//             >Code
//             </button>
//             <button
//               onClick={() => setCodeTab(false)}
//               className={`px-4 py-1 rounded ${!codeTab ? "bg-purple-600" : "bg-gray-800"}`}
//             >
//               Preview
//             </button>
//           </div>
//           <div className="flex gap-2">
            
//             <button  className="bg-gray-800 px-3 py-1 rounded border border-gray-700" onClick={handleSave}>Save</button>

           
//             <button
//               onClick={handleCopy}
//               className="bg-gray-800 px-3 py-1 rounded border border-gray-700"
//             >
//               Copy
//             </button>
//           </div>
//         </div>

//         {/* Main Display */}
//         <div className="flex-1 p-6 overflow-auto bg-gray-950">
//           {generatedCode ? (
//             codeTab ? (
//               <div className="rounded overflow-hidden shadow-xl h-[800px]">
//                 <MonacoEditor theme="vs-dark"
//                   height="100%"
//                   language={
//                     language.toLowerCase() === "react" ? "javascript" : language.toLowerCase()
//                   }theme="vs-dark"
//                   value={generatedCode}
//                   onChange={(value) => setGeneratedCode(value || "")}
//                   options={{
//                     fontSize: 14,
//                     minimap: { enabled: false },
//                     wordWrap: "on",
//                     scrollBeyondLastLine: false,
//                     automaticLayout: true,
//                     lineNumbers: "on",
//                   }}/> </div>
//             ) : language === "React" ? (
//               <LiveProvider code={generatedCode}>
//               <LiveError />
//               <LivePreview className="bg-gray-100 p-4 rounded shadow-md" />
//             </LiveProvider>
//             ) : language === "Flutter" ? (
//               <div className="bg-white text-black p-4 rounded shadow">
//                 <p>Flutter code preview is not yet supported in this app.</p>
//               </div>
//             ) : language === "Html" ? (
//               <div className="bg-white text-black p-4 rounded shadow">
//                 <div dangerouslySetInnerHTML={{ __html: generatedCode }} />
//               </div>
//             ) : null
//           ) : (
//             <div className="text-purple-500 text-center mt-20">
//               No Code Generated Yet
//               <br />
//               <span className="text-sm text-gray-400">
//                 Enter a prompt and upload images to generate a UI
//               </span>
//             </div>
//           )}
//         </div>
//       </main>
//       {/* <aside
//         style={{ width: `${sidebarWidth}px` }}
//         className="p-4 bg-gray-900 border-l border-gray-800 flex flex-col"
//       >
//         <div className="text-lg font-bold mb-6">Right Sidebar</div>
//         <p className="text-sm text-gray-300">
//           You can place additional tools, settings, or components here.
//         </p>
//       </aside> */}
//       <aside
//         style={{ width: `${sidebarWidth}px` }}
//         className="p-4 bg-gray-900 border-l border-gray-800 flex flex-col"
//       >
//         <div className="text-lg font-bold mb-6">Right Sidebar</div>
//         <p className="text-sm text-gray-300 mb-4">
//           Your saved folders
//         </p>

//         {/* Saved Folders */}
//         <div className="flex flex-col gap-2">
//           {savedItems.map((item, index) => (
//             <div
//               key={index}
//               className="flex items-center gap-2 p-2 bg-gray-800 rounded"
//             >
//               {/* Folder Icon */}
//               <span>📁</span>
//               <span className="text-gray-200">{item}</span>
//             </div>
//           ))}
//         </div>
//       </aside>
//     </div>
//   );
// }
"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { LiveProvider, LiveError, LivePreview } from "react-live";

// Monaco Editor with SSR disabled
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function Home() {
  const [codeTab, setCodeTab] = useState(true);
  const [sidebarWidth] = useState(260);
  const [language, setLanguage] = useState("React");
  const [model, setModel] = useState("Groq");
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  
  const [PageName, setPageName] = useState("");
const [savedItems, setSavedItems] = useState([]);

// This cleans the code before passing to react-live preview
const cleanReactCodeForLive = (code) => {
  return code
    .replace(/import[^;]+;/g, '') // Remove imports
    .replace(/export default[^;]+;/g, '') // Remove export default
    .replace(/const\s+\w+\s*=\s*\(\)\s*=>\s*{/, '') // Remove component start
    .replace(/return\s*\(/, '') // Remove return (
    .replace(/};?\s*$/, '') // Remove closing };
    .replace(/\);?\s*$/, '') // Remove closing );
    .trim();
};

  // const handleSave = () => {
  //   const newItem = `Folder ${savedItems.length + 1}`;
  //   setSavedItems([...savedItems, newItem]);
  // };
  // const handleSave = async () => {
  //   try {
  //     const res = await fetch('/api/save-page', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         title: `Folder ${savedItems.length + 1}`,  // or whatever page data you want to save
  //       }),
  //     });
  
  //     const data = await res.json();
  //     if (res.ok) {
  //       const newItem = `Folder ${savedItems.length + 1}`;
  //       setSavedItems([...savedItems, data.savedPage]); 
  //       alert('Saved to MongoDB!');
  //     } else {
  //       alert('Error: ' + data.error);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert('Something went wrong!');
  //   }
  // };
  const handleSave = async () => {
  if (!PageName.trim()) {
    alert("Page name cannot be empty.");
    return;
  }

  try {
    const res = await fetch("/api/save-page", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pageName: PageName.trim(),
        code: generatedCode, // Your page code here
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Page saved successfully.");
      setPageName(""); // Clear input
      // Optionally update UI or state here with new page info
    } else {
      alert("Error: " + data.error);
    }
  } catch (error) {
    console.error("Save failed:", error);
    alert("Something went wrong.");
  }
};



  const handleGenerate = async () => {
    try {
      const res = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Generate a ${language} UI based on: ${prompt}`,
          model: model,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to generate code");
      }

      const data = await res.json();
      const rawCode = data.generatedCode || "";

      if (!rawCode.trim()) {
        alert("No code generated.");
        return;
      }

      const cleanCode = rawCode.replace(/```[\s\S]*?\n([\s\S]*?)```/, "$1").trim();
      setGeneratedCode(cleanCode);

    } catch (err) {
      console.error("Error calling API:", err);
      alert(`Failed to generate code: ${err.message}`);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    alert("Code copied to clipboard!");
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setUploadedImages((prev) => [...prev, ...newImages]);
  };

  return (
    <div className="flex h-screen text-white bg-gray-950 font-sans">
      {/* Sidebar */}
      <aside style={{ width: `${sidebarWidth}px` }} className="p-4 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="text-lg font-bold mb-6 flex items-center gap-2">
          <div className="bg-purple-600 px-2 py-1 rounded text-sm">UI</div>
          Prompt UI
        </div>

        {/* Language Selector */}
        <label className="text-sm mb-2 font-medium">Language:</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-gray-800 border border-gray-700 rounded px-2 py-1 mb-4 text-white">
          <option>React</option>
          <option>Bootstrap</option>
          <option>Flutter</option>
          <option>Html</option>
        </select>

        {/* Model Selector */}
        {/* <label className="text-sm mb-2 font-medium">Model:</label>
        <select value={model} onChange={(e) => setModel(e.target.value)} className="bg-gray-800 border border-gray-700 rounded px-2 py-1 mb-4 text-white">
          <option>Groq</option>
        </select> */}

        {/* Prompt Input */}
        <label className="text-sm font-medium mb-2">Describe the UI you want to create:</label>
        <textarea
          placeholder="Describe the UI component or page you want to generate..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded p-2 text-sm resize-none h-24 mb-4"
        />

        {/* Generate Button */}
        <button onClick={handleGenerate} className="w-full bg-purple-600 hover:bg-purple-700 transition-all py-2 rounded mb-4">
          Generate UI
        </button>

        {/* Upload Images */}
        <div className="mb-6">
          <label className="text-sm font-medium mb-2 block">Upload Images</label>
          <div
            className="border-2 border-dashed border-gray-700 rounded p-4 flex flex-col items-center justify-center text-gray-400 hover:border-purple-600 hover:text-white transition cursor-pointer"
            onClick={() => document.getElementById("imageUploadInput").click()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h10a4 4 0 004-4M12 11V3m0 0L8 7m4-4l4 4" />
            </svg>
            <p className="text-sm">Click or drag to upload images</p>
          </div>
          <input id="imageUploadInput" type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />

          {uploadedImages.length > 0 && (
            <div className="bg-gray-800 mt-4 rounded p-2 max-h-40 overflow-y-auto">
              <h4 className="text-sm font-semibold mb-2 text-white">Uploaded Images</h4>
              <div className="grid grid-cols-2 gap-2">
                {uploadedImages.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img src={img.url} alt={img.name} className="w-full h-20 object-cover rounded border border-gray-700 group-hover:opacity-75 transition" />
                    <div className="absolute bottom-0 left-0 w-full text-xs text-center bg-black bg-opacity-50 text-white p-1 opacity-0 group-hover:opacity-100 transition">{img.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Tabs and Buttons */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <div className="flex gap-4">
            <button onClick={() => setCodeTab(true)} className={`px-4 py-1 rounded ${codeTab ? "bg-purple-600" : "bg-gray-800"}`}>Code</button>
            <button onClick={() => setCodeTab(false)} className={`px-4 py-1 rounded ${!codeTab ? "bg-purple-600" : "bg-gray-800"}`}>Preview</button>
          </div>
          <div className="flex gap-2">
          <input
    type="text"
    value={PageName}
    onChange={(e) => setPageName(e.target.value)}
    placeholder="Enter page name"
    className="px-3 py-2 rounded-md bg-gray-800 border border-gray-600 text-white text-sm"
  />
            <button className="bg-gray-800 px-3 py-1 rounded border border-gray-700" onClick={handleSave}>Save</button>
            <button onClick={handleCopy} className="bg-gray-800 px-3 py-1 rounded border border-gray-700">Copy</button>
          </div>
          

        </div>

        {/* Display */}
        <div className="flex-1 p-6 overflow-auto bg-gray-950">
          {generatedCode ? (
            codeTab ? (
              <div className="rounded overflow-hidden shadow-xl h-[800px]">
                <MonacoEditor
                  theme="vs-dark"
                  height="100%"
                  language={language.toLowerCase() === "react" ? "javascript" : language.toLowerCase()}
                  value={generatedCode}
                  onChange={(value) => setGeneratedCode(value || "")}
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    wordWrap: "on",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    lineNumbers: "on",
                  }}
                />
              </div>
            ) : language === "React" ? (
              <LiveProvider
              code={cleanReactCodeForLive(generatedCode)}
              scope={{ React, useState }}
            >
              <LiveError />
              <LivePreview />
            </LiveProvider>
            
            ) : language === "Flutter" ? (
              <div className="bg-white text-black p-4 rounded shadow">
                <p>Flutter code preview is not yet supported in this app.</p>
              </div>
            ) : language === "Html" ? (
              <div className="bg-white text-black p-4 rounded shadow">
                <div dangerouslySetInnerHTML={{ __html: generatedCode }} />
              </div>
            ) : language === "Bootstrap" ? (
              <div className="bg-white text-black p-4 rounded shadow">
                <div dangerouslySetInnerHTML={{ __html: generatedCode }} />
              </div>
            )
            : null
          ) : (
            <div className="text-purple-500 text-center mt-20">
              No Code Generated Yet
              <br />
              <span className="text-sm text-gray-400">Enter a prompt and click Generate UI</span>
            </div>
          )}
        </div>
      </main>
       
   
    </div>
  );
}
