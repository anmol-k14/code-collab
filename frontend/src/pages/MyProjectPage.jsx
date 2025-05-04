
import React, { use } from "react";
import SideBar from "../components/sidebar.jsx";
import NavbarLogout from "../components/navbarLogout.jsx";
import CodeEditor from "../components/codeEditor.jsx";
import Button from "../components/button.jsx";
import SelectLang from "../components/selectLang.jsx";
// import axios from "../config/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ChatWidget from "../components/aiChatSection.jsx";
import notFound from "./notFound.jsx";
import { useState } from "react";
import axios from "axios";
import axiosConfig from "../config/axios";
import ProjectButtons from "../components/projectsButtons.jsx"; // Import the new component

const MyProjectPage = () => {
  const location = useLocation();

  const [Language, setLanguage] = useState(); // Default language
  const [code, setCode] = useState(); // Default boilerplate code
  const [output, setOutput] = useState("");
  const [isError, setIsError] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [langid, setlangid] = useState();
  
  const [project, setProject] = useState(location.state.project);

  function saveFileTree(code) {
    axiosConfig.put('/projects/update-file-tree', {
        projectId: project._id,
        code: code,
        lang: Language,
        langId: langid
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(res => {
        console.log("Code updated:",res.data)
    }).catch(err => {
        console.log("Error updatind code",err)
    })
}


const fetchProject = async () => {
  try {
    const projectId = location.state?.project?._id; // Get projectId from location.state
    if (!projectId) {
      console.error("Project ID not found");
      return;
    }
    const response = await axiosConfig.get(`/projects/get-project/${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const projectData = response.data;

    setProject(projectData); // Set the project data
    setLanguage(projectData.lang); // Set the language
    setCode(projectData.code); // Set the code
    setlangid(projectData.langId); // Set the language ID
  } catch (error) {
    console.error("Error fetching project:", error);
  }
};
useEffect(() => {
  fetchProject();
}, [project._id]); // Fetch project data when the component mounts or project ID changes


useEffect(() => {
  saveFileTree(code, Language);
}, [code, Language]);
  
  
  const navigate=useNavigate();

  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: {
      base64_encoded: "true",
      wait: "false",
      fields: "*",
    },
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      language_id: langid, // Use the selected language ID
      source_code: btoa(code),
      stdin: btoa(input), // Use btoa to encode the input string to base64
    },
  };

  async function handleRunCode() {
    try {
      setLoading(true); // Set loading state to true
      const response = await axios.request(options);

      fetchData(response.data.token); // Call fetchData with the token from the response
    } catch (error) {
      console.error(error);
      setLoading(false); // Reset loading state
    } 
  }

  async function fetchData(token) {
    const optionsget = {
      method: "GET",
      url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
      params: {
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(optionsget);
      const statusId = response.data.status?.id;

      // 1: In Queue, 2: Processing
      if (statusId <= 2) {
        console.log("Still processing, retrying in 1 second...");
        setTimeout(() => fetchData(token), 1000); // Try again in 1 second
      } else {
        const stdout = atob(response.data.stdout || "");
        const stderr = atob(response.data.stderr || "");
        const compile_output = atob(response.data.compile_output || "");

        if (stderr) {
          setOutput(stderr); // Set error output
          setIsError(true); // Set error state
        } else if (compile_output) {
          setOutput(compile_output); // Set compilation error output
          setIsError(true); // Set error state
        } else {
          setOutput(stdout); // Set standard output
          setIsError(false); // Reset error state
        }
        setLoading(false); // Reset loading state
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setLoading(false); // Reset loading state
    }
  }


  return (
    <>
      <div className="bg-[#232323] h-screen w-screen flex ">
        <SideBar />
        <div className="w-[95%] h-full flex flex-col">
          <NavbarLogout />
          <div className="w-full h-[92%] flex">
            <div className="code-section w-[75%] h-full flex flex-col ">
              <div className="code-bar w-full h-10 flex justify-between  ">
                <div className="flex items-end pl-1"> <div className="bg-[#393939] h-8 px-2 rounded-t-md">{project.name}</div> </div>
                <div className="flex items-end ">
                  <SelectLang
                    Language={Language}
                    setLanguage={setLanguage}
                    setCode={setCode}
                    setlangid={setlangid} // Pass setlangid to update the language ID
                  />
                </div>
              </div>
              <div className="relative codeEditor w-full h-full overflow-hidden ">
                {" "}
                {/* <div
                    className="absolute top-0 left-0 z-10 pl-1 w-[100%] h-[100%] opacity-50 blur-[200px]"
                    style={{
                      WebkitMaskImage:
                        "radial-gradient(circle at top left, white 50%, transparent 100%)",
                      maskImage:
                        "radial-gradient(circle at top left, white 50%, transparent 100%)",
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                    }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-500"></div>
                  </div> */}
                <CodeEditor code={code} setCode={setCode}  />
                <div className=" absolute bottom-0 right-2 z-10  text-[#C84F19] text-5xl   ">
                  AI Powered
                </div>
              </div>
            </div>
            <div className="input-output-section w-[25%] h-full flex flex-col">
              <div className="input-bar h-10 w-full flex items-center justify-end pr-1 gap-2">
                <ProjectButtons setCode={setCode} code={code} project={project} />
                <Button btn="Run" onClick={handleRunCode} />
              </div>
              <div className="relative w-full h-full flex flex-col">
                <div className="input-section w-full px-1 h-[50%] ">
                  <div className="w-full h-full p-2 bg-[#1F1F1F] rounded-lg border-[1px] border-[#5D5D5D]">
                    {/* <p className="text-white">Input</p> */}
                    <textarea
                      className="text-black w-full h-full  text-lg text-white bg-[#1F1F1F] resize-none focus:outline-none"
                      type="text"
                      placeholder="Input here...(space separated)"
                      value={input} // Bind input state
                      onChange={(e) => setInput(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="output-section w-full p-1 h-[50%] ">
                  <div className="w-full h-full p-2 bg-[#1F1F1F] rounded-lg border-[1px] border-[#5D5D5D] overflow-auto">
                    {loading ? (
                      <p className="text-[#9CA3AF] text-lg animate-pulse">
                        Running...
                      </p>
                    ) : !output ? (
                      <p className="text-[#9CA3AF] text-lg">
                        No output available.
                      </p>
                    ) : (
                      <p
                        className={` ${
                          isError
                            ? "text-red-500 text-sm"
                            : "text-[#9CA3AF] text-lg"
                        }`}
                      >
                        {output}
                      </p>
                    )}
                  </div>
                </div>
                <ChatWidget setCode={setCode} code={code} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProjectPage;