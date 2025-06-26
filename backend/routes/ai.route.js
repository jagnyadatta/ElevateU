import express from 'express';
import { callGemini } from '../controllers/ai.controller.js';

const router = express.Router();

router.route("/career-suggestions").post(callGemini);

export default router;