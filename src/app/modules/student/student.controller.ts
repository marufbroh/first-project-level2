import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import studentValidationSchema from "./student.validation";
// import studentValidationSchema from "./student.joi.validation";

const createStudent = async (req: Request, res: Response) => {
    try {
        const { student: studentData } = req.body;

        // data validation using Joi
        // const { error, value } = studentValidationSchema.validate(studentData);

        // data validation using Zod
        const zodParsedData = studentValidationSchema.parse(studentData);

        const result = await StudentServices.createStudentIntoDB(zodParsedData);
        // if (error) {
        //     res.status(500).json({
        //         success: false,
        //         message: "Something went wrong",
        //         error: error.details,
        //     })
        // }

        res.status(200).json({
            success: true,
            message: "Student is created successfully",
            data: result,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
        })
    }

}


const getAllStudents = async (req: Request, res: Response) => {

    try {
        const result = await StudentServices.getAllStudentFromDB();
        res.status(200).json({
            success: true,
            message: "Students are retrieved successfully",
            data: result,
        })
    } catch (error) {
        console.log(error);
    }

}

const getSingleStudent = async (req: Request, res: Response) => {

    try {
        const studentId: string = req.params.id;
        const result = await StudentServices.getSingleStudentFromDB(studentId);
        res.status(200).json({
            success: true,
            message: "Student is retrieved successfully",
            data: result
        })

    } catch (error) {
        console.log(error);
    }

}

export const StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudent,
}