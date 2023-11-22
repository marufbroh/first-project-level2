import express from "express"
import { StudentControllers } from "./student.controller";

const router = express.Router();

// will ccall controller func
router.post("/create-student", StudentControllers.createStudent);

router.get("/", StudentControllers.getAllStudents)

router.get("/:id", StudentControllers.getSingleStudent);

router.delete("/:id", StudentControllers.deleteStudent);

export const StudentRoutes = router;