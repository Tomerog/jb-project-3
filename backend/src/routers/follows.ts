import { Router } from "express";
import enforceAuth from "../middlewares/enforce-auth";
import { follow, unfollow } from "../controllers/follows/controller";
import paramsValidation from "../middlewares/params-validation";
import { followsIdValidator } from "../controllers/follows/validator";

const followsRouter = Router();

followsRouter.use(enforceAuth);

followsRouter.post(
  "/follow/:vacationId",
  paramsValidation(followsIdValidator),
  follow
);
followsRouter.delete(
  "/unfollow/:vacationId",
  paramsValidation(followsIdValidator),
  unfollow
);

export default followsRouter;
