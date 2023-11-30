import { Request, Response } from "express";
import studentValidationSchema from "../student/student.validation";
import { UserServices } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
    try {
        const { password, student: studentData } = req.body;

        // const zodParseData = studentValidationSchema.parse(studentData);
        const result = await UserServices.createStudentIntoDB(password, studentData);

        res.send(200).json({
            success: true,
            message: "Student is created successfully",
            data: result
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
            error: error,
        })
    }
}

export const UserController = {
    createStudent
}