import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { RegistrationStatus } from "./semesterRegistration.constant";

const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {
    const academicSemester = payload.academicSemester;

    const isThereAnyUpcomingOrOngoingSEmester = await SemesterRegistration.findOne({
        $or: [
            { status: RegistrationStatus.UPCOMING },
            { status: RegistrationStatus.ONGOING },
        ],
    });

    if (isThereAnyUpcomingOrOngoingSEmester) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `There is already an ${isThereAnyUpcomingOrOngoingSEmester.status} registered semester !`,
        );
    }

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


const getAllSemesterRegistrationsFromDB = async (
    query: Record<string, unknown>,
) => {
    const semesterRegistrationQuery = new QueryBuilder(
        SemesterRegistration.find().populate('academicSemester'),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await semesterRegistrationQuery.modelQuery; // buji nai
    return result;
};


const getSingleSemesterRegistrationsFromDB = async (id: string) => {
    const result = await SemesterRegistration.findById(id).populate('academicSemester');

    return result;
};


const updateSemesterRegistrationIntoDB = async (id: string, payload: Partial<TSemesterRegistration>) => {

    const isSemesterRegistrationExists = await SemesterRegistration.findById(id);

    if (!isSemesterRegistrationExists) {
        throw new AppError(httpStatus.NOT_FOUND, "This semester is not found")
    };


    const currentSemesterStatus = isSemesterRegistrationExists?.status;
    const requestedStatus = payload?.status;

    if (currentSemesterStatus === RegistrationStatus.ENDED) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `This semester is already ${currentSemesterStatus}`,
        );
    }

    if (currentSemesterStatus === RegistrationStatus.UPCOMING && requestedStatus === RegistrationStatus.ENDED) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
        );
    }

    if (currentSemesterStatus === RegistrationStatus.ONGOING && requestedStatus === RegistrationStatus.UPCOMING) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
        );
    }


    const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    })

    return result;

}

export const SemesterRegistrationService = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationsFromDB,
    getSingleSemesterRegistrationsFromDB,
    updateSemesterRegistrationIntoDB,
    // deleteSemesterRegistrationFromDB,
};