import { Router } from "express";
import {
  addVacation,
  getAllVacations,
  removeVacation,
  editVacation,
  exportFollowersCSV,
} from "../controllers/vacations/controller";
import paramsValidation from "../middlewares/params-validation";
import {
  newVacationFilesValidator,
  addVacationValidator,
  updateVacationFilesValidator,
  UpdateVacationValidator,
  vacationIdValidator,
} from "../controllers/vacations/validator";
import validation from "../middlewares/validation";
import enforceAuth from "../middlewares/enforce-auth";
import filesValidation from "../middlewares/files-validation";
import fileUploader from "../middlewares/file-uploader";

const vacationsRouter = Router();

vacationsRouter.use(enforceAuth);

vacationsRouter.get("/", getAllVacations);
vacationsRouter.post(
  "/",
  validation(addVacationValidator),
  filesValidation(newVacationFilesValidator),
  fileUploader,
  addVacation
);

vacationsRouter.delete(
  "/:id",
  paramsValidation(vacationIdValidator),
  removeVacation
);

vacationsRouter.patch(
  "/:id",
  paramsValidation(vacationIdValidator),
  validation(UpdateVacationValidator),
  filesValidation(updateVacationFilesValidator),
  fileUploader,
  editVacation
);

vacationsRouter.get("/reports/followers", exportFollowersCSV);

export default vacationsRouter;
