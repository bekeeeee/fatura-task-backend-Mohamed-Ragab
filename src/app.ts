import Express, { Request, Response, NextFunction } from "express";
import cookieSession from "cookie-session";
import "express-async-errors";
import { json } from "body-parser";
import cors from "cors";
import { userRouter } from "./routes/userRoutes";
import { postRouter } from "./routes/postRoutes";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import { currentUserMiddleware } from "./middlewares/current-user";

const app = Express();

app.use(json());
app.set("trust proxy", true);
app.use(cors());
app.use(
  cookieSession({
    name: "jwt",
    signed: false,
    secure: false,
  })
);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", currentUserMiddleware, postRouter);

app.all("*", async (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError());
});
app.use(errorHandler);
export { app };
