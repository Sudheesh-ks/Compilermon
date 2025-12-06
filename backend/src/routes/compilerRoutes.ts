import { Router } from "express";
import { CompilerService } from "../services/implementation/compilerServices";
import { CompilerController } from "../controller/implementation/compilerController";

const router = Router();

const compilerService = new CompilerService();
const compilerController = new CompilerController(compilerService);

router.post("/run", (req, res) => compilerController.runCode(req, res));

export default router;
