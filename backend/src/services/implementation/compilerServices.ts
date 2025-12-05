import axios from "axios";
import { ICompilerService } from "../interface/ICompilerService";
import dotenv from "dotenv";
dotenv.config();

export class CompilerService implements ICompilerService {
  private readonly langMap: Record<string, { lang: string; version: string }> = {
    javascript: { lang: "javascript", version: "18.15.0" },
    python: { lang: "python", version: "3.10.0" },
    cpp: { lang: "cpp", version: "10.2.0" },
    typescript: { lang: "typescript", version: "5.0.3" },
  };

  private readonly pistonUrl = process.env.PISTON_API_URL;

  constructor() {
    if (!this.pistonUrl) {
      throw new Error("PISTON_API_URL is missing in .env");
    }
  }

  async run(language: string, code: string): Promise<string> {
    if (!this.langMap[language]) {
      throw new Error("Unsupported language");
    }

    try {
      const response = await axios.post(
        this.pistonUrl!, 
        {
          language: this.langMap[language].lang,
          version: this.langMap[language].version,
          files: [{ content: code }],
        }
      );

      return response.data.run.output;
    } catch (error: any) {
      throw new Error(error.response?.data || "Execution failed");
    }
  }
}
