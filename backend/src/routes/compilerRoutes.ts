import { Router } from "express";
import { runCode } from "../controller/compilerController";

const router = Router();

router.post("/run", async (req, res) => {
  const { language, code } = req.body;

  try {
    const output = await runCode(language, code);
    res.json({ output });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
