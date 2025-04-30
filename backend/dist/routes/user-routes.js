import { Router } from "express";
import { getAllUsers, logoutUser, userLogin, userSignUp, verifyUser } from "../controllers/user-controller.js";
import { validate, signUpValidator, loginValidator } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";
const userRouter = Router();
userRouter.get("/", getAllUsers);
userRouter.post("/signup", validate(signUpValidator), userSignUp);
userRouter.post("/login", validate(loginValidator), userLogin);
userRouter.get("/auth-status", verifyToken, verifyUser);
userRouter.get("/logout", verifyToken, logoutUser);
export default userRouter;
//# sourceMappingURL=user-routes.js.map