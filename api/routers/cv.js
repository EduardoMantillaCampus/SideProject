import { Router } from "express"
import { validateCvQuerys, validateCvPost, validateCvUpdate } from "../dto/cvDTOvalidator.js";
import { validatePermisos } from "../middleware/validatePermisos.js";
import { cvController } from "../controller/cv.js";
const appCv = Router(); 

appCv.get("/", validatePermisos(["*"]), validateCvQuerys, cvController.getAll)
appCv.get("/estado/:estado", validatePermisos(["admin"]), cvController.filterEstadoCv)
appCv.post("/", validatePermisos(["admin", "camper"]), validateCvPost, cvController.postCv)
appCv.put("/:id", validatePermisos(["admin", "camper"]), validateCvQuerys, validateCvUpdate, cvController.putCv)
appCv.delete("/:id", validatePermisos(["admin", "camper"]), validateCvQuerys, cvController.deleteCv)

export default appCv;