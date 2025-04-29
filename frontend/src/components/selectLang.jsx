import React from "react";

const SelectLang = ({ Language, setLanguage,setCode, setlangid }) => {
  const boilerplateCode = {
    javascript: `console.log("Hello, JavaScript!");`,
    python: `print("Hello, Python!")`,
    cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, C++!" << endl;\n    return 0;\n}`,
    java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java!");\n    }\n}`,
  };

  const languageMap = {
    javascript: 63, // Node.js
    python: 71,     // Python 3
    cpp: 54,        // C++
    java: 62        // Java
  };
  


  const changeLanguage = (e) => {
    setLanguage(e.target.value); // Correct way to get selected value
    const judge0LangId = languageMap[e.target.value];
    setlangid(judge0LangId); // Correct way to get selected value
    setCode(boilerplateCode[e.target.value]);
  };

  return (
    <>
      <select 
        value={Language} 
        onChange={changeLanguage}
        className="h-8 rounded-t-lg bg-[#2E2E2E] p-1 text-white text-lg focus:outline-none"
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="cpp">C++</option>
        <option value="java">Java</option>
      </select>
    </>
  );
};

export default SelectLang;
