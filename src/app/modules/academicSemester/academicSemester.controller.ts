import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
        req.body,
    );

    res.status(httpStatus.OK).json({
        success: true,
        message: 'Academic semester is created successfully',
        data: result,
    })
});

// const getAllAcademicSemesters = catchAsync(async (req, res) => {
//     const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB();

//     res.status(httpStatus.OK).json({
//         success: true,
//         message: 'Academic semesters are retrieved successfully',
//         data: result,
//     })
// });

// const getSingleAcademicSemester = catchAsync(async (req, res) => {
//     const { semesterId } = req.params;
//     const result =
//         await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);

//     res.status(httpStatus.OK).json({
//         success: true,
//         message: 'Academic semester is retrieved successfully',
//         data: result,
//     })
// });

// const updateAcademicSemester = catchAsync(async (req, res) => {
//     const { semesterId } = req.params;
//     const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
//         semesterId,
//         req.body,
//     );

//     res.status(httpStatus.OK).json({
//         success: true,
//         message: 'Academic semester is updated successfully',
//         data: result,
//     })
// });

export const AcademicSemesterControllers = {
    createAcademicSemester,
    // getAllAcademicSemesters,
    // getSingleAcademicSemester,
    // updateAcademicSemester,
};