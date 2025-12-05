import { Request, Response } from "express";
import { ICompilerService } from "../../services/interface/ICompilerService";
import { HttpStatus } from "../../constants/status.constants";
import { HttpResponse } from "../../constants/responseMessage.constants";
import { ICompilerController } from "../interface/ICompilerController";


export class CompilerController implements ICompilerController {
  constructor(private readonly _compilerService: ICompilerService) {}

  async runCode(req: Request, res: Response): Promise<void> {
    try {
      const { language, code } = req.body;

      if (!language || !code) {
        res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: HttpResponse.FIELDS_REQUIRED,
        });
        return
      }

      const output = await this._compilerService.run(language, code);

      res.status(HttpStatus.OK).json({ success: true, output });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: (error as Error).message || HttpResponse.SERVER_ERROR,
      });
    }
  }
}
