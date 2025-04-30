import express from 'express';
import { findUser, logout } from '../controllers/findUser.controller.js';

const router = express.Router();

router.route("/find").post(findUser);
router.route("/logout").get(logout);

export default router;