
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const router = useRouter();

  // Fetch projects from MongoDB on load
  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     const res = await fetch("/api/get-projects");
  //     const data = await res.json();
  //     setProjects(data.projects);
  //   };
  //   fetchProjects();
  // }, []);
  useEffect(() => {
  const fetchProjects = async () => {
    const res = await fetch("/api/get-projects");
    const data = await res.json();
    console.log("Fetched projects:", data); // Add this
    setProjects(data.projects);
  };
  fetchProjects();
}, []);


  // Create New Project
  const handleNewProject = async (name) => {
    if (!name.trim()) return;

    const res = await fetch("/api/create-project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim() }),
    });

    const data = await res.json();

    setProjects([data.project, ...projects]);
    setNewProjectName(""); // clear input
    router.push(`/generate?projectId=${data.project._id}`);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/delete-project?id=${id}`, { method: "DELETE" });
    setProjects(projects.filter((project) => project._id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-xl font-bold text-purple-400">
          &lt;/&gt; PromptUI Builder
        </h1>
        <div className="text-sm text-gray-400">Welcome saisreeperuboyina</div>
      </header>

      {/* Title + Form */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12 gap-4">
        <h2 className="text-2xl font-bold">Your Projects</h2>

        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="Enter project name"
            className="px-3 py-2 rounded-md bg-gray-800 border border-gray-600 text-white text-sm"
          />
          <Button
            onClick={() => handleNewProject(newProjectName)}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 text-sm font-medium"
          >
            + New Project
          </Button>
        </div>
      </div>
      

      {/* Empty State */}
      {projects.length === 0 ? (
        <div className="text-center mt-24">
          <p className="text-gray-400 mb-6 text-sm">
            You don&apos;t have any projects yet.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-[#111] border border-gray-700 rounded-lg p-6 group hover:border-purple-600 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold group-hover:text-purple-500 transition-colors">
                  {project.name}
                </h3>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="text-gray-400 text-sm hover:text-red-500"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-400 text-sm">{project.pages || 0} Pages</p>
              <p className="text-gray-400 text-sm">
                Last edited: {project.lastEdited?.split("T")[0] || "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
