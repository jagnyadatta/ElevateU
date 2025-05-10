import express from 'express';
import { findAllCounsellors, findAllStudents } from '../controllers/admin.controller.js';

const router = express.Router();

router.route("/students").get(findAllStudents);
router.route("/counsellors").get(findAllCounsellors);

export default router;