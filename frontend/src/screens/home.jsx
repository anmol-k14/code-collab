import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user.context.jsx";
import axios from "../config/axios.js";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  function createProject(e) {
    e.preventDefault();
    
    if (!projectName.trim()) return;
    
    axios
      .post("/projects/create", {
        name: projectName},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
        )
      .then((res) => {
        if (res.data && res.data.project) {
          setProjects(prev => [...prev, res.data.project]);
        }
        setIsModalOpen(false);
        setProjectName("");
        fetchProjects();
      })
      .catch((error) => {
        console.error("Error creating project:", error);
        setError("Failed to create project. Please try again.");
      });
  }

  const fetchProjects = () => {
    setIsLoading(true);
    setError(null);
    
    axios
      .get("/projects/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data && Array.isArray(res.data.projects)) {
          setProjects(res.data.projects.filter(Boolean));
        } else {
          setProjects([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please refresh the page.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProjectName("");
    fetchProjects();
  }

  return (
    <main className="p-4 home">
      <div className="projects">
        <button
          onClick={() => setIsModalOpen(true)}
          className="project p-4 mb-3 border rounded-md border-slate-300"
        >
          New Project
          <i className="ri-link ml-2"></i>
        </button>

        {isLoading ? (
          <div className="text-center my-4">Loading projects...</div>
        ) : error ? (
          <div className="text-red-500 my-4">{error}</div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {projects.length === 0 ? (
              <div className="text-slate-400 my-4">No projects found. Create your first project!</div>
            ) : (
              projects.map((project, index) => (
                <div
                  key={project?._id || `project-${index}`}
                  onClick={() => {
                    navigate(`/project`, {
                      state: { project },
                    });
                  }}
                  className="project flex flex-col gap-2 cursor-pointer p-4 border border-slate-300 rounded-md min-w-52 hover:bg-slate-700"
                >
                  <h2 className="font-semibold">{project?.name || "Unnamed Project"}</h2>

                  <div className="flex gap-2">
                    <p>
                      <small>
                        <i className="ri-user-line"></i> Collaborators
                      </small>
                      :
                    </p>
                    {project?.users ? project.users.length : 0}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-1/3">
            <h2 className="text-xl mb-4">Create New Project</h2>
            <form onSubmit={createProject}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Project Name
                </label>
                <input
                  onChange={(e) => setProjectName(e.target.value)}
                  value={projectName}
                  type="text"
                  className="mt-1 block w-full text-gray-700 p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;