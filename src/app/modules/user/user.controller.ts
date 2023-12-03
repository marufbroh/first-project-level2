// import studentValidationSchema from "../student/student.validation";
import { UserServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async (req, res) => {
    const { password, student: studentData } = req.body;

    // const zodParseData = studentValidationSchema.parse(studentData);
    const result = await UserServices.createStudentIntoDB(password, studentData);

    res.status(200).json({
        success: true,
        message: "Student is created successfully",
        data: result
    })
})

export const UserControllers = {
    createStudent
}