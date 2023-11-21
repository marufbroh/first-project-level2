import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import Joi from "joi";

const createStudent = async (req: Request, res: Response) => {
    try {

        // Define Joi schema for UserName
        const userNameSchema = Joi.object({
            firstName: Joi.string()
                .required()
                .trim()
                .max(20)
                .regex(/^[A-Z][a-z]*$/)
                .message('First name must start with a capital letter and contain only alphabetic characters'),
            middleName: Joi.string().trim(),
            lastName: Joi.string()
                .required()
                .trim()
                .regex(/^[A-Za-z]+$/)
                .message('Last name must contain only alphabetic characters'),
        });

        // Define Joi schema for Guardian
        const guardianSchema = Joi.object({
            fatherName: Joi.string().required(),
            fatherOccupation: Joi.string().required(),
            fatherContactNo: Joi.string().required(),
            motherName: Joi.string().required(),
            motherOccupation: Joi.string().required(),
            motherContactNo: Joi.string().required(),
        });

        // Define Joi schema for LocalGuardian
        const localGuardianSchema = Joi.object({
            name: Joi.string().required(),
            occupation: Joi.string().required(),
            address: Joi.string().required(),
            contactNo: Joi.string().required(),
        });

        // Define Joi schema for Student
        const studentSchema = Joi.object({
            id: Joi.string().required(),
            name: userNameSchema.required(),
            gender: Joi.string().valid("male", "female", "other").required(),
            dateOfBirth: Joi.string(),
            email: Joi.string().email().required(),
            contactNo: Joi.string().required(),
            emergencyContactNo: Joi.string().required(),
            bloodGroup: Joi.string().valid("A", "AB", "B", "O", "Rh+", "Rh-"),
            presentAddress: Joi.string().required(),
            permanentAddress: Joi.string().required(),
            guardian: guardianSchema.required(),
            localGuardian: localGuardianSchema.required(),
            profileImg: Joi.string(),
            isActive: Joi.string().valid("active", "blocked").default("active"),
        });


        const { student: studentData } = req.body;
        const result = await StudentServices.createStudentIntoDB(studentData);
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