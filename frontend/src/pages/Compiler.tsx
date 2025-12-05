import React, { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';
import { SiJavascript, SiPython, SiCplusplus, SiTypescript } from 'react-icons/si';

interface CompilerProps {}

const Compiler: React.FC<CompilerProps> = () => {
  const [code, setCode] = useState(`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
// }`);

  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('Ready to run your code...');
  const [isRunning, setIsRunning] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const languages = [
    { value: 'javascript', label: 'JavaScript', icon: <SiJavascript size={28} /> },
    { value: 'python', label: 'Python', icon: <SiPython size={28} /> },
    { value: 'cpp', label: 'C++', icon: <SiCplusplus size={28} /> },
    { value: 'typescript', label: 'TypeScript', icon: <SiTypescript size={28} /> },
  ];

  useEffect(() => {
    updateLineNumbers();
  }, [code]);

  const updateLineNumbers = () => {
    if (lineNumbersRef.current) {
      const lines = code.split('\n').length;
      lineNumbersRef.current.innerHTML = Array.from(
        { length: lines },
        (_, i) => `<div class="line-number">${i + 1}</div>`
      ).join('');
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Running...');

    setTimeout(() => {
      setOutput(
        `Fibonacci sequence:
F(0) = 0
F(1) = 1
F(2) = 1
F(3) = 2
F(4) = 3
F(5) = 5
F(6) = 8
F(7) = 13
F(8) = 21
F(9) = 34

Execution completed in 42ms`
      );
      setIsRunning(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 border-b border-green-500/30 p-4">
        <h1 className="text-xl font-bold">Compilermon</h1>
      </div>

      <div className="flex flex-1 w-full max-w-7xl mx-auto">
        
        {/* LANGUAGE ICON SIDEBAR CENTERED */}
        <div className="w-16 bg-gray-900 border-r border-green-500/30 p-2 flex flex-col items-center justify-center space-y-4">
          {languages.map(lang => (
            <button
              key={lang.value}
              onClick={() => setLanguage(lang.value)}
              className={`
                w-12 h-12 rounded-lg flex items-center justify-center transition-all
                ${language === lang.value
                  ? "bg-green-600 text-black shadow shadow-green-400 scale-110"
                  : "bg-gray-800 text-green-400 hover:bg-gray-700"}
              `}
              title={lang.label}
            >
              {lang.icon}
            </button>
          ))}
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col">
          <div className="bg-gray-900/50 border-b border-green-500/20 p-3">
            <button
              onClick={runCode}
              disabled={isRunning}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-black px-4 py-2 rounded"
            >
              <Play size={16} />
              <span>{isRunning ? "Running..." : "Run"}</span>
            </button>
          </div>

          <div className="flex-1 flex bg-gray-900">
            
            {/* LINE NUMBERS */}
            <div
              ref={lineNumbersRef}
              className="bg-gray-800 text-green-600 text-sm p-4 pr-2 min-w-[50px] text-right leading-6 overflow-hidden border-r border-green-500/20"
              style={{ fontFamily: "Monaco, Consolas" }}
            />

            {/* TEXTAREA */}
            <textarea
              ref={textareaRef}
              value={code}
              onChange={handleCodeChange}
              onScroll={handleScroll}
              className="w-full h-full bg-transparent text-green-400 p-4 leading-6 resize-none outline-none"
              style={{ fontFamily: "Monaco, Consolas", fontSize: "14px" }}
              spellCheck={false}
            />
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