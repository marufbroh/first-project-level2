import Joi from "joi";

// Define Joi schema for UserName
const userNameValidationSchema = Joi.object({
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
const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().required(),
    fatherOccupation: Joi.string().required(),
    fatherContactNo: Joi.string().required(),
    motherName: Joi.string().required(),
    motherOccupation: Joi.string().required(),
    motherContactNo: Joi.string().required(),
});

// Define Joi schema for LocalGuardian
const localGuardianValidationSchema = Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().required(),
    address: Joi.string().required(),
    contactNo: Joi.string().required(),
});

// Define Joi schema for Student
const studentValidationSchema = Joi.object({
    id: Joi.string().required(),
    name: userNameValidationSchema.required(),
    gender: Joi.string().valid("male", "female", "other").required(),
    dateOfBirth: Joi.string(),
    email: Joi.string().email().required(),
    contactNo: Joi.string().required(),
    emergencyContactNo: Joi.string().required(),
    bloodGroup: Joi.string().valid("A", "AB", "B", "O", "Rh+", "Rh-"),
    presentAddress: Joi.string().required(),
    permanentAddress: Joi.string().required(),
    guardian: guardianValidationSchema.required(),
    localGuardian: localGuardianValidationSchema.required(),
    profileImg: Joi.string(),
    isActive: Joi.string().valid("active", "blocked").default("active"),
});

export default studentValidationSchema
