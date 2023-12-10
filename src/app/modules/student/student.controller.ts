import { StudentServices } from "./student.service";
import catchAsync from "../../utils/catchAsync";

const getAllStudents = catchAsync(async (req, res) => {
    console.log(req.query);
    const result = await StudentServices.getAllStudentFromDB(req.query);
    res.status(200).json({
        success: true,
        message: "Students are retrieved successfully",
        data: result,
    })
})

const getSingleStudent = catchAsync(async (req, res) => {
    const studentId: string = req.params.id;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
        success: true,
        message: "Student is retrieved successfully",
        data: result
    })
})

const updateStudent = catchAsync(async (req, res) => {
    const studentId: string = req.params.id;
    const student = req.body.student;
    const result = await StudentServices.updateStudentIntoDB(studentId, student);
    res.status(200).json({
        success: true,
        message: "Student is updated successfully",
        data: result
    })
})

const deleteStudent = catchAsync(async (req, res) => {
    const studentId: string = req.params.id;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
        success: true,
        message: "Student is deleted successfully",
        data: result
    })
})

export const StudentControllers = {
    getAllStudents,
    getSingleStudent,
    updateStudent,
    deleteStudent,
}