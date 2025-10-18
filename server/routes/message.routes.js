import express from "express"
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { getAllUsers, getMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users",isAuthenticated,getAllUsers);
router.get("/messages/:id",isAuthenticated,getMessages);
router.post("/sends/:id",isAuthenticated,sendMessage);

export default router
