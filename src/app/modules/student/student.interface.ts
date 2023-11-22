import { Model } from "mongoose";

export type TUserName = {
    firstName: string;
    middleName?: string;
    lastName: string;
}

export type TGuardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
}

export type TLocalGuardian = {
    name: string;
    occupation: string;
    address: string;
    contactNo: string;
}

export type TStudent = {
    id: string;
    password: string;
    name: TUserName;
    gender: "male" | "female" | "other";
    dateOfBirth?: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup?: "A" | "B" | "AB" | "O" | "Rh+" | "Rh-";
    presentAddress: string;
    permanentAddress: string;
    guardian: TGuardian;
    localGuardian: TLocalGuardian;
    profileImg?: string; // amra database a URL lakhbo
    isActive: "active" | "blocked",
    isDeleted: boolean
}


// for crating static

export interface StudentModel extends Model<TStudent> {
    isUserExists(id: string): Promise<TStudent | null>
}



// for creating instance

// export type StudentMethods = {
//     isUserExists(id: string): Promise<TStudent | null>
// }

// export type StudentModel = Model<TStudent, Record<string, never>, StudentMethods>;

