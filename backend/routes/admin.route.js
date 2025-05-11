import express from 'express';
import { adminLogin, approveCounsellor, findAllCounsellors, findAllStudents, getCounsellorById } from '../controllers/admin.controller.js';

const router = express.Router();

router.route("/students").get(findAllStudents);
router.route("/counsellors").get(findAllCounsellors);
router.get("/counsellor/:id", getCounsellorById);
router.put("/approve/:id", approveCounsellor);
router.post('/login', adminLogin);

export default router;