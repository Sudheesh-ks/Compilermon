import axios from "axios";

export const runCode = async (language: string, code: string) => {
  const langMap: any = {
    javascript: { lang: "javascript", version: "18.15.0" },
    python: { lang: "python", version: "3.10.0" },
    cpp: { lang: "cpp", version: "10.2.0" },
    typescript: { lang: "typescript", version: "5.0.3" },
  };

  if (!langMap[language]) {
    throw new Error("Unsupported language");
  }

  try {
    const response = await axios.post(
      "https://emkc.org/api/v2/piston/execute",
      {
        language: langMap[language].lang,
        version: langMap[language].version,
        files: [
          {
            content: code,
          },
        ],
      }
    );

    return response.data.run.output;
  } catch (error: any) {
    throw new Error(error.response?.data || "Execution failed");
  }
};
