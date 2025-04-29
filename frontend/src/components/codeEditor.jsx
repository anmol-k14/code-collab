


// const Code = ({code,setCode,Language}) => {
//   return (
//     <div className='h-full w-full p-1 pt-0'> {/* set a height to the parent div */}
//       <textarea
//         className='text-black w-full h-full px-4 py-2 text-lg rounded-md rounded-tr-none text-white bg-[#2E2E2E] resize-none focus:outline-none'
//         type="text"
//         value={code} // Bind the code state to the textarea
//         onChange={(e) => setCode(e.target.value)}
//         placeholder='Write your code here...'
//       >
//       </textarea>

//     </div>
//   )
// }

// export default Code

import React, { use } from "react";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';


// Custom CSS styles to override CodeMirror theme
const customStyles = `

  .custom-editor .cm-editor {
    background-color: transparent !important;
  }
  .custom-editor .cm-editor .cm-content {
    color: #F8F8F2 !important;
    background: rgba( 255, 255, 255, 0.1 );
backdrop-filter: blur( 1.5px );
-webkit-backdrop-filter: blur( 1.5px );
// border: 1px solid rgba( 255, 255, 255, 0.18 );

  }
  .custom-editor .cm-editor .cm-gutters {
    color: #6C7086 !important;
    border: none !important;
      background: rgba( 255, 255, 255, 0.1 );
backdrop-filter: blur( 1.5px );
-webkit-backdrop-filter: blur( 1.5px );
  }
  .custom-editor .cm-editor .cm-activeLine {
    background-color: #313244 !important;
  }
  .custom-editor .cm-editor .cm-activeLineGutter {
    background-color: #313244 !important;
  }
`;

const Code = ({ code, setCode, Language }) => {
  // Choose language extension dynamically
  const getLanguageExtension = () => {
    switch (Language) {
      case "javascript":
        return javascript();
      case "python":
        return python();
      case "cpp":
        return cpp();
      case "java":
        return java();
      default:
        return javascript(); // default fallback
    }
  };

  // Inject custom styles
  React.useEffect(() => {
    // Create style element if it doesn't exist
    let styleElement = document.getElementById('custom-codemirror-styles');
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'custom-codemirror-styles';
      styleElement.innerHTML = customStyles;
      document.head.appendChild(styleElement);
    }
    
    // Cleanup function
    return () => {
      // Optional: remove styles when component unmounts
      // document.head.removeChild(styleElement);
    };
  }, []);



  return (
    <div className="relative h-full w-full ml-1  box-border z-20 pb-4 overflow-hidden custom-editor">
      <CodeMirror
        value={code}
        height="100%"
        theme="dark"
        extensions={[getLanguageExtension()]}
        onChange={(value) => setCode(value)}
        className="w-full h-full px-4 py-2 rounded-md rounded-tr-none focus:outline-none"
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          foldGutter: true,
          indentOnInput: true,
        }}
      />
    </div>
  );
};

export default Code;
