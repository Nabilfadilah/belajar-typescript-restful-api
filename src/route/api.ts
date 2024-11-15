import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";

// route khusus user login
export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

// User API
apiRouter.get("/api/users/current", UserController.get);

// ututan pembuatan API
/* 
1. Model
2. Service
3. Controller
4. Route
5. application = ini bisa sebelum route
*/