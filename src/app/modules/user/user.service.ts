import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {

    // if (await Student.isUserExists(studentData.id)) {
    //     throw new Error("User already exists")
    // }

    const result = await User.create(studentData); // built in static method
    return result;
}

export const UserServices = {
    createStudentIntoDB
}