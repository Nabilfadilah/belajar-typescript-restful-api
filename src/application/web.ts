import express  from "express"
import { publicRouter } from "../route/public-api";
import { errorMiddleware } from "../middleware/error-middleware";

export const web = express();
// registrasikan 
web.use(express.json());
web.use(publicRouter);
web.use(errorMiddleware);

// setup skema router nya