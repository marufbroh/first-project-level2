import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { User } from "./user.model";

const createStudentIntoDB = async (studentData: TStudent) => {

    // if (await Student.isUserExists(studentData.id)) {
    //     throw new Error("User already exists")
    // }

    const result = await User.create(studentData); // built in static method



    // const student = new Student(studentData); // create an instance

    // if (await student.isUserExists(studentData.id)) {
    //     throw new Error("User already exists")
    // }

    // const result = await student.save() // built is instance method
    return result;
}

export const UserService = {
    createStudentIntoDB
}