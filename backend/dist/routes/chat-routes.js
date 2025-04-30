import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatValidator, validate } from "../utils/validators.js";
import { deleteChats, generateChatCompeletion, sendChatsToUser } from "../controllers/chat-controller.js";
const chatRouter = Router();
chatRouter.post("/new", validate(chatValidator), verifyToken, generateChatCompeletion);
chatRouter.get("/allChats", verifyToken, sendChatsToUser);
chatRouter.delete("/delete", verifyToken, deleteChats);
export default chatRouter;
//# sourceMappingURL=chat-routes.js.map