import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Play } from "lucide-react";
import {
  SiJavascript,
  SiPython,
  SiCplusplus,
  SiTypescript,
} from "react-icons/si";
import starterCodeMap from "../utils/StarterCodeMap";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const Compiler: React.FC = () => {
  const [code, setCode] = useState(`console.log("Welcome to Compilermon")`);

  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("Ready to run your code...");
  const [isRunning, setIsRunning] = useState(false);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const languages = [
    {
      value: "javascript",
      label: "JavaScript",
      icon: <SiJavascript size={28} />,
    },
    { value: "python", label: "Python", icon: <SiPython size={28} /> },
    { value: "cpp", label: "C++", icon: <SiCplusplus size={28} /> },
    {
      value: "typescript",
      label: "TypeScript",
      icon: <SiTypescript size={28} />,
    },
  ];

  const runCode = async () => {
    setIsRunning(true);
    setOutput("Running...");

    try {
      const res = await fetch(`${BACKEND_URL}/api/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code }),
      });

      const data = await res.json();

      if (data.output) {
        setOutput(data.output);
      } else {
        setOutput("Error:\n" + data.error);
      }
    } catch (err) {
      setOutput("Server error: " + err);
    }

    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 border-b border-green-500/30 p-4">
        <h1 className="text-xl font-bold">Compilermon</h1>
      </div>

      <div className="flex flex-1 w-full max-w-7xl mx-auto">
        {/* LANGUAGE ICON SIDEBAR CENTERED */}
        <div className="w-16 bg-gray-900 border-r border-green-500/30 p-2 flex flex-col items-center pt-54 space-y-4">
          {languages.map((lang) => (
            <button
              key={lang.value}
              onClick={() => {setLanguage(lang.value);
                setCode(starterCodeMap[lang.value])
              }}
              className={`
                w-12 h-12 rounded-lg flex items-center justify-center transition-all
                ${
                  language === lang.value
                    ? "bg-green-600 text-black shadow shadow-green-400 scale-110"
                    : "bg-gray-800 text-green-400 hover:bg-gray-700"
                }
              `}
              title={lang.label}
            >
              {lang.icon}
            </button>
          ))}
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col">
          <div className="bg-gray-900/50 border-b border-green-500/20 p-3 flex justify-end">
            <button
              onClick={runCode}
              disabled={isRunning}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-black px-4 py-2 rounded"
            >
              <Play size={16} />
              <span>{isRunning ? "Running..." : "Run"}</span>
            </button>
          </div>

          <div className="flex-1 flex bg-gray-900 overflow-hidden">
            {/* LINE NUMBERS */}
            <div
              ref={lineNumbersRef}
              className="bg-gray-800 text-green-600 text-sm p-4 pr-2 min-w-[50px] text-right leading-6 overflow-hidden border-r border-green-500/20"
              style={{ fontFamily: "Monaco, Consolas" }}
            />

            {/* TEXTAREA */}
            <div className="flex-1 overflow-auto">
            <Editor
              height="100%"
              language={language}
              value={code}
              onChange={(value) => setCode(value || "")}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                autoClosingBrackets: "always",
                autoIndent: "full",
                fontFamily: "Monaco",
                fontSize: 14,
              }}
            />
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="w-96 bg-gray-900 border-l border-green-500/30">
          <div className="bg-gray-800 border-b border-green-500/20 p-3">
            <h3 className="text-green-400 font-semibold">Output</h3>
          </div>

          <div className="p-4 overflow-auto">
            <pre className="text-sm text-green-300 whitespace-pre-wrap font-mono">
              {output}
            </pre>
          </div>
        </div>
      </div>

      <style>{`
        .line-number {
          padding: 0 8px;
          color: #4ade80;
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
};

export default Compiler;
