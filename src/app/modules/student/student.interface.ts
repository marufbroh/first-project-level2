import { Schema, model, connect } from 'mongoose';

export type Guardian = {

    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;

    motherName: string;
    motherOccupation: string;
    motherContactNo: string;

}

export type Student = {
    id: string;
    name: {
        firstName: string;
        middleName: string;
        lastName: string;
    }
    gender: "male" | "female";
    dateOfBirth: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup?: "A" | "B" | "AB" | "O" | "Rh+" | "Rh-";
    presentAddress: string;
    permanentAddress: string;
    guardian: Guardian;
}

