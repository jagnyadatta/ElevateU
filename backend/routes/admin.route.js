import express from 'express';
import { approveCounsellor, findAllCounsellors, findAllStudents, getCounsellorById } from '../controllers/admin.controller.js';

const router = express.Router();

router.route("/students").get(findAllStudents);
router.route("/counsellors").get(findAllCounsellors);
router.get("/counsellor/:id", getCounsellorById);
router.put("/approve/:id", approveCounsellor);


export default router;