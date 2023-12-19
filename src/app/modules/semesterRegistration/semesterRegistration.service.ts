import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";

const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {
    const academicSemester = payload.academicSemester;

    const isAcademicSemesterExists = await AcademicSemester.findById(academicSemester);
    if (!isAcademicSemesterExists) {
        throw new AppError(httpStatus.NOT_FOUND, "This academic semester not found");
    }

    const isSemesterRegistrationExists = await SemesterRegistration.findOne({
        academicSemester
    })

    if (isSemesterRegistrationExists) {
        throw new AppError(httpStatus.CONFLICT, "This semester is already registered!");
    }


    const result = await SemesterRegistration.create(payload);
    return result;

}


export const SemesterRegistrationService = {
    createSemesterRegistrationIntoDB,
    // getAllSemesterRegistrationsFromDB,
    // getSingleSemesterRegistrationsFromDB,
    // updateSemesterRegistrationIntoDB,
    // deleteSemesterRegistrationFromDB,
};