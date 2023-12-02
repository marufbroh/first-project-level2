import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.service";

const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const result = await StudentServices.getAllStudentFromDB();
        res.status(200).json({
            success: true,
            message: "Students are retrieved successfully",
            data: result,
        })
    } catch (error) {
        next(error)
    }

}

const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const studentId: string = req.params.id;
        const result = await StudentServices.getSingleStudentFromDB(studentId);
        res.status(200).json({
            success: true,
            message: "Student is retrieved successfully",
            data: result
        })

    } catch (error) {
        next(error)
    }

}

const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const studentId: string = req.params.id;
        const result = await StudentServices.deleteStudentFromDB(studentId);
        res.status(200).json({
            success: true,
            message: "Student is deleted successfully",
            data: result
        })

    } catch (error) {
        next(error)
    }

}

export const StudentControllers = {
    getAllStudents,
    getSingleStudent,
    deleteStudent,
}