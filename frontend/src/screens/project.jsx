import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../config/axios";
import {initializeSocket,receiveMessage,sendMessage} from "../config/socket";
import { UserContext } from "../context/user.context";
import Markdown from "markdown-to-jsx";
import hljs from 'highlight.js';
import { getWebContainer } from "../config/webContainer";


const project = () => {
  const location = useLocation();
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(new Set());
  const [project, setProject] = useState(location.state.project);
  const [message, setMessage] = useState("");
  const { user } = useContext(UserContext);
  const messageBox = React.createRef();

  const [users, setUsers] = useState([]);
  const [ openFiles, setOpenFiles ] = useState([])
  const [webContainer, setWebContainer] = useState(null)
  const [ iframeUrl, setIframeUrl ] = useState(null)

  const [ runProcess, setRunProcess ] = useState(null)

  const [fileTree, setFileTree] = useState({})
  const [currentFile, setCurrentFile] = useState(null)


  const handleUserClick = (id) => {
    setSelectedUserId((prevSelectedUserId) => {
      const newSelectedUserId = new Set(prevSelectedUserId);
      if (newSelectedUserId.has(id)) {
        newSelectedUserId.delete(id);
      } else {
        newSelectedUserId.add(id);
      }

      return newSelectedUserId;
    });
  };

  

  function addCollaborators() {
    axios
      .put("/projects/add-user", {
        projectId: location.state.project._id,
        users: Array.from(selectedUserId),
      })
      .then((res) => {
        console.log(res.data);
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const send = () => {
    const messageData = {
      message,
      sender: user,
    };

    sendMessage("project-message", messageData);
    appendOutgoingMessage(messageData);

    setMessage("");
  };
  useEffect(() => {
    initializeSocket(project._id);

    if (!webContainer) {
      getWebContainer().then(container => {
          setWebContainer(container)
          console.log("container started")
      })
  }


    receiveMessage("project-message", (data) => {
      console.log("aaa");
      console.log(data)
      if(data.sender._id==='ai'){
        const message=JSON.parse(data.message)
        webContainer?.mount(message.fileTree)
        if(message.fileTree){
          setFileTree(message.fileTree)
        }
        if(message.code){
          setFileTree(message.code)
        }
      }

      appendIncomingMessage(data);
    });

    axios
      .get(`/projects/get-project/${location.state.project._id}`)
      .then((res) => {
        console.log(res.data.project);

        setProject(res.data.project);
        setFileTree(res.data.project.fileTree || {});
      });

    axios
      .get("/users/all")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });

    //   return () => {
    //     if (socket) {
    //         socket.off('project-message', handleMessage); // remove listener
    //         socket.disconnect(); // disconnect socket
    //     }
    // };
  }, []);

  function saveFileTree(ft) {
    axios.put('/projects/update-file-tree', {
        projectId: project._id,
        fileTree: ft
    }).then(res => {
        console.log(res.data)
    }).catch(err => {
        console.log(err)
    })
}

  function scrollToBottom() {
    const box = document.querySelector(".message-box");
    if (box) {
      box.scrollTop = box.scrollHeight;
    }
  }

  function appendIncomingMessage(messageObject) {
    const messageBox = document.querySelector(".message-box");
    const message = document.createElement("div");
    console.log("aaaa");
    console.log(messageObject);
    message.className = `in-message flex flex-col w-auto max-w-64 leading-1.5 p-2 rounded-e-xl rounded-es-xl bg-[#111927]`;

    if (messageObject.sender._id === "ai") {
      message.innerHTML = `
      <div class="flex items-center  ">
            <span class="text-sm font-semibold text-[#999]">
              ${messageObject.sender.email}
            </span>
          </div>
          <p class="text-sm font-normal py-1 text-[#999]">
              ${JSON.parse(messageObject.message).text}
          </p>      
`;
    } else {
      message.innerHTML = `
          <div class="flex items-center  ">
                <span class="text-sm font-semibold text-[#999]">
                  ${messageObject.sender.email}
                </span>
              </div>
              <p class="text-sm font-normal py-1 text-[#999]">
                  ${messageObject.message}
              </p>
        
    `;
    }
    messageBox.appendChild(message);
    scrollToBottom();
  }

  function appendOutgoingMessage(messageObject) {
    const messageBox = document.querySelector(".message-box");
    const message = document.createElement("div");
    console.log("aaaa");
    console.log(messageObject);
    message.className =
      "out-message ml-auto flex flex-col w-auto max-w-64 leading-1.5 p-2 bg-[#6e54b5] rounded-s-xl rounded-tr-xl ";
    message.innerHTML = `

              <p class="text-sm font-normal py-1 text-gray-900 text-[#ffff]">
                  ${messageObject.message}

              </p>
          
    `;
    messageBox.appendChild(message);
    scrollToBottom();
  }

  return (
    <main
      className="h-screen w-screen flex"
      style={{ backgroundColor: "#111927" }}
    >
      <section className="left_section relative flex flex-col w-[26.5%]  bg-[#1f2c41]  m-2 box-border rounded-lg">
        <header className="flex justify-between items-center p-4 w-full ">
          <button className="flex gap-2" onClick={() => setIsModalOpen(true)}>
            <i className="ri-add-fill mr-1"></i>
            <p>Add collaborator</p>
          </button>
          <button
            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
            className="p-2"
          >
            <i className="ri-group-fill"></i>
          </button>
        </header>

        <div className="w-[100%] h-full converstion-area flex-1 flex-col relative overflow-hidden">
          <div
            ref={messageBox}
            className="message-box w-full h-[93%] p-1 flex flex-col gap-1 overflow-y-auto scrollbar-hide"
          >



          </div>

          <div className="inputField m-1 sticky bottom-0 w-[97%] h-10 flex absolute bottom-0 gap-1  ">
            <input
              className="bg-[#111927] p-3 w-full focus:outline-none rounded-full text-sm"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
            />
            <button
              onClick={send}
              className="bg-[#6e54b5] w-12 text-white rounded-full"
            >
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>

        <div
          className={`sidePanel flex flex-col gap-2 w-full h-full bg-[#1f2c41] absolute rounded-lg transition duration-500 ease-in-out top-0 ${
            isSidePanelOpen ? "translate-x-0 " : "-translate-x-full opacity-0"
          }`}
        >
          <header className="flex justify-between items-center p-4 bg-[#1f2c41] rounded-t-lg">
            <h2 className="font-semibold text-lg">Collaborators</h2>
            <button
              onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
              className="p-2"
            >
              <i className="ri-close-fill"></i>
            </button>
          </header>

          <div className="users flex flex-col gap-2">
            {project.users &&
              project.users.map((user, index) => {
                return (
                  <div
                    key={index}
                    className="user cursor-pointer hover:bg-[#293957] p-2 flex gap-2 items-center"
                  >
                    <div className="aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600">
                      <i className="ri-user-fill absolute"></i>
                    </div>
                    <small className=" text-lg">{user.email}</small>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      <section className="right_section w-full flex  bg-[#1f2c41] mt-2 mr-2 mb-2 box-border rounded-lg">
        <div className="explorer w-[18%] h-[100%] rounded-l-lg pt-10 pb-4 bg-[#1f2c41]  shadow-[1px_0px_0px_0px_#718096] z-10">
          <div className="file-tree w-full flex flex-col gap-2">
            {Object.keys(fileTree).map((file, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentFile(file);
                  setOpenFiles([...new Set([...openFiles, file])]);
                }}
                className={`tree-element cursor-pointer p-1 px-4 flex items-center gap-2 w-full bg-[#1f2c41]  ${
                  currentFile === file ? "shadow-[0px_0px_6px_1px_#718096] " : ""
                }`}
              >

                <p className="font-semibold text-lg">{file}</p>
              </button>
           ))} 
          </div>
        </div>

        <div className="code-editor flex flex-col flex-grow h-full shrink z-5">
          <div className="top flex justify-between w-full">
            <div className="files flex">
              {openFiles.map((file, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFile(file)}
                  className={`open-file cursor-pointer p-2 px-4 flex items-center w-fit gap-2  ${
                    currentFile === file ? "bg-[#2e3440]" : "bg-[#1f2c41]"
                  }`}
                >
                  <p className="font-semibold text-lg">{file}</p>
                </button>
              ))}
            </div>

            <div className="actions flex gap-2">
              <button
                onClick={async () => {
                  await webContainer.mount(fileTree);

                  const installProcess = await webContainer.spawn("npm", [
                    "install",
                  ]);

                  installProcess.output.pipeTo(
                    new WritableStream({
                      write(chunk) {
                        console.log(chunk);
                      },
                    })
                  );

                  if (runProcess) {
                    runProcess.kill();
                  }

                  let tempRunProcess = await webContainer.spawn("npm", [
                    "start",
                  ]);

                  tempRunProcess.output.pipeTo(
                    new WritableStream({
                      write(chunk) {
                        console.log(chunk);
                      },
                    })
                  );

                  setRunProcess(tempRunProcess);

                  webContainer.on("server-ready", (port, url) => {
                    console.log(port, url);
                    setIframeUrl(url);
                  });
                }}
                className="p-2 px-4 bg-slate-500 text-white"
              >
                
                Run
              </button>
            </div>
          </div>
          <div className="bottom flex flex-grow max-w-full shrink overflow-auto">
            {fileTree[currentFile] && (
              <div className="code-editor-area h-full overflow-auto flex-grow ">
                <pre className="hljs h-full ">
                  <code
                    className="hljs h-full outline-none scrollbar-hide"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const updatedContent = e.target.innerText;
                      const ft = {
                        ...fileTree,
                        [currentFile]: {
                          file: {
                            contents: updatedContent,
                          },
                        },
                      };
                      setFileTree(ft);
                      saveFileTree(ft);
                    }}
                    dangerouslySetInnerHTML={{
                      __html: hljs.highlight(
                        "javascript",
                        fileTree[currentFile].file.contents
                      ).value,
                    }}
                    style={{
                      whiteSpace: "pre-wrap",
                      paddingBottom: "25rem",
                      counterSet: "line-numbering",
                    }}
                  />
                </pre>
              </div>
            )}
          </div>
        </div>

        {iframeUrl && webContainer && (
          <div className="flex min-w-96 flex-col h-full">
            <div className="address-bar">
              <input
                type="text"
                onChange={(e) => setIframeUrl(e.target.value)}
                value={iframeUrl}
                className="w-full p-2 px-4 bg-[#1f2c41]"
              />
            </div>
            <iframe src={iframeUrl} className="w-full h-full"></iframe>
          </div>
        )}
      </section>

      {isModalOpen && (
        <div className="add_collaborator fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#1f2c41] p-4 rounded-md w-96 max-w-full relative">
            <header className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Select User</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2">
                <i className="ri-close-fill"></i>
              </button>
            </header>
            <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
              {users.map((user) => (
                <div
                  key={user._id}
                  className={`user cursor-pointer hover:bg-[#293957]  ${
                    Array.from(selectedUserId).indexOf(user._id) != -1
                      ? "bg-[#293957] "
                      : ""
                  } p-2 flex gap-2 items-center`}
                  onClick={() => handleUserClick(user._id)}
                >
                  <div className="aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600">
                    <i className="ri-user-fill absolute"></i>
                  </div>
                  <h1 className="font-semibold text-lg">{user.email}</h1>
                </div>
              ))}
            </div>
            <button
              onClick={addCollaborators}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Add Collaborators
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default project;
