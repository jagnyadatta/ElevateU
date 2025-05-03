import express from 'express';
import { findIndivisual, findUser, logout } from '../controllers/findUser.controller.js';

const router = express.Router();

router.route("/:id").get(findIndivisual);
router.route("/find").post(findUser);
router.route("/v1/logout").get(logout);

export default router;